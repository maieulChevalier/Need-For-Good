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
  typewriter
    .typeString("Bonjour l'artiste ! ")
    .pauseFor(1000)
    .typeString(
      "Nous avons besoin de toi pour apprendre à notre IA à coder sans faire d'erreurs. <br>"
    )
    .pauseFor(1000)
    .typeString(
      "Pour ce faire, nous avons créé un jeu où il te faudra battre notre IA dans une compétition acharnée pour programmer une calculatrice. <br>"
    )
    .pauseFor(1000)
    .typeString("Mais Attention ! ")
    .pauseFor(1000)
    .typeString("Il faut que le code soit impéccable ! ")
    .pauseFor(1000)
    .typeString("Car coder vite, c'est bien... ")
    .pauseFor(1000)
    .typeString("Mais coder bien, c'est mieux ! <br>")
    .pauseFor(1000)
    .typeString("Tu es partant ? ")
    .pauseFor(1000)
    .typeString("Super ! <br>")
    .pauseFor(1000)
    .typeString(
      "Voici les commandes qui te permettront d'écrire le programme : <br>"
    )
    .pauseFor(1000)
    .typeString("<strong>codeCarefully()</strong> <br>")
    .pauseFor(1000)
    .typeString("<strong>codeQuickly()</strong> <br>")
    .pauseFor(1000)

    .typeString("<strong>debug()</strong> <br>")
    .pauseFor(1000)

    .typeString("Cliques sur START quand tu es prêt(e) 🙃.")
    .pauseFor(1000)
    .start();
});
</script>

<template>
  <div>
    <p><span ref="typewriterRef"></span></p>
    <v-btn elevation="9" x-large color="primary" :to="'/interface'">
      START
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "HistoryPage",
};
</script>
