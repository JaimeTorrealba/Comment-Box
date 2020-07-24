import Vue from 'vue'
import App from './App.vue'
import i18n from './i18n'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)

Vue.config.productionTip = false

require("./assets/main.scss")

new Vue({
  i18n,
  render: h => h(App)
}).$mount('#app')
