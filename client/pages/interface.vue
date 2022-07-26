<script setup>
// Ajouter couleurs au code "écrit" par l'utilisateur et l'IA
// Protéger le TextField
// Écrire les tests
// Adapter l'UI pour mobile

import { ref, onMounted, onUpdated } from "vue";
import ComputerSide from "../components/ComputerSide.vue";
import Typewriter from "typewriter-effect/dist/core";

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
  numberOfBugs = linesToCode[whichLineCounter].split(",").length - 1;
  progressionRate.value =
    progressionRate.value +
    completionValue / totalLinesToComplete -
    numberOfBugs;
  bugsRate.value = bugsRate.value + completionValue / totalLinesToComplete;
}

function multiply() {
  const a = prompt("Choisis un premier nombre.");
  const b = prompt("Choisis un deuxième nombre.");
  return alert(
    `${a} x ${b} = ${a * b} 😲 Ta calculatrice fonctionne à merveille !`
  );
}

function whoIsTheWinner() {
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

  console.log("whichlinecounter: ", whichLineCounter);
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

function reset() {
  window.location.reload();
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
    if (whichLineCounter === 0) {
      progressionRate.value = 0;
    }
    codeCarefully();
  } else if (userInput.value === "codeQuickly()") {
    if (whichLineCounter === 0) {
      progressionRate.value = 0;
    }
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
    <v-container class="ma-1 d-flex justify-space-between">
      <v-text-field
        autofocus
        label="Codes toi même ici"
        placeholder="ex: codeQuickly()"
        outlined
        style="max-width: 200px; margin-right: 20px"
        hint="Appuies sur Entrée pour valider"
        maxlength="20"
        :rules="[rules.characters, rules.maxLength]"
        v-model="userInput"
        @keyup.enter="submit"
        :disabled="disabled"
      >
      </v-text-field>
      <v-btn
        class="text-none"
        elevation="9"
        x-large
        color="primary"
        @click="codeCarefully"
        :disabled="disabled"
      >
        codeCarefully()
      </v-btn>
      <v-btn
        class="text-none"
        elevation="9"
        x-large
        color="primary"
        @click="codeQuickly"
        :disabled="disabled"
      >
        codeQuickly()
      </v-btn>
      <v-btn
        class="text-none"
        elevation="9"
        x-large
        color="primary"
        @click="debug"
        :disabled="disabled"
      >
        debug()
      </v-btn>
      <v-btn
        class="text-none"
        elevation="9"
        x-large
        color="primary"
        @click="reset"
        :disabled="disabled"
      >
        reset()
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
