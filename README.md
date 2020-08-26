# vue-input-calculator

[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE)
[![Latest Version on NPM](https://img.shields.io/npm/v/vue-input-calculator.svg?style=flat-square)](https://www.npmjs.com/package/vue-input-calculator)
[![npm](https://img.shields.io/npm/dt/vue-input-calculator.svg?style=flat-square)](https://www.npmjs.com/package/vue-input-calculator)
[![Vue 2.x](https://img.shields.io/badge/vue-2.x-brightgreen.svg?style=flat-square)](https://vuejs.org)

> Calculator input component. Mobile friendly.
## Demo
[View demo](https://lih1989.github.io/vue-input-calculator/)

## Install

```bash
yarn add vue-input-calculator
```

Or

```bash
npm install --save vue-input-calculator
```

## Add to project

#### Global
```js
// main.js
import VueInputCalculator from "vue-input-calculator";
Vue.component('vue-input-calculator', VueInputCalculator);
```

#### Local Usage

```html
<template>
  <div>
      <input type="number" v-model.number="targetValue"/>
      <VueInputCalculator enableKeyboard v-model="targetValue">
        CALC
      </VueInputCalculator>
  </div>
</template>
<script>
  import VueInputCalculator from "vue-input-calculator";
  export default {
    name: 'component.vue',
    components: {VueInputCalculator},
    data() {
      return { targetValue: 0 }
    }
  }
</script>
```

## Setup
### Parameters

Props(Parameter) | Type | Default | Description
--------- | ---- | ------- | -----------
v-model (*required*) | `String, Number` | - | target input value
auto-apply | `Boolean` | `false` | auto continue/close on calc result
enable-keyboard | `Boolean` | `false` | enable keyboard input
persistent | `Boolean` | `false` | disable backdrop click to cancel (outside click)
readonly-input | `Boolean` | `true` | calculator input read only
is-history-logs | `Boolean` | `true` | show math operations log
z-index | `String, Number` | 1 | layer calculator z-index position 
trigger-wrapper-class | `String` | - | trigger for open calculator class styles
text-color | `String` | `#ffffff` | calculator text color
bg-color | `String` | `#2f2f31` | calculator background color
event-buttons-bg-color | `String` | `#424345` | calculator buttons color(c, &rsaquo;, &plusmn;)
number-buttons-bg-color | `String` | `#616163` | calculator buttons color(0-9.)
action-buttons-bg-color | `String` | `#f49e3f` | calculator buttons color(+-\*=)
action-success-button-bg-color | `String` | `#3ff451` | calculator OK button color

## License
[The MIT License](http://opensource.org/licenses/MIT)

### Vue CLI configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
