<template>
  <div>
    <HistoryCard />
    <br />
    <HistoryCard />
    <br />
    <HistoryCard />
    <br />
    <HistoryCard />
  </div>
</template>

<script>
import HistoryCard from "../components/HistoryCard.vue";
export default {
  name: "HistoryPage",
  components: { HistoryCard },
};
</script>
