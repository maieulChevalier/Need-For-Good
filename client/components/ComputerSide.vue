<script setup>
import { ref, onMounted } from "vue";
import Typewriter from "typewriter-effect/dist/core";

const typewriterRef = ref();
let typewriter = ref();

onMounted(() => {
  typewriter = new Typewriter(typewriterRef.value, {
    delay: 10,
    autoStart: true,
  });
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
