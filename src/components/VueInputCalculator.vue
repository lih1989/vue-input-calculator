<template>
  <div style="all: unset;">
    <div :class="triggerWrapperClass" @click="show=!show">
      <slot>Trigger</slot>
    </div>
    <CalculatorInterface @input="$emit('update:modelValue', $event)" @hide="show=false" :show="place==='in-place' || show" v-bind="$props"/>
  </div>
</template>

<script>
import CalculatorInterface from "@/components/CalculatorInterface";
export default {
  name: 'VueInputCalculator',
  components: {CalculatorInterface},
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: [Number, String],
      default: 0
    },
    zIndex: {
      type: [Number, String],
      default: 9999
    },
    floatResultFixedCount: {
      type: Number,
      default: 3
    },
    textColor: {
      type: String,
      default: '#ffffff'
    },
    triggerWrapperClass: {
      type: String,
      default: ''
    },
    bgColor: {
      type: String,
      default: '#2f2f31'
    },
    eventButtonsBgColor: {
      type: String,
      default: '#424345'
    },
    numberButtonsBgColor: {
      type: String,
      default: '#616163'
    },
    actionButtonsBgColor: {
      type: String,
      default: '#f49e3f'
    },
    actionSuccessButtonBgColor: {
      type: String,
      default: '#3ff451'
    },
    isHistoryLogs: { // показывать ли лог операций
      type: Boolean,
      default: true
    },
    autoApply: { // принимать значение и закрывать калькулятор при нажатии на =
      type: Boolean,
      default: false
    },
    persistent: { // закрытие при клике на подложку
      type: Boolean,
      default: false
    },
    enableKeyboard: { // нужен ли ввод с клавиатуры
      type: Boolean,
      default: false
    },
    place: {
      type: String,
      default: 'modal'
    }
  },
  data() {
    return {
      show: false
    }
  }
}
</script>
