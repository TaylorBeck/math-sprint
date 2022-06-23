<script setup>
import { ref } from "vue";

const time = ref(30);
const points = ref(0);
const level = ref(1);
const operation = ref(null);
let timeInterval = null;

const startTimer = function() {
  timeInterval = setInterval(() => {
    if (time.value === 0) {
      clearInterval(timeInterval);
    } else {
      time.value--;
    }
  }, 1000);
}

const stopTimer = function () {
  clearInterval(timeInterval);
  time.value = 30;
};
</script>

<template>
  <div class="flex justify-center">
    <div class="w-[500px] h-[75px] bg-white mb-4 border border-black rounded-2xl p-4 text-center text-4xl font-bold font-mono grid grid-cols-2 divide-x-2">
      <span>
        &#9989; {{points}}
      </span>
      <span>
        &#9201; 00:{{time}}
      </span>
    </div>
  </div>
  <div class="flex justify-center">
    <div class="w-[500px] h-[500px] bg-indigo-100 rounded-2xl">
      <div class="flex justify-center items-center h-full">
        <span class="font-mono text-2xl">Press Play</span>
      </div>
    </div>
  </div>
  <div class="flex justify-center mt-8">
    <button
      class="bg-indigo-300 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded h-[50px] w-[200px] text-2xl mr-4"
      @click="startTimer">
      &#9654; Play
    </button>
    <button
      class="bg-rose-300 hover:bg-rose-500 text-white font-bold py-2 px-4 rounded h-[50px] w-[200px] text-2xl ml-4"
      @click="stopTimer">
      &#x2715; Stop
    </button>
  </div>
</template>
