<template>
    <div style="all: unset;">
        <div :class="triggerClass" @click="show=!show">
            <slot>Click Slot</slot>
        </div>
        <div :style="colorVars" class="vue-input-calculator">
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

                        <input :readonly="readonlyInput"
                               type="string"
                               inputmode="decimal"
                               class="calculator-input"
                               v-model.number="calcValue"
                               @keyup.enter="getResult()">

                        <div class="calculator-row">
                            <div class="calculator-col">
                                <button class="calculator-btn gray action" @click="clear()">c</button>
                            </div>
                            <div class="calculator-col">
                                <button class="calculator-btn gray action" @click="deleteLastChar">&rsaquo;</button>
                            </div>
                            <div class="calculator-col">
                                <button class="calculator-btn gray action" @click="changePolar">&plusmn;</button>
                            </div>
                            <div class="calculator-col">
                                <button class="calculator-btn accent action" @click="addExpresion('/')">/</button>
                            </div>
                        </div>
                        <div class="calculator-row">
                            <div class="calculator-col">
                                <button class="calculator-btn" @click="addExpresion(7)">7</button>
                            </div>
                            <div class="calculator-col">
                                <button class="calculator-btn" @click="addExpresion(8)">8</button>
                            </div>
                            <div class="calculator-col">
                                <button class="calculator-btn" @click="addExpresion(9)">9</button>
                            </div>
                            <div class="calculator-col">
                                <button class="calculator-btn accent action" @click="addExpresion('*')">*</button>
                            </div>
                        </div>
                        <div class="calculator-row">
                            <div class="calculator-col">
                                <button class="calculator-btn" @click="addExpresion(4)">4</button>
                            </div>
                            <div class="calculator-col">
                                <button class="calculator-btn" @click="addExpresion(5)">5</button>
                            </div>
                            <div class="calculator-col">
                                <button class="calculator-btn" @click="addExpresion(6)">6</button>
                            </div>
                            <div class="calculator-col">
                                <button class="calculator-btn accent action" @click="addExpresion('-')">-</button>
                            </div>
                        </div>
                        <div class="calculator-row">
                            <div class="calculator-col">
                                <button class="calculator-btn" @click="addExpresion(1)">1</button>
                            </div>
                            <div class="calculator-col">
                                <button class="calculator-btn" @click="addExpresion(2)">2</button>
                            </div>
                            <div class="calculator-col">
                                <button class="calculator-btn" @click="addExpresion(3)">3</button>
                            </div>
                            <div class="calculator-col">
                                <button class="calculator-btn accent action" @click="addExpresion('+')">+</button>
                            </div>
                        </div>
                        <div class="calculator-row">
                            <div class="calculator-col wide">
                                <button class="calculator-btn" @click="addExpresion(0)">0</button>
                            </div>
                            <div class="calculator-col">
                                <button class="calculator-btn action" @click="addExpresion('.')">.</button>
                            </div>
                            <div class="calculator-col">
                                <button v-if="isResult" class="calculator-btn success action" @click="applyResult">ок
                                </button>
                                <button v-else class="calculator-btn accent action" @click="getResult">=</button>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
            <transition name="opacity">
                <div v-if="show" @click="persistent ? '':hideInterface()" class="backdrop"></div>
            </transition>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'VueInputCalculator',
        props: {
            value: {
                type: [Number, String],
                required: true
            },
            textColor: {
                type: String,
                default: '#ffffff'
            },
            triggerClass: {
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
            // запретить редактировать поле ввода калькулятора
            // чтобы не появлялась клавиатура ввода на мобильнызх устройствах
            readonlyInput: {
                type: Boolean,
                default: true
            },
        },
        data() {
            return {
                showStyles: false,
                show: false,
                isResult: false, // последнее действие было расчётом результата
                lastEventValueType: null, // тип данных последнего нажатия - для блокировки нескольких знаков действия подряд
                calcValue: '0',
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
                            if(typeof e === "number"){
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
            getResult() {
                // проверю наличие мат действия в конце
                // при наличии удаляю знаки провожу вычисления
                if(this.calcValue.match(/.*[/*-+]$/)){
                    this.calcValue = this.calcValue.slice(0, -1);
                }

                let log = this.calcValue;
                this.calcValue = eval(this.calcValue).toString();
                this.isResult = true;
                this.logs.push(log + `=${this.calcValue}`);

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
            applyResult() {
                this.$emit('input', this.calcValue);
                this.hideInterface();
            },
            hideInterface() {
                this.show = false;
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
            changePolar() {
                console.log('changePolar ', this.calcValue);
                if (this.calcValue !== '0') {
                    let regex = /^-/;
                    if (this.calcValue.match(regex)) {
                        this.calcValue = this.calcValue.replace(regex, '');
                    } else {
                        this.calcValue = `-${this.calcValue}`;
                    }
                }
            },
            clear() {
                this.calcValue = '0';
                this.isResult = false;
            },
            deleteLastChar() {
                console.log('deleteLastChar ', this.calcValue);
                if (this.calcValue !== '0') {
                    this.calcValue = this.calcValue.slice(0, -1);
                    if (!this.calcValue) {
                        this.calcValue = '0';
                    }
                }
            }
        },
        computed: {
            colorVars() {
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
                } else {
                    document.body.style.overflow = "initial";
                }
            }
        },
    }
</script>

<style lang="scss">
    //  https://github.com/salazarr-js/v-calculator

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
            margin: -1px auto 0 auto;
            padding: 0;
            position: fixed;
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
