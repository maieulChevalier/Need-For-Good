<script>
import axios from "axios";

export default {
  name: "LoginPage",
  data() {
    return {
      userInput: "",
      rules: {
        maxLength: (value) => value.length <= 50 || "Max 50 caractères",
        characters: (value) =>
          !!(value || "").match(/^[a-z_.-]*$/) ||
          'Ne peut contenir que lettres minuscules, "_", "-" ou "."',
      },
    };
  },
  methods: {
    submit() {
      axios
        .post(
          `${process.env.BASE_URL}/user`,
          {
            userName: this.userInput,
          }
          // {
          //   headers: {
          //     Authorization: "Bearer " + token, //the token is a variable which holds the token
          //   },
          // }
        )
        .then(() => window.localStorage.setItem("userName", this.userInput))
        .then(() =>
          this.$router.push({
            path: "/",
          })
        );
    },
  },
};
</script>

<template>
  <div>
    <v-container class="ma-1 d-flex justify-center align-items-center">
      <v-text-field
        autofocus
        label="Nom d'utilisateur"
        placeholder="ex: MrChaton"
        outlined
        style="max-width: 200px; margin-right: 20px"
        maxlength="50"
        :rules="[rules.characters, rules.maxLength]"
        v-model="userInput"
        @keyup.enter="submit"
      >
      </v-text-field>
      <v-btn @click="submit" elevation="9" x-large color="primary">
        Démarrer
      </v-btn>
    </v-container>
  </div>
</template>
