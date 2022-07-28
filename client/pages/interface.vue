<script setup>
// Ajouter l'historique // Ajouter get request pour afficher la liste de l'historique
// Ajouter couleurs au code "écrit" par l'utilisateur et l'IA
// Intégrer vuex
// Adapter l'UI pour mobile
//

import { ref, onMounted } from "vue";
import Typewriter from "typewriter-effect/dist/core";
import axios from "axios";

import ComputerSide from "../components/ComputerSide.vue";
import { minMaxRandomNumber } from "../helpers/minMaxRandomNumber";
import { robotProgressionRate } from "../customStore/customStore.js";

const userInput = ref("");
const typewriterRef = ref();
let typewriter = ref();
const linesToCode = [
  "function multiply() {<br>",
  "\xa0\xa0\xa0const a = prompt(); <br>",
  " \xa0\xa0\xa0const b = prompt(); <br>",
  " \xa0\xa0\xa0return alert(a * b) <br>",
  "};<br>",
  "multiply();",
];
let whichLineCounter = 0;
const completionValue = 100;
const progressionRate = ref(5);
let numberOfBugs = 0;
const bugsRate = ref(0);
const disabled = ref(false);

const computerSideRef = ref();

onMounted(() => {
  typewriter = new Typewriter(typewriterRef.value, {
    delay: 1,
  });
  typewriter.changeDeleteSpeed(1);
});

function separateString(str, n) {
  let arr = [];
  for (let i = 0; i < str.length; i += n) {
    arr.push(str?.substr(i, n));
  }
  return arr;
}

function insertBugs(str, randomNumber) {
  const parts = separateString(str, randomNumber);
  const newValue = parts.join(",");
  return newValue;
}

function insertSomeBugs(pos) {
  linesToCode[pos] = insertBugs(linesToCode[pos], minMaxRandomNumber(2, 40));
}
function insertManyBugs(pos) {
  linesToCode[pos] = insertBugs(linesToCode[pos], minMaxRandomNumber(2, 10));
}

function updateProgress(totalLinesToComplete) {
  if (whichLineCounter === 0) {
    progressionRate.value = 0;
  }
  numberOfBugs = linesToCode[whichLineCounter].split(",").length - 1;
  progressionRate.value =
    progressionRate.value +
    completionValue / totalLinesToComplete -
    numberOfBugs;
  bugsRate.value = bugsRate.value + completionValue / totalLinesToComplete;
  console.log(
    "progressionRate.value",
    progressionRate.value,
    "bugsRate.value",
    bugsRate.value
  );
}

function multiply() {
  const a = prompt("Choisis un premier nombre.");
  const b = prompt("Choisis un deuxième nombre.");
  return alert(
    `${a} x ${b} = ${a * b} 😲 Ta calculatrice fonctionne à merveille !`
  );
}

function reset() {
  // whichLineCounter = 0;
  // progressionRate.value = 5;
  // bugsRate.value = 0;
  // typewriter.deleteAll(1).start();
  // computerSideRef.value.robotReset();
  window.location.reload();
}

function whoIsTheWinner() {
  if (
    progressionRate.value >= completionValue ||
    robotProgressionRate.value >= completionValue
  ) {
    axios.post(`${process.env.BASE_URL}/user/games-history`, {
      userName: localStorage.getItem("userName"),
      progressionRate: progressionRate.value,
      computerProgressionRate: robotProgressionRate.value,
    });
  }

  if (
    progressionRate.value >= completionValue &&
    robotProgressionRate.value < completionValue
  ) {
    alert("Bravoooo 🙌✊🥳🎉👏 Tu as gagné la compétition !");
    multiply();
    reset();
  } else if (
    progressionRate.value < completionValue &&
    robotProgressionRate.value >= completionValue
  ) {
    alert("Je t'ai batu ! 😋 Essaies de ne pas coder trop vite !");
    reset();
  } else if (
    progressionRate.value >= completionValue &&
    robotProgressionRate.value >= completionValue
  ) {
    alert("Execo ! On recommence ?");
    reset();
  }
}

function codeCarefully() {
  if (whichLineCounter >= linesToCode.length) {
    alert(
      "Tu as fini d'écrire le programme mais il y a des bugs. Il faut debug() ton code! "
    );
    return;
  }
  insertSomeBugs(whichLineCounter);
  typewriter
    .callFunction(() => {
      disabled.value = true;
    })
    .typeString(linesToCode[whichLineCounter])

    .start()
    .callFunction(() => {
      disabled.value = false;
      whoIsTheWinner();
    });

  updateProgress(linesToCode.length);
  whichLineCounter++;
  computerSideRef.value.robotCode();
}

function codeQuickly() {
  if (whichLineCounter >= linesToCode.length) {
    alert("Il faut débugger ton code!");
    return;
  }
  if (whichLineCounter % 2 === linesToCode.length % 2) {
    insertManyBugs(whichLineCounter);
    insertManyBugs(whichLineCounter + 1);
    typewriter
      .callFunction(() => {
        disabled.value = true;
      })
      .typeString(
        linesToCode[whichLineCounter] + linesToCode[whichLineCounter + 1]
      )

      .start()
      .callFunction(() => {
        disabled.value = false;
        whoIsTheWinner();
      });
    updateProgress(linesToCode.length / 2);
    whichLineCounter++;
    whichLineCounter++;
    computerSideRef.value.robotCode();
  } else {
    insertManyBugs(whichLineCounter);
    typewriter
      .callFunction(() => {
        disabled.value = true;
      })
      .typeString(linesToCode[whichLineCounter])

      .start()
      .callFunction(() => {
        disabled.value = false;
        whoIsTheWinner();
      });
    updateProgress(linesToCode.length);
    whichLineCounter++;
    computerSideRef.value.robotCode();
  }
}

function debug() {
  linesToCode.forEach((el, index) => {
    const times = minMaxRandomNumber(2, 3);
    for (let i = 0; i < times; i++) {
      el = el.replace(",", "");
    }
    linesToCode[index] = el;
    return el;
  });

  typewriter
    .callFunction(() => {
      disabled.value = true;
    })
    .deleteAll(1)
    .typeString(linesToCode.filter((_, i) => i < whichLineCounter).join(""))
    .start()
    .callFunction(() => {
      disabled.value = false;
      whoIsTheWinner();
    });

  numberOfBugs =
    linesToCode
      .filter((_, i) => i < whichLineCounter)
      .join("")
      .split(",").length - 1;
  progressionRate.value =
    (completionValue / linesToCode.length) * whichLineCounter - numberOfBugs;
  bugsRate.value = (completionValue / linesToCode.length) * whichLineCounter;
  computerSideRef.value.robotCode();
}

const rules = {
  maxLength: (value) => value.length <= 20 || "Max 20 characters",
  characters: (value) =>
    !!(value || "").match(/^[a-zA-Z-()]*$/) || "Caractères non valides",
};

function submit() {
  if (
    rules.maxLength(userInput.value) !== true ||
    rules.characters(userInput.value) !== true
  ) {
    return;
  }

  if (userInput.value === "codeCarefully()") {
    codeCarefully();
  } else if (userInput.value === "codeQuickly()") {
    codeQuickly();
  } else if (userInput.value === "debug()") {
    debug();
  } else if (userInput.value === "reset()") {
    reset();
  } else {
    alert("commande invalide");
  }

  userInput.value = "";
}
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
          <br />
          <br />
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

<script>
export default {
  name: "InterfacePage",
};
</script>
