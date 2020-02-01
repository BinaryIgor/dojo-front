import Vue from 'vue'
import App from './App.vue'
import Modal from "./components/common/Modal.vue"

Vue.config.productionTip = false

//TODO better component registration
Vue.component("modal", Modal);

new Vue({
  render: h => h(App),
}).$mount('#app')
