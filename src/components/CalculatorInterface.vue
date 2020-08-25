<template>
  <div :style="styleVars" class="vue-input-calculator">
    <transition name="slide">
      <div class="calc-wrapper" v-if="show">
        <div class="calculator">
          <div class="calculator-logs"
               ref="historyLog"
               v-if="isHistoryLogs">
                            <span v-for="(log, index) in logs"
                                  :key="index"
                                  @click="logToValue(log)">{{ log }}</span>
          </div>

          <input readonly
                 type="text"
                 class="calculator-input"
                 v-model="expresion">

          <div class="calculator-row">
            <div class="calculator-col">
              <button class="calculator-btn gray action" @click="clear()">c</button>
            </div>
            <div class="calculator-col wide">
              <button class="calculator-btn gray action" @click="deleteLastChar">&rsaquo;</button>
            </div>
            <div class="calculator-col">
              <button class="calculator-btn accent action" @click="touchHandler('/')">/</button>
            </div>
          </div>
          <div class="calculator-row">
            <div class="calculator-col">
              <button class="calculator-btn" @click="touchHandler('7')">7</button>
            </div>
            <div class="calculator-col">
              <button class="calculator-btn" @click="touchHandler('8')">8</button>
            </div>
            <div class="calculator-col">
              <button class="calculator-btn" @click="touchHandler('9')">9</button>
            </div>
            <div class="calculator-col">
              <button class="calculator-btn accent action" @click="touchHandler('*')">*</button>
            </div>
          </div>
          <div class="calculator-row">
            <div class="calculator-col">
              <button class="calculator-btn" @click="touchHandler('4')">4</button>
            </div>
            <div class="calculator-col">
              <button class="calculator-btn" @click="touchHandler('5')">5</button>
            </div>
            <div class="calculator-col">
              <button class="calculator-btn" @click="touchHandler('6')">6</button>
            </div>
            <div class="calculator-col">
              <button class="calculator-btn accent action" @click="touchHandler('-')">-</button>
            </div>
          </div>
          <div class="calculator-row">
            <div class="calculator-col">
              <button class="calculator-btn" @click="touchHandler('1')">1</button>
            </div>
            <div class="calculator-col">
              <button class="calculator-btn" @click="touchHandler('2')">2</button>
            </div>
            <div class="calculator-col">
              <button class="calculator-btn" @click="touchHandler('3')">3</button>
            </div>
            <div class="calculator-col">
              <button class="calculator-btn accent action" @click="touchHandler('+')">+</button>
            </div>
          </div>
          <div class="calculator-row">
            <div class="calculator-col wide">
              <button class="calculator-btn" @click="touchHandler('0')">0</button>
            </div>
            <div class="calculator-col">
              <button class="calculator-btn action" @click="touchHandler('.')">.</button>
            </div>
            <div class="calculator-col">
              <button v-if="isResult" class="calculator-btn success action" @click="applyResult">ок
              </button>
              <button v-else class="calculator-btn accent action" @click="touchHandler('=')">=</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="opacity">
      <div v-if="show" @click="persistent ? '':hideInterface()" class="backdrop"></div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "CalculatorInterface",
  props: [
    "value",
    "zIndex",
    "textColor",
    "triggerWrapperClass",
    "bgColor",
    "eventButtonsBgColor",
    "numberButtonsBgColor",
    "actionButtonsBgColor",
    "actionSuccessButtonBgColor",
    "isHistoryLogs",
    "autoApply",
    "persistent",
    "show"
  ],
  data() {
    return {
      showStyles: false,
      isResult: false, // последнее действие было расчётом результата
      lastEventValueType: null, // тип данных последнего нажатия - для блокировки нескольких знаков действия подряд
      calcValue: '0',
      expresion: '0',
      logs: []
    }
  },
  methods: {
    addExpresion(e) {
      // console.warn('START: ', e, this.calcValue, this.isResult);
      if (this.isResult) {
        if (Number.isNaN(Number.parseFloat(e))) {
          // console.error('ДЕЙСТВИЕ: ', e, this.calcValue, this.isResult);
          this.calcValue += e;
        } else {
          // console.error('ЧИСЛО: ', e, this.calcValue, this.isResult);
          this.calcValue = e;
        }
        this.isResult = false;
      } else {
        if (this.lastEventValueType === typeof e && typeof e === 'string') {
          this.deleteLastChar();
          this.calcValue += e.toString();
        } else {
          if (this.calcValue === 0 || this.calcValue === '0') {
            // console.error('НУЛЬ: ', e, this.calcValue, this.isResult);
            if (typeof e === "number") {
              this.calcValue = e.toString()
            } else {
              // если в значении находится ноль и  пришел знак действия
              // ничего неделаю
            }
          } else {
            this.calcValue += e.toString();
          }
        }
      }
      this.lastEventValueType = typeof e;
      // console.warn('END: ', e, this.calcValue, this.isResult);
    },
    applyResult() {
      this.$emit('input', this.calcValue);
      this.hideInterface();
    },
    hideInterface() {
      this.$emit('hide');
      // TODO плохо! Нужно придумать выход!
      // скрою стили только после отыгрыша анимации
      setTimeout(() => {
        this.showStyles = false;
      }, 500);
    },

    logToValue(log) {
      if (log) {
        this.calcValue = log.replace(/=.*/, '');
        this.isResult = false;
      }
    },


    keyboardHandler(event) {
      let allowValue = (event.key).match(/[0-9%/*\-+=.,]|Backspace|Enter/);
      if (Array.isArray(allowValue) && allowValue.input) {
        this.prepareInput(allowValue.input);
      }
    },
    touchHandler(value) {
      this.prepareInput(value);
    },
    prepareInput(value) {
      let inputIsAction = Number.isNaN(Number.parseInt(value));
      let lastSimbolIsAction = Number.isNaN(Number.parseInt(this.expresion.slice(-1)))
      console.log({value, expresion: this.expresion, inputIsAction, lastSimbolIsAction});
      if (inputIsAction && lastSimbolIsAction) {
        // провожу замену символа действия
        return this.expresion = this.expresion.slice(0, -1) + value;
      } else if (inputIsAction && (value === 'Enter' || value === '=')) {
        // проверю наличие незавершенного выражения - мат действия в конце
        // при наличии удаляю знак c конца и провожу вычисления
        if (lastSimbolIsAction) {
          this.expresion = this.expresion.slice(0, -1);
        }
        return this.calculate(); // расчитываю результат по выражению
      }

      // заменим запятую на точку для универсальности при разных раскладках
      if (value === ',') value = '.';

      // если выражение не изменялось и пытаются ввести 0 - игнорим
      if (this.expresion === '0') {
        if (value === '0') {
          // значение обнулено - значит ничего не нужно делать
          return '';
        } else if (!inputIsAction) {
          return this.expresion = value;
        }
      }
      this.expresion += value;
      console.error('prepareInput', value);
    },
    calculate() {
      let log = this.expresion;

      // пробуем выполнить операцию
      try {
        this.expresion = eval(this.expresion).toString();
        this.isResult = true;
        this.logs.push(log + `=${this.expresion}`);
      } catch {
        console.log('Error eval: ', this.expresion);
      }

      // прокрутим лог к последнему действию
      if (this.$refs.historyLog) {
        this.$nextTick(() => {
          this.$refs.historyLog.scrollTop = this.$refs.historyLog.scrollHeight;
        });
      }

      if (this.autoApply) {
        this.applyResult();
      }
    },
    clear() {
      this.expresion = '0';
      this.isResult = false;
    },
    deleteLastChar() {
      console.log('deleteLastChar ', this.expresion);
      if (this.expresion !== '0') {
        this.expresion = this.expresion.slice(0, -1);
        if (!this.expresion) {
          this.expresion = '0';
        }
      }
    },
  },
  computed: {
    styleVars() {
      return {
        '--vue-input-calculator-text-color': this.textColor,
        '--vue-input-calculator-bg-color': this.bgColor,
        '--vue-input-calculator-event-btn-bg-color': this.eventButtonsBgColor,
        '--vue-input-calculator-number-btn-bg-color': this.numberButtonsBgColor,
        '--vue-input-calculator-action-btn-bg-color': this.actionButtonsBgColor,
        '--vue-input-calculator-action-success-btn-bg-color': this.actionSuccessButtonBgColor,
        ...(this.showStyles) && {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          height: '100%',
          width: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: this.zIndex
        }
      };
    }
  },
  watch: {
    show(newValue) {
      if (newValue) {
        document.body.style.overflow = "hidden";
        this.calcValue = this.value.toString();
        this.showStyles = true;
        document.addEventListener('keydown', this.keyboardHandler);
      } else {
        document.body.style.overflow = "initial";
        document.removeEventListener('keydown', this.keyboardHandler);
      }
    }
  }
}
</script>

<style lang="scss" scoped>

*, ::after, ::before {
  box-sizing: border-box;
}

.vue-input-calculator {
  z-index: 0;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently not supported by any browser */

  // обёртка калькулятора
  .calc-wrapper {
    padding: 0;
    position: fixed;
    bottom: 0;
    z-index: 1;

    // калькулятор
    .calculator {
      width: 100%;
      display: flex;
      margin: 0 auto;
      flex-direction: column;
      max-width: 720px;
      min-width: 320px;
      background-color: var(--vue-input-calculator-bg-color);
      box-shadow: 0 0 0 1px var(--vue-input-calculator-bg-color);

      .calculator-logs {
        padding: 0 .8rem 0 .8rem;
        max-height: 100px;
        display: flex;
        position: relative;
        overflow: auto;
        align-items: flex-end;
        flex-direction: column;
        background: var(--vue-input-calculator-event-btn-bg-color);

        .header {
          color: var(--vue-input-calculator-text-color);
          align-self: flex-start;
          position: sticky;
          top: 0;
          left: 0;
          padding-top: 5px;
        }

        span {
          color: var(--vue-input-calculator-text-color);
          opacity: .75;
          display: block;
          font-size: 1rem;
          text-align: right;
          padding: .4rem 0;
          line-height: 1;
          font-weight: lighter;
        }
      }

      .calculator-input {
        color: var(--vue-input-calculator-text-color);
        width: 100%;
        border: none;
        padding: .8rem;
        display: block;
        font-size: 2.4rem;
        background: none;
        text-align: right;
        font-weight: lighter;

        &:focus, &:active {
          outline: none;
        }
      }

      .calculator-row {
        display: flex;
        padding: 0;
        justify-content: space-around;

        .calculator-col {
          flex: 1;
          box-shadow: 0 0 0 1px var(--vue-input-calculator-bg-color);

          &.wide {
            flex: 2;
          }
        }
      }

      .calculator-btn {
        width: 100%;
        color: var(--vue-input-calculator-text-color);
        border: none;
        cursor: pointer;
        padding: .3rem;
        outline: none;
        font-size: 2rem;
        transition: all .3s ease-in-out;
        font-weight: 200;
        justify-content: center;
        background-color: var(--vue-input-calculator-number-btn-bg-color);

        &.success {
          background-color: var(--vue-input-calculator-action-success-btn-bg-color);
          color: var(--vue-input-calculator-text-color);
        }

        &.accent {
          background-color: var(--vue-input-calculator-action-btn-bg-color);
          color: var(--vue-input-calculator-text-color);
        }

        &.gray {
          background-color: var(--vue-input-calculator-event-btn-bg-color);
        }

        &.action {
        }

        &:active {
          background-color: var(--vue-input-calculator-bg-color);
        }
      }

    }
  }

  // подложка под калькулятором
  .backdrop {
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    z-index: 0;
  }
}

// анимация движения калькулятора
.slide-enter-active {
  animation: slide-in 0.5s;
}

.slide-leave-active {
  animation: slide-in 0.3s reverse;
}

@keyframes slide-in {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

// анимация прозрачности фона - бекдропа
.opacity-enter-active {
  animation: opacity-in 0.5s;
}

.opacity-leave-active {
  animation: opacity-in 0.3s reverse;
}

@keyframes opacity-in {
  100% {
    opacity: 1;
  }
  0% {
    opacity: 0;
  }
}
</style>
