import Vue from 'vue'
import App from './App.vue'
import Modal from './components/common/Modal.vue'
import ConfirmationModal from "./components/common/ConfirmationModal.vue";
import Navigation from './components/common/Navigation.vue'

Vue.config.productionTip = false

//TODO better component registration
Vue.component('modal', Modal);
Vue.component('confirmation-modal', ConfirmationModal);
Vue.component('navigation', Navigation);

new Vue({
  render: h => h(App),
}).$mount('#app')
