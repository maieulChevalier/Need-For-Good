<script>
import axios from "axios";
import HistoryCard from "../components/HistoryCard.vue";
export default {
  name: "HistoryPage",
  components: { HistoryCard },
  data() {
    return {
      gamesHistory: undefined,
      awesome: true,
    };
  },
  methods: {},
  async mounted() {
    await axios
      .get(
        `${
          process.env.BASE_URL
        }/user/games-history?userName=${this.$cookies.get("userName")}`
      )
      .then((user) => {
        this.gamesHistory = user.data.gamesHistory;
      });
  },
};
</script>

<template>
  <div>
    <v-container v-if="!!gamesHistory" v-for="(game, index) in gamesHistory">
      <HistoryCard
        :key="index"
        :date="game.date"
        :userProgressionRate="game.userProgressionRate"
        :computerProgressionRate="game.computerProgressionRate"
      />
    </v-container>
    <v-progress-circular
      v-else
      indeterminate
      color="primary"
    ></v-progress-circular>
  </div>
</template>
