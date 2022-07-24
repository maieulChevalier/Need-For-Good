<script setup>
// Ajouter les 4 actions
// Ajouter couleurs au code "écrit" par l'utilisateur et l'IA
// Protéger le TextField
// Écrire les tests

import { ref, onMounted } from "vue";
import CustomTypedJS from "../components/CustomTypedJS.vue";

const userInput = ref("");
// const toggle = ref();
// const action = ref("");
const typedByUserRef = ref();

onMounted(() => {
  // multiply();
});

const rules = {
  maxLength: (value) => value.length <= 20 || "Max 20 characters",

  characters: (value) =>
    !!(value || "").match(/^[a-zA-Z-()]*$/) ||
    "Only letters and parenthesis are accepted",
};

// function limit(e) {
//   console.log("userInput: ", userInput.value);

//   if (userInput.length < 16) {
//     userInput.value = e.target.value;
//   }
//   if (userInput.length > 16) {
//     userInput = userInput.slice(0, 16);
//   }
// }

function submit() {
  if (
    rules.maxLength(userInput.value) !== true ||
    rules.characters(userInput.value) !== true
  ) {
    return;
  }

  if (
    userInput.value === "codeCarefully()" ||
    userInput.value === "codeQuickly()" ||
    userInput.value === "debug()"
  ) {
    typedByUserRef.value.toggleTyping();
  } else {
    alert("commande invalide");
  }

  console.log("maxLength: ", rules.maxLength(userInput.value) !== true);
  console.log("characters: ", rules.characters(userInput.value) !== true);
  console.log("userInput: ", userInput.value);
}
</script>
<template>
  <div>
    <v-container class="ma-1 d-flex justify-space-between">
      <!-- <v-form ref="form" v-model="valid" lazy-validation> -->
      <v-text-field
        label="Code"
        placeholder="ex: codeFast()"
        outlined
        hide-details="auto"
        style="max-width: 200px; margin-right: 20px"
        hint="Appuies sur Entrée pour valider"
        maxlength="20"
        :rules="[rules.characters, rules.maxLength]"
        v-model="userInput"
        @keyup.enter="submit"
      >
      </v-text-field>
      <!-- </v-form> -->

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
            value="15"
            buffer-value="30"
            stream
          ></v-progress-linear>
          <br />
          <CustomTypedJS
            :msg="'function multiply() {<br/> &nbsp;&nbsp;&nbsp; const a = prompt() <br/> &nbsp;&nbsp;&nbsp; const b = prompt() <br/> &nbsp;&nbsp;&nbsp; return alert(a * b); <br/> }; <br/> <br/> multiply();'"
            ref="typedByUserRef"
          />
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
        <v-container>
          <v-icon x-large class="d-flex justify-center"
            >mdi-robot-happy-outline
          </v-icon>
          <br />
          <br />
          <v-progress-linear
            color="green lighten-2"
            value="15"
            buffer-value="0"
            stream
          ></v-progress-linear>
          <br />
          <CustomTypedJS
            msg="function multiply() {<br/> &nbsp;&nbsp;&nbsp; const a = prompt() <br/> &nbsp;&nbsp;&nbsp; const b = prompt() <br/> &nbsp;&nbsp;&nbsp; return alert(a * b); <br/> } <br/> <br/> multiply()"
          />
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
    </v-row>
  </div>
</template>

<script>
export default {
  name: "InterfacePage",
};
</script>
