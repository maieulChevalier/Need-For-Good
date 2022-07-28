<script>
import Typewriter from "typewriter-effect/dist/core";
import { robotProgressionRate } from "../customStore/customStore.js";

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
      robotProgressionRate,
    };
  },
  methods: {
    updateProgress(totalLinesToComplete) {
      this.robotProgressionRate.value =
        this.robotProgressionRate.value + 100 / totalLinesToComplete;
    },
    robotCode() {
      this.typewriter
        .typeString(this.linesToCode[this.whichLineCounter])
        .start();
      this.updateProgress(this.linesToCode.length);
      this.whichLineCounter++;
    },
    robotReset() {
      this.whichLineCounter = 0;
      this.robotProgressionRate.value = 5;
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
      <br />
      <br />
      <v-progress-linear
        color="green lighten-2"
        v-model="robotProgressionRate.value"
        :buffer-value="0"
        stream
      ></v-progress-linear>
      <br />
      <p><span ref="typewriterRef"></span></p>
    </v-container>
  </div>
</template>
