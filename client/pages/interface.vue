<script setup>
// Ajouter les 4 actions
// Ajouter couleurs au code "écrit" par l'utilisateur et l'IA
// Protéger le TextField
// Écrire les tests

import { ref, onMounted } from "vue";
import ComputerSide from "../components/ComputerSide.vue";
import Typewriter from "typewriter-effect/dist/core";

import { minMaxRandomNumber } from "../helpers/minMaxRandomNumber";

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
const progressionRate = ref(0);
let numberOfBugs = 0;
const bugsRate = ref(0);

onMounted(() => {
  typewriter = new Typewriter(typewriterRef.value, {
    delay: 30,
  });
});

function separateString(str, n) {
  let arr = [];
  for (let i = 0; i < str.length; i += n) {
    arr.push(str.substr(i, n));
  }
  return arr;
}

function insertBugs(str, randomNumber) {
  const parts = separateString(str, randomNumber);
  const newValue = parts.join(",");
  return newValue;
}

function insertSomeBugs(pos) {
  linesToCode[pos] = insertBugs(linesToCode[pos], minMaxRandomNumber(10, 30));
}
function insertManyBugs(pos) {
  linesToCode[pos] = insertBugs(linesToCode[pos], minMaxRandomNumber(5, 8));
}

function codeCarefully() {
  insertSomeBugs(whichLineCounter);

  typewriter.typeString(linesToCode[whichLineCounter]).start();

  numberOfBugs = linesToCode[whichLineCounter].split(",").length - 1;
  progressionRate.value = progressionRate.value + 100 / 6 - numberOfBugs * 5;
  bugsRate.value = bugsRate.value + 100 / 6;

  whichLineCounter++;
}

function codeQuickly() {
  if (whichLineCounter <= 4) {
    insertManyBugs(whichLineCounter);
    insertManyBugs(whichLineCounter + 1);
    typewriter
      .typeString(
        linesToCode[whichLineCounter] + linesToCode[whichLineCounter + 1]
      )
      .start();

    numberOfBugs = linesToCode[whichLineCounter].split(",").length - 1;
    progressionRate.value = progressionRate.value + 100 / 3 - numberOfBugs * 5;
    bugsRate.value = bugsRate.value + 100 / 3;

    whichLineCounter++;
    whichLineCounter++;
  } else {
    insertManyBugs(whichLineCounter);
    typewriter.typeString(linesToCode[whichLineCounter]).start();
    whichLineCounter++;
  }
}

function debug() {
  linesToCode.forEach((el, index) => {
    const times = minMaxRandomNumber(1, 4);
    for (let i = 0; i < times; i++) {
      el = el.replace(",", "");
    }
    linesToCode[index] = el;
    return el;
  });

  typewriter
    .deleteAll(1)
    .typeString(linesToCode.filter((_, i) => i < whichLineCounter).join(""))
    .start();
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
        label="Code"
        placeholder="ex: codeQuickly()"
        outlined
        style="max-width: 200px; margin-right: 20px"
        hint="Appuies sur Entrée pour valider"
        maxlength="20"
        :rules="[rules.characters, rules.maxLength]"
        v-model="userInput"
        @keyup.enter="submit"
      >
      </v-text-field>
      <v-btn elevation="9" x-large color="primary" :to="'/interface'">
        RESET
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
          <blockquote class="blockquote">
            "Coder vite c'est bien... Mais coder bien, c'est mieux !"
            <footer>
              <small>
                <em>&mdash;Foger</em>
              </small>
            </footer>
          </blockquote>
        </v-container>
      </v-col>
      <v-divider vertical color="white"></v-divider>
      <v-col>
        <ComputerSide />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "InterfacePage",
};
</script>
