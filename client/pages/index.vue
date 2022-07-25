<script setup>
import CustomTypedJS from "../components/CustomTypedJS.vue";
</script>

<template>
  <div>
    <CustomTypedJS
      msg="Bonjour l'artiste ! Nous avons besoin de toi pour apprendre à notre IA à coder dans les règles de l'art. ^1000 <br> Pour ce faire, nous avons créé un jeu où il te faudra battre notre IA dans une compétition acharnée pour terminer un programme avant elle. ^1000 <br> Mais Attention ! Il faut que le code soit impéccable ! Car coder vite, c'est bien... Mais coder bien, c'est mieux ! ^1000 Nous ne voudrions pas que notre IA se mette à coder n'importe quoi ! ^1000 <br> Tu es partant ? Super ! Voici les commandes qui te permettront d'écrire le programme : ^1000 <br> <u>codeCarefully()</u>  ^1000 <br> <u>codeQuickly()</u>  ^1000 <br> <u>debug()</u> ^1000 <br> <br> Tu n'as plus qu'à cliquer sur START une fois que tu es prêt(e)."
    />
    <v-btn elevation="9" x-large color="primary" :to="'/interface'">
      START
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "HelpPage",
};
</script>
