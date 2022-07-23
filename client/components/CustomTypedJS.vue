<script setup>
import { ref, onMounted } from "vue";
import Typed from "typed.js";

const props = defineProps({
  msg: String,
  typeSpeed: {
    default: 1,
    type: Number,
  },
  showCursor: {
    default: false,
    type: Boolean,
  },
});

const options = {
  strings: [props.msg],
  typeSpeed: props.typeSpeed,
};

const element = ref(null);

onMounted(() => {
  const typed = new Typed(element.value, options);
});
</script>

<template>
  <p><span ref="element"></span></p>
</template>

<script>
export default {
  name: "CustomTypedJS",
};
</script>
