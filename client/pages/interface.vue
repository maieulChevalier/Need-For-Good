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
      progressionRate: 5,
      numberOfBugs: 0,
      bugsRate: 0,
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
        minMaxRandomNumber(2, 40)
      );
    },
    insertManyBugs(pos) {
      this.linesToCode[pos] = this.insertBugs(
        this.linesToCode[pos],
        minMaxRandomNumber(2, 10)
      );
    },
    updateProgress(totalLinesToComplete) {
      if (this.whichLineCounter === 0) {
        this.progressionRate = 0;
      }
      this.numberOfBugs =
        this.linesToCode[this.whichLineCounter].split(",").length - 1;
      this.progressionRate =
        this.progressionRate +
        this.completionValue / totalLinesToComplete -
        this.numberOfBugs;
      this.bugsRate =
        this.bugsRate + this.completionValue / totalLinesToComplete;
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
      // this.progressionRate = 5;
      // this.bugsRate = 0;
      // this.typewriter.deleteAll(1).start();
      // this.$refs.computerSideRef.robotReset();
      window.location.reload();
    },
    whoIsTheWinner() {
      if (
        this.progressionRate >= this.completionValue ||
        this.robotProgressionRate >= this.completionValue
      ) {
        axios.post(`${process.env.BASE_URL}/user/games-history`, {
          userName: localStorage.getItem("userName"),
          progressionRate: this.progressionRate,
          computerProgressionRate: this.robotProgressionRate,
        });
      }

      if (
        this.progressionRate >= this.completionValue &&
        this.robotProgressionRate < this.completionValue
      ) {
        alert("Bravoooo 🙌✊🥳🎉👏 Tu as gagné la compétition !");
        this.multiply();
        this.reset();
      } else if (
        this.progressionRate < this.completionValue &&
        this.robotProgressionRate >= this.completionValue
      ) {
        alert("Je t'ai batu ! 😋 Essaies de ne pas coder trop vite !");
        this.reset();
      } else if (
        this.progressionRate >= this.completionValue &&
        this.robotProgressionRate >= this.completionValue
      ) {
        alert("Execo ! On recommence ?");
        this.reset();
      }
    },
    codeCarefully() {
      if (this.whichLineCounter >= this.linesToCode.length) {
        alert(
          "Tu as fini d'écrire le programme mais il y a des bugs. Il faut debug() ton code! "
        );
        return;
      }
      this.insertSomeBugs(this.whichLineCounter);
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

      this.updateProgress(this.linesToCode.length);
      this.whichLineCounter++;
      this.$refs.computerSideRef.robotCode();
    },
    codeQuickly() {
      if (this.whichLineCounter >= this.linesToCode.length) {
        alert("Il faut débugger ton code!");
        return;
      }
      if (this.whichLineCounter % 2 === this.linesToCode.length % 2) {
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
        this.updateProgress(this.linesToCode.length / 2);
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
        this.updateProgress(this.linesToCode.length);
        this.whichLineCounter++;
        this.$refs.computerSideRef.robotCode();
      }
    },
    debug() {
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

      this.numberOfBugs =
        this.linesToCode
          .filter((_, i) => i < this.whichLineCounter)
          .join("")
          .split(",").length - 1;
      this.progressionRate =
        (this.completionValue / this.linesToCode.length) *
          this.whichLineCounter -
        this.numberOfBugs;
      this.bugsRate =
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
            v-model="progressionRate"
            :buffer-value="bugsRate"
            stream
          ></v-progress-linear>
          <br />
          <p><span ref="typewriterRef"></span></p>
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
