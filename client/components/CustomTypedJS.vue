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
  onBegin: (self) => {
    self.toggle();
  },
};

const element = ref(null);
let typing = ref(null);

function hello() {
  typing.toggle();
}

onMounted(() => {
  typing = new Typed(element.value, options);
  // const typingRef = ref(typing);
});
</script>

<template>
  <div>
    <p><span ref="element"></span></p>
    <v-btn @click="hello" color="primary">toggle</v-btn>
  </div>
</template>

<script>
export default {
  name: "CustomTypedJS",
};
</script>
