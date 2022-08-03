<script>
// Ajouter couleurs au code "écrit" par l'utilisateur et l'IA
// Intégrer vuex

import { mapMutations } from "vuex";

import Typewriter from "typewriter-effect/dist/core";
import axios from "axios";

import ComputerSide from "../components/ComputerSide.vue";
import { minMaxRandomNumber } from "../helpers/minMaxRandomNumber";

export default {
  name: "InterfacePage",
  data() {
    return {
      userName: this.$cookies.get("userName"),
      typewriter: undefined,
      linesToCode: [
        "function multiply() {<br>",
        "\xa0\xa0\xa0const a = prompt(); <br>",
        " \xa0\xa0\xa0const b = prompt(); <br>",
        " \xa0\xa0\xa0return alert(a * b) <br>",
        "};<br>",
        "multiply();",
      ],
      whichLineCounter: 0,
      completionValue: 100,
      validProgressionRate: 0,
      numberOfNewBugs: 0,
      totalNumberOfBugs: 0,
      ProgressionWithBugsRate: 0,
      bugsHistory: "",
      disabled: false,
    };
  },
  computed: {
    robotProgressionRate() {
      return this.$store.state.robotProgressionRate;
    },
  },
  methods: {
    ...mapMutations([
      "increaseRobotProgressionRate", // map `this.increment()` to `this.$store.commit('increment')`

      // `mapMutations` also supports payloads:
      "resetRobotProgressionRate", // map `this.incrementBy(amount)` to `this.$store.commit('incrementBy', amount)`
    ]),
    recordBugsHistory(doesItAddBugs) {
      this.bugsHistory = doesItAddBugs
        ? this.bugsHistory.concat(` + ${this.numberOfNewBugs}`)
        : this.bugsHistory.concat(` - ${this.numberOfNewBugs}`);
    },
    separateString(str, n) {
      let arr = [];
      for (let i = 0; i < str.length; i += n) {
        arr.push(str?.substr(i, n));
      }
      return arr;
    },
    insertBugs(str, randomNumber) {
      const parts = this.separateString(str, randomNumber);
      const newValue = parts.join(",");
      return newValue;
    },
    insertSomeBugs(pos) {
      this.linesToCode[pos] = this.insertBugs(
        this.linesToCode[pos],
        minMaxRandomNumber(6, 30)
      );
    },
    insertManyBugs(pos) {
      this.linesToCode[pos] = this.insertBugs(
        this.linesToCode[pos],
        minMaxRandomNumber(2, 8)
      );
    },
    increaseValidProgressionRate() {
      this.validProgressionRate =
        this.validProgressionRate +
        this.completionValue / this.linesToCode.length -
        this.numberOfNewBugs;
    },
    increaseProgressionWithBugsRate() {
      this.ProgressionWithBugsRate =
        this.ProgressionWithBugsRate +
        this.completionValue / this.linesToCode.length;
    },
    updateNumberOfNewBugs(pos) {
      this.numberOfNewBugs =
        this.linesToCode
          .slice(pos, pos + 1)
          .join("")
          .split(",").length - 1; // .split(",") .length - 1 gives the number of comas in the string
    },
    updateTotalNumberOfBugs(startingLine, endingLine) {
      this.totalNumberOfBugs = this.totalNumberOfBugs + this.numberOfNewBugs;
    },
    multiply() {
      const a = prompt("Choisis un premier nombre.");
      const b = prompt("Choisis un deuxième nombre.");
      return alert(
        `${a} x ${b} = ${a * b} 😲 Ta calculatrice fonctionne à merveille !`
      );
    },
    reset() {
      // this.whichLineCounter = 0;
      // this.validProgressionRate = 5;
      // this.ProgressionWithBugsRate = 0;
      // this.typewriter.deleteAll(1).start();
      // this.$refs.computerSideRef.robotReset();
      window.location.reload();
    },
    whoIsTheWinner() {
      if (
        this.validProgressionRate >= this.completionValue ||
        this.robotProgressionRate >= this.completionValue
      ) {
        axios.post(`${process.env.BASE_URL}/user/games-history`, {
          userName: this.$cookies.get("userName"),
          progressionRate: this.validProgressionRate,
          computerProgressionRate: this.robotProgressionRate,
        });
      }
      if (
        this.validProgressionRate >= this.completionValue &&
        this.robotProgressionRate < this.completionValue
      ) {
        alert("Bravoooo 🙌✊🥳🎉👏 Tu as gagné la compétition !");
        this.multiply();
        this.reset();
      } else if (
        this.validProgressionRate < this.completionValue &&
        this.robotProgressionRate >= this.completionValue
      ) {
        alert("Je t'ai batu ! 😋 Essaies de ne pas coder trop vite !");
        this.reset();
      } else if (
        this.validProgressionRate >= this.completionValue &&
        this.robotProgressionRate >= this.completionValue
      ) {
        alert("Execo ! On recommence ?");
        this.reset();
      }
    },
    async codeCarefully() {
      if (this.whichLineCounter >= this.linesToCode.length) {
        alert(
          "Tu as fini d'écrire le programme mais il y a des bugs. Il faut debug() ton code! "
        );
        return;
      }
      this.insertSomeBugs(this.whichLineCounter);
      await this.typewriter
        .callFunction(() => {
          this.disabled = true;
        })
        .typeString(this.linesToCode[this.whichLineCounter])

        .start()
        .callFunction(() => {
          this.disabled = false;
          this.whoIsTheWinner();
        });

      this.updateNumberOfNewBugs(this.whichLineCounter);
      this.updateTotalNumberOfBugs();
      this.increaseValidProgressionRate();
      this.increaseProgressionWithBugsRate();
      this.recordBugsHistory(true);
      this.whichLineCounter++;
      this.$refs.computerSideRef.robotCode();
    },
    codeQuickly() {
      if (this.whichLineCounter >= this.linesToCode.length) {
        alert("Il faut débugger ton code!");
        return;
      }
      if (this.whichLineCounter < 5) {
        this.insertManyBugs(this.whichLineCounter);
        this.insertManyBugs(this.whichLineCounter + 1);
        this.typewriter
          .callFunction(() => {
            this.disabled = true;
          })
          .typeString(
            this.linesToCode[this.whichLineCounter] +
              this.linesToCode[this.whichLineCounter + 1]
          )

          .start()
          .callFunction(() => {
            this.disabled = false;
            this.whoIsTheWinner();
          });
        this.updateNumberOfNewBugs(this.whichLineCounter);
        this.updateTotalNumberOfBugs();
        this.increaseValidProgressionRate();
        this.increaseProgressionWithBugsRate();
        this.recordBugsHistory(true);
        this.updateNumberOfNewBugs(this.whichLineCounter + 1);
        this.updateTotalNumberOfBugs();
        this.increaseValidProgressionRate();
        this.increaseProgressionWithBugsRate();
        this.recordBugsHistory(true);
        this.whichLineCounter++;
        this.whichLineCounter++;
        this.$refs.computerSideRef.robotCode();
      } else {
        this.insertManyBugs(this.whichLineCounter);
        this.typewriter
          .callFunction(() => {
            this.disabled = true;
          })
          .typeString(this.linesToCode[this.whichLineCounter])

          .start()
          .callFunction(() => {
            this.disabled = false;
            this.whoIsTheWinner();
          });
        this.updateNumberOfNewBugs(this.whichLineCounter);
        this.updateTotalNumberOfBugs();
        this.increaseValidProgressionRate();
        this.increaseProgressionWithBugsRate();
        this.recordBugsHistory(true);
        this.whichLineCounter++;
        this.$refs.computerSideRef.robotCode();
      }
    },
    debug() {
      const previousTotalNumberOfBugs = this.totalNumberOfBugs;
      this.linesToCode.forEach((el, index) => {
        const times = minMaxRandomNumber(2, 3);
        for (let i = 0; i < times; i++) {
          el = el.replace(",", "");
        }
        this.linesToCode[index] = el;
        return el;
      });

      this.typewriter
        .callFunction(() => {
          this.disabled = true;
        })
        .deleteAll(1)
        .typeString(
          this.linesToCode.filter((_, i) => i < this.whichLineCounter).join("")
        )
        .start()
        .callFunction(() => {
          this.disabled = false;

          this.whoIsTheWinner();
        });

      this.totalNumberOfBugs =
        this.linesToCode
          .filter((_, i) => i < this.whichLineCounter)
          .join("")
          .split(",").length - 1;

      this.bugsHistory = this.bugsHistory.concat(
        ` - ${previousTotalNumberOfBugs - this.totalNumberOfBugs}`
      );

      this.validProgressionRate =
        (this.completionValue / this.linesToCode.length) *
          this.whichLineCounter -
        this.totalNumberOfBugs;
      this.ProgressionWithBugsRate =
        (this.completionValue / this.linesToCode.length) *
        this.whichLineCounter;
      this.$refs.computerSideRef.robotCode();
    },
  },
  mounted() {
    this.typewriter = new Typewriter(this.$refs.typewriterRef, {
      delay: 1,
    });
    this.typewriter.changeDeleteSpeed(1);
    console.log("userName: ", this.userName);
  },
  components: {
    ComputerSide,
  },
};
</script>

<template>
  <div>
    <v-container class="ma-1 d-flex justify-space-around flex-wrap">
      <v-btn
        class="ma-2"
        fab
        dark
        elevation="9"
        color="primary"
        @click="codeCarefully"
        :disabled="disabled"
      >
        <v-icon dark>mdi-tortoise</v-icon>
      </v-btn>
      <v-btn
        class="ma-2"
        fab
        dark
        elevation="9"
        color="primary"
        @click="codeQuickly"
        :disabled="disabled"
      >
        <v-icon dark>mdi-lightning-bolt</v-icon>
      </v-btn>
      <v-btn
        class="ma-2"
        fab
        dark
        elevation="9"
        color="primary"
        @click="debug"
        :disabled="disabled"
      >
        <v-icon dark> mdi-bug-stop-outline </v-icon>
      </v-btn>
      <v-btn
        class="ma-2"
        fab
        dark
        elevation="9"
        color="primary"
        @click="reset"
        :disabled="disabled"
      >
        <v-icon dark> mdi-restart </v-icon>
      </v-btn>
    </v-container>
    <br />
    <v-row>
      <v-col>
        <v-container>
          <v-icon x-large class="d-flex justify-center"
            >mdi-human-child
          </v-icon>
          <v-container text-center>
            <p>{{ userName }}</p>
          </v-container>
          <v-progress-linear
            background-color="red lighten-2"
            color="green lighten-2"
            v-model="validProgressionRate"
            :buffer-value="ProgressionWithBugsRate"
            stream
          ></v-progress-linear>
          <br />
          <p>Code: <span ref="typewriterRef"></span></p>
          <p>{{ `Bugs: ${bugsHistory} ` }}</p>
        </v-container>
      </v-col>
      <v-divider vertical color="white"></v-divider>
      <v-col>
        <ComputerSide ref="computerSideRef" />
      </v-col>
    </v-row>
    <v-footer
      :color="'transparent'"
      padless
      fixed
      class="d-flex justify-center"
    >
      <blockquote class="blockquote">
        "Coder vite c'est bien... Mais coder bien, c'est mieux !"
        <em>&mdash;Foger</em>
      </blockquote></v-footer
    >
  </div>
</template>
