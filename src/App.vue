<template>
  <div id="app">
    <div v-for="(num, index) in inputNumbers" :key="index"
         style="display: flex; flex-direction: row; padding: 5px 10px">
      <div>
        {{ index + 1 }}
      </div>
      <div style="color: white;">
        Default: <input type="number" v-model.number="inputNumbers[index]">
      </div>
      <VueInputCalculator v-model="inputNumbers[index]" :is-history-logs="true"/>
    </div>
  </div>
</template>

<script>
import VueInputCalculator from "@/components/VueInputCalculator";

export default {
  name: 'App',
  components: {
    VueInputCalculator
  },
  data() {
    return {
      inputNumbers: [0, 0, 0, 0, 0, 0, 0, 0]
    }
  },
}
</script>
