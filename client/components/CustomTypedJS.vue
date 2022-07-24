<script setup>
import { ref, onMounted } from "vue";
import Typed from "typed.js";
import { minMaxRandomNumber } from "../helpers/minMaxRandomNumber";

const props = defineProps({
  msg: String,
  typeSpeed: {
    default: 20,
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
    self.stop();
  },
  onStart: (pos, self) => {
    function stop() {
      self.stop();
    }
    setTimeout(stop, props.typeSpeed * minMaxRandomNumber(10, 20));
  },
};

// console.log("typerandom", props.typeSpeed);

const element = ref();
let typing = ref();

onMounted(() => {
  typing = new Typed(element.value, options);
});

function toggleTyping() {
  typing.start();
}
</script>

<template>
  <div>
    <p><span ref="element"></span></p>
    <v-btn @click="toggleTyping" color="primary">toggle</v-btn>
  </div>
</template>

<script>
export default {
  name: "CustomTypedJS",
};
</script>
