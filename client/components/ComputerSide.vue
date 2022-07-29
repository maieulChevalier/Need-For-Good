<script>
import { mapMutations } from "vuex";

import Typewriter from "typewriter-effect/dist/core";

export default {
  name: "ComputerSide",
  data() {
    return {
      typewriter: undefined,
      linesToCode: [
        "function ",
        "robotMultiplication() {<br>",
        "\xa0\xa0\xa0const a = 0;",
        " <br>",
        " \xa0\xa0\xa0const b = 0;",
        "<br>",
        " \xa0\xa0\xa0return alert(0 + 0 = ",
        "la tête à toto) <br>",
        "};<br>",
        "robotMultiplication();",
      ],
      whichLineCounter: 0,
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
    robotCode() {
      this.typewriter
        .typeString(this.linesToCode[this.whichLineCounter])
        .start();
      this.increaseRobotProgressionRate(this.linesToCode.length);
      this.whichLineCounter++;
    },
    robotReset() {
      this.whichLineCounter = 0;
      this.resetRobotProgressionRate();
      this.typewriter.deleteAll(1).start();
    },
  },
  mounted() {
    this.typewriter = new Typewriter(this.$refs.typewriterRef, {
      delay: 1,
    });
  },
};
</script>

<template>
  <div>
    <v-container>
      <v-icon x-large class="d-flex justify-center">
        mdi-robot-happy-outline
      </v-icon>
      <v-container text-center>
        <p>mini-robot</p>
      </v-container>
      <v-progress-linear
        color="green lighten-2"
        v-model="robotProgressionRate"
        :buffer-value="0"
        stream
      ></v-progress-linear>
      <br />
      <p><span ref="typewriterRef"></span></p>
    </v-container>
  </div>
</template>
