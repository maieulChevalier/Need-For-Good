<script setup>
import { ref, reactive, onMounted } from "vue";
import Typed from "typed.js";
import { minMaxRandomNumber } from "../helpers/minMaxRandomNumber";

const props = defineProps({
  userInput: String,
});

const element = ref();
let typing = ref();

const options = {
  strings: [
    "function multiply() {<br/> &nbsp;&nbsp;&nbsp; const a = prompt() <br/> &nbsp;&nbsp;&nbsp; const b = prompt() <br/> &nbsp;&nbsp;&nbsp; return alert(a * b); <br/> }; <br/> <br/> multiply();",
  ],
  typeSpeed: 20,
  onBegin: (self) => {
    self.stop();
  },
};

onMounted(() => {
  typing = new Typed(element.value, options);
});

function toggleTyping() {
  typing.start();
}
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
        value="5"
        buffer-value="0"
        stream
      ></v-progress-linear>
      <br />
      <p><span ref="element"></span></p>

      <blockquote class="blockquote">
        "Coder vite c'est bien... Mais coder bien, c'est mieux !"
        <footer>
          <small>
            <em>&mdash;Foger</em>
          </small>
        </footer>
      </blockquote>
    </v-container>
    <v-btn @click="toggleTyping()" color="primary">toggle</v-btn>
  </div>
</template>

<script>
export default {
  name: "CustomTypedJS",
};
</script>
