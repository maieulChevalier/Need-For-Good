<script setup>
import { onMounted } from "vue";

import CustomTypedJS from "../components/CustomTypedJS.vue";

// Ajouter les 4 actions
// Ajouter couleurs au code "écrit" par l'utilisateur et l'IA
// Protéger le TextField
// Écrire les tests

function multiply() {
  const a = prompt();
  const b = prompt();
  return alert(a * b);
}

function codeCarefully() {}
onMounted(() => {
  // multiply();
});
</script>
<template>
  <div>
    <v-container class="ma-1 d-flex justify-space-between">
      <v-text-field
        label="Code"
        placeholder="ex: codeFast()"
        outlined
        hide-details="auto"
        style="max-width: 200px; margin-right: 20px"
        hint="Appuies sur Entrée pour valider"
      ></v-text-field>

      <v-btn elevation="9" x-large color="primary" :to="'/interface'">
        RESET
      </v-btn>
    </v-container>

    <br />

    <v-row>
      <v-col>
        <v-container>
          <v-icon x-large class="d-flex justify-center"
            >mdi-tooltip-account
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
