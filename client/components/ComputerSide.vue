<script setup>
import { ref, onMounted } from "vue";
import Typewriter from "typewriter-effect/dist/core";
import { robotProgressionRate } from "../customStore/customStore.js";

const typewriterRef = ref();
let typewriter = ref();
const linesToCode = [
  "function ",
  "robotMultiplication() {<br>",
  "\xa0\xa0\xa0const a = 0; <br>",
  " \xa0\xa0\xa0const b = 0; <br>",
  " \xa0\xa0\xa0return alert(0 + 0 = ",
  "la tête à toto) <br>",
  "};<br>",
  "robotMultiplication();",
];
let whichLineCounter = 0;

function updateProgress(totalLinesToComplete) {
  robotProgressionRate.value =
    robotProgressionRate.value + 100 / totalLinesToComplete;
}

function robotCode() {
  typewriter.typeString(linesToCode[whichLineCounter]).start();
  updateProgress(linesToCode.length);
  whichLineCounter++;
}

onMounted(() => {
  typewriter = new Typewriter(typewriterRef.value, {
    delay: 1,
  });
});

defineExpose({
  robotCode,
});
</script>

<template>
  <div>
    <v-container>
      <v-icon x-large class="d-flex justify-center"
        >mdi-robot-happy-outline
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
      <blockquote class="blockquote">
        "Coder vite c'est bien... Mais coder bien, c'est mieux !"
        <footer>
          <small>
            <em>&mdash;Foger</em>
          </small>
        </footer>
      </blockquote>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "CustomTypedJS",
};
</script>
