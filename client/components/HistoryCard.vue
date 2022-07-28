<script>
export default {
  name: "HistoryPage",
  props: {
    date: String,
    userProgressionRate: Number,
    computerProgressionRate: Number,
  },
};
</script>

<template>
  <v-card class="mx-auto px-2">
    <v-card-title class="mb-2 d-flex justify-space-between">
      <span class="text-subtitle-2">{{
        new Date(this.date).toLocaleString("fr")
      }}</span>
      <span v-if="userProgressionRate >= 100 && computerProgressionRate < 100">
        <strong>{{ "Victoire !" }}</strong>
      </span>
      <span
        v-else-if="userProgressionRate < 100 && computerProgressionRate >= 100"
      >
        <strong>{{ "Défaite !" }}</strong>
      </span>
      <span v-else>
        <strong>{{ "Execo !" }}</strong>
      </span>
    </v-card-title>
    <v-row class="">
      <v-col :cols="5">
        <v-icon x-large class="d-flex justify-center">mdi-human-child</v-icon>
        <v-container>
          <v-progress-linear
            background-color="green lighten-5"
            color="green lighten-2"
            v-model="userProgressionRate"
            stream
          ></v-progress-linear>
        </v-container>
      </v-col>
      <v-col :cols="2" class="text-center"> VS </v-col>
      <v-col :cols="5">
        <v-icon x-large class="d-flex justify-center">
          mdi-robot-happy-outline
        </v-icon>
        <v-container>
          <v-progress-linear
            background-color="green lighten-5"
            color="green lighten-2"
            v-model="computerProgressionRate"
            stream
          ></v-progress-linear>
        </v-container>
      </v-col>
    </v-row>
  </v-card>
</template>
