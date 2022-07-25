<script setup>
import { ref, onMounted } from "vue";
import Typewriter from "typewriter-effect/dist/core";

const typewriterRef = ref();
let typewriter = ref();

onMounted(() => {
  typewriter = new Typewriter(typewriterRef.value, {
    delay: 1,
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
        value="0"
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
  </div>
</template>

<script>
export default {
  name: "CustomTypedJS",
};
</script>
