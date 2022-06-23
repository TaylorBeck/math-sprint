<script setup>
import { ref } from "vue";

const playing = ref(false);
const time = ref(15);
const points = ref(0);
const firstNumber = ref(null);
const secondNumber = ref(null);
const solution = ref(null);
const guessedSolution = ref(null);
const operation = ref(null);
const expression = ref(null);
const gameOver = ref(false);
let timeInterval = null;

const startTimer = function() {
  timeInterval = setInterval(() => {
    if (time.value === 0) {
      clearInterval(timeInterval);
      gameOver.value = true;
      playing.value = false;
    } else {
      time.value--;
    }
  }, 1000);
}

const stopTimer = function () {
  clearInterval(timeInterval);
  time.value = 15;
  points.value = 0;
  playing.value = false;
  gameOver.value = false;
};

const generateExpression = function () {
  firstNumber.value = Math.floor(Math.random() * 10) + 1;
  secondNumber.value = Math.floor(Math.random() * 10) + 1;
  operation.value = ['+', '-', '/', '*'].at(Math.floor(Math.random() * 3));
  solution.value = getSolution(operation.value, firstNumber.value, secondNumber.value);
  guessedSolution.value = Math.floor(Math.random() * 100) >= 50 ? Math.floor(parseFloat(solution.value) + 2.00).toFixed(2) : solution.value;
  expression.value = `${firstNumber.value} ${operation.value} ${secondNumber.value} = ${guessedSolution.value}`;
};

const evaluateExpression = function () {
  return guessedSolution.value == solution.value;
}

const getSolution = function (operation, first, second) {
  switch (operation) {
    case "+": return (first + second).toFixed(2)
    case "-": return (first - second).toFixed(2)
    case "*": return (first * second).toFixed(2)
    case "/": return (first / second).toFixed(2)
    default: throw Error(`Invalid Operation: ${operation}`)
  }
}

const startGame = function () {
  playing.value = true;
  generateExpression();
  startTimer();
};

const guessTrue = function () {
  if (evaluateExpression()) {
    points.value++;
    generateExpression();
  } else {
    points.value--;
    points.value--;
    generateExpression();
  }
}

const guessFalse = function () {
  if (!evaluateExpression()) {
    points.value++;
    generateExpression();
  } else {
    points.value--;
    points.value--;
    generateExpression();
  }
}

</script>

<template>
  <div class="flex justify-center">
    <div class="w-[500px] h-[75px] bg-white mb-4 border border-black rounded-2xl p-4 text-center text-4xl font-bold font-mono grid grid-cols-2 divide-x-2">
      <span>
        &#9989; {{points}}
      </span>
      <span>
        &#9201; 00:{{`${time}`.padStart(2, '0')}}
      </span>
    </div>
  </div>
  <div class="flex justify-center">
    <div class="w-[500px] h-[400px] bg-emerald-200 rounded-2xl shadow-lg">
      <div class="flex justify-center items-center h-full">
        <div class="flex flex-col justify-around" v-if="playing">
          <span class="font-mono text-3xl font-bold" v-show="expression">{{expression}}</span>
          <div class="mt-16 text-center">
            <button
              class="bg-green-400 hover:bg-green-600 text-white font-bold rounded-lg h-[50px] w-[90px] text-2xl mr-4"
              @click="guessTrue"
            >
              True
            </button>
            <button
              class="bg-red-400 hover:bg-red-600 text-white font-bold rounded-lg h-[50px] w-[90px] text-2xl ml-4"
              @click="guessFalse"
            >
              False
            </button>
          </div>
        </div>
        <span class="font-mono text-2xl" v-else-if="!playing">
          <span v-if="gameOver">You scored {{points}} points!</span>
          <span class="border-b-2 border-b-black" v-else>Press Play</span>
        </span>
      </div>
    </div>
  </div>
  <div class="flex justify-center mt-8">
    <button
      class="bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-2 px-4 rounded h-[50px] w-[200px] text-2xl mr-12"
      @click="startGame"
      :disabled="playing">
      &#9654; Play
    </button>
    <button
      class="bg-rose-500 hover:bg-rose-400 text-white font-bold py-2 px-4 rounded h-[50px] w-[200px] text-2xl ml-12"
      @click="stopTimer"
      v-if="!gameOver">
      &#x2715; Stop
    </button>
    <button
      class="bg-rose-500 hover:bg-rose-400 text-white font-bold py-2 px-4 rounded h-[50px] w-[200px] text-2xl ml-12"
      @click="stopTimer"
      v-else>
      &#x27F3; Restart
    </button>
  </div>
</template>
