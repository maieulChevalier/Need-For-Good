<template>
  <v-card class="mx-auto px-2">
    <v-card-title class="mb-2 d-flex justify-space-between">
      <span class="text-subtitle-2">10/09/1997</span>
      <span><strong>Victoire !</strong></span>
    </v-card-title>
    <v-row class="">
      <v-col :cols="5">
        <v-icon x-large class="d-flex justify-center">mdi-human-child</v-icon>
        <v-container>
          <v-progress-linear
            background-color="red lighten-2"
            color="green lighten-2"
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
            background-color="red lighten-2"
            color="green lighten-2"
            stream
          ></v-progress-linear>
        </v-container>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "HistoryPage",
};
</script>
