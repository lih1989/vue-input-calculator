import { shallowMount } from '@vue/test-utils'
import CalculatorInterface from '@/components/CalculatorInterface'
import { buildMathExp } from "./expGenerator";

describe('CalculatorInterface.vue', () => {
  it('При расчётах не возникают ошибки и всегла возвращается число!', () => {
    const wrapper = shallowMount(CalculatorInterface, {
      propsData: {
        show: true,
        floatResultFixedCount:3
      }
    });

    let ch = 0;
    while (ch < 20000){
      let exp = buildMathExp(3);
      let expArray = exp.split(' ');
      for (let value of expArray){
        wrapper.vm.prepareInput(value);
      }
      wrapper.vm.prepareInput('=');
      expect(wrapper.vm.error).toBe(false);
      expect(Number.isNaN(Number.parseFloat(wrapper.vm.expresion))).toBe(false);
      wrapper.vm.clear();
      ch++;
    }
  })
});
