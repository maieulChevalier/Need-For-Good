<script setup>
import { ref, reactive, onMounted } from "vue";
import Typed from "typed.js";
import { minMaxRandomNumber } from "../helpers/minMaxRandomNumber";

const props = defineProps({
  userInput: String,
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

const element = ref();
let typing = ref();

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
    console.log("userInput", props.userInput);
    if (props.userInput === "codeCarefully()") {
      setTimeout(stop, props.typeSpeed * minMaxRandomNumber(10, 20));
    }
    if (props.userInput === "codeQuickly()") {
      setTimeout(stop, props.typeSpeed * minMaxRandomNumber(60, 80));
    }
    if (props.userInput === "debug()") {
      setTimeout(stop, props.typeSpeed * minMaxRandomNumber(5, 10));
    }
  },
};

// function codeCarefully() {}

onMounted(() => {
  typing = new Typed(element.value, options);
});

function toggleTyping() {
  typing.start();
}

defineExpose({
  toggleTyping,
});
</script>

<template>
  <div>
    <p><span ref="element"></span></p>
    <!-- <v-btn @click="toggleTyping()" color="primary">toggle</v-btn> -->
  </div>
</template>

<script>
export default {
  name: "CustomTypedJS",
};
</script>
