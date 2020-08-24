<template>
  <div id="app">
    <div class="gh-link">
      <a href="https://github.com/lih1989/vue-input-calculator" target="_blank"
         aria-label="View source on GitHub">
        <svg width="80" height="80" viewBox="0 0 250 250"
             style="position: absolute; top: 0px; right: 0px; border: 0px;" aria-hidden="true">
          <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" fill="#151513"></path>
          <path class="octo-arm"
                d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
                fill="#ffffff" style="transform-origin: 130px 106px;"></path>
          <path class="octo-body"
                d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
                fill="#ffffff"></path>
        </svg>
      </a>
    </div>
    <div class="vue-logo">
      <img width="70" height="70" alt="Vue logo" src="./assets/vue-logo.png">
      <div>Vue Input Calculator</div>
    </div>
    <div class="preview-block">
      <div class="input-label">Default:</div>
      <div class="sample">
        <input type="number" v-model.number="inputSimple"/>
        <VueInputCalculator v-model="inputSimple">
          Calc
        </VueInputCalculator>
      </div>
      <div class="input-label">Color Styling:</div>
      <div class="sample">
        <input type="number" v-model.number="inputSimple"/>

        <VueInputCalculator v-model="inputSimple"
                            :is-history-logs="true"
                            textColor="#ffffff"
                            bgColor="#151515"
                            eventButtonsBgColor="#333333"
                            numberButtonsBgColor="#212121"
                            actionButtonsBgColor="#333333"
                            actionSuccessButtonBgColor="#156900">
          <div class="calculator-icon">
            <svg width="40" height="40" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000"
                 enable-background="new 0 0 1000 1000" xml:space="preserve">
                              <g>
                                <g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)">
                                  <path fill="#2c3e50"
                                        d="M1694.1,4969.9c-238.5-76.6-417.9-242.8-514.1-479.1l-52.5-124.7V117.3c0-4218.1,0-4250.9,43.8-4369.1c91.9-242.8,273.5-415.7,522.9-494.4c135.6-43.8,196.9-43.8,3305.8-43.8c3097.9,0,3170.2,0,3305.8,43.8c168.5,52.5,330.4,170.7,428.8,312.9c148.8,218.8,137.8-109.4,137.8,4544.1c0,4653.5,10.9,4325.3-137.8,4544.1c-98.5,142.2-260.4,260.4-428.8,312.9c-135.6,43.8-205.6,43.8-3314.5,41.6C2002.6,5009.3,1810.1,5007.1,1694.1,4969.9z M7887.8,2998.7v-743.9H4999.9H2112v743.9v743.9h2887.9h2887.9V2998.7z M3706.9,1174c94.1-50.3,111.6-118.1,111.6-450.7V417h306.3c332.6,0,400.4-17.5,450.7-111.6c63.4-124.7,21.9-336.9-76.6-391.6c-24.1-10.9-186-21.9-361-21.9h-319.4v-306.3c0-413.5-35-481.3-249.4-481.3c-240.7,0-275.7,61.3-275.7,481.3v306.3H2974c-175,0-336.9,10.9-361,21.9c-98.5,54.7-140,266.9-76.6,391.6c50.3,94.1,118.1,111.6,450.7,111.6h306.3v312.9c2.2,332.6,15.3,391.6,111.6,444.1C3475,1213.4,3630.3,1211.2,3706.9,1174z M7419.6,342.6c63.4-63.4,74.4-89.7,74.4-177.2c0-113.8-26.3-179.4-96.3-234.1c-41.6-35-126.9-39.4-960.4-39.4h-916.7l-63.4,63.4c-54.7,54.7-63.5,81-63.5,181.6c2.2,63.4,15.3,140,30.6,168.4c61.3,109.4,72.2,109.4,1026.1,111.6h894.8L7419.6,342.6z M6597-1457.9c35-19.7,72.2-59.1,85.3-87.5c56.9-122.5,10.9-328.2-83.2-378.5c-24.1-10.9-98.5-21.9-166.3-21.9c-107.2,0-131.3,8.8-188.1,63.5c-54.7,54.7-63.5,81-63.5,181.6c2.2,131.3,35,207.8,111.6,249.4C6367.3-1409.8,6524.8-1414.2,6597-1457.9z M3313.1-1869.3l234.1-229.7l245,229.7c218.8,203.5,253.8,229.7,323.8,229.7c65.6,0,98.5-17.5,175-96.3c140-140,135.6-207.8-32.8-400.4c-70-83.1-175-192.5-229.7-247.2l-100.6-96.3l229.7-234.1c212.2-214.4,229.7-238.5,229.7-317.2c0-70-15.3-100.7-91.9-177.2c-80.9-83.1-105-94.1-188.1-94.1c-91.9,0-105,8.8-326,225.3l-229.7,225.4l-223.1-225.4c-218.8-221-225.4-225.3-323.8-225.3c-89.7,0-107.2,8.8-190.3,98.4c-70,76.6-89.7,113.8-89.7,177.2c0,72.2,21.9,102.8,229.7,312.9l227.5,231.9l-227.5,231.9c-218.8,221-229.7,236.3-229.7,326c0,80.9,13.1,105,96.3,188.2c78.8,78.8,109.4,96.3,177.2,96.3C3074.6-1639.5,3100.9-1659.2,3313.1-1869.3z M7419.6-2282.7c63.4-63.4,74.4-89.7,74.4-177.2c0-113.8-26.3-179.4-96.3-234.1c-41.6-35-126.9-39.4-960.4-39.4h-916.7l-63.4,63.5c-54.7,54.7-63.5,81-63.5,181.6c2.2,63.5,15.3,140,30.6,168.5c61.3,109.4,72.2,109.4,1026.1,111.6h894.8L7419.6-2282.7z M6594.8-3026.6c72.2-39.4,111.6-118.1,111.6-234.1c0-186-107.2-275.7-308.5-256c-144.4,15.3-196.9,67.8-212.2,212.2c-13.1,133.4,24.1,234.1,102.8,275.7C6362.9-2989.4,6518.3-2987.2,6594.8-3026.6z"/>
                                </g>
                              </g>
                        </svg>
          </div>
        </VueInputCalculator>
      </div>
      <div class="input-label">
        Props:
        <small>
          is-history-logs, auto-apply, persistent
        </small>
      </div>
      <div class="sample">
        <input type="number" v-model.number="inputSimple"/>
        <VueInputCalculator v-model="inputSimple"
                            :is-history-logs="false"
                            :auto-apply="true"
                            :persistent="true">
          <button style="height: 34px;background-color: #2c3e50;color: white; font-weight: 600">+/-</button>
        </VueInputCalculator>
      </div>
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
      inputSimple: 0
    }
  },
}
</script>
<style lang="scss">
html, body, #app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.calculator-icon {
  display: flex;
  margin: auto;
  cursor: pointer;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  align-items: center;

  .gh-link {
    align-self: flex-end;
    position: sticky;
    top: 0;
    right: 0;
  }

  .vue-logo {
    margin-top: 2rem;
    text-align: center;

    img {
      max-width: 70%;
    }

    div {
      font-weight: bolder;
      font-size: 2rem;
      padding: 1rem 0;
    }
  }

  .preview-block {
    padding: 1rem;
    background-color: #e6e6e6;
    min-width: 300px;
    max-width: 400px;


    & > .input-label {
      font-weight: bold;
      color: #2c3e50;
      margin: 7px 0 5px 0;
    }

    .sample {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      background-color: white;
      padding: 3px;

      & > input {
        max-width: 200px;
        height: 40px;
        text-align: right;
        font-size: 34px;
        color: #2c3e50;
        border: none;
      }
    }
  }
}
</style>
