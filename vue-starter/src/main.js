import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import api from './api';
import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);

console.log('🔍 navigator.serviceWorker:', navigator.serviceWorker);
if(!navigator.serviceWorker) alert("navig No ")

// Custom Javscript
import './assets/mjs/main';
import Utils from './assets/js/custom.fed';
import './registerServiceWorker'
Vue.prototype.$utils = Utils;
Vue.prototype.$global = {};


// select2
import 'select2';

// Axios API
Vue.prototype.$api = api;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/service-worker.js')
    .then((reg) => {
      console.log('✅ Service Worker registered:', reg);
    })
    .catch((err) => {
      console.error('❌ Service Worker registration failed:', err);
    });
}
/**
 * EventBus
 * ex)
 * this.$eventBus.$emit('event', data);
 * this.$eventBus.$on('event', (data) => {});
 */
const eventBus = new Vue();
Vue.prototype.$eventBus = eventBus;
Vue.use(eventBus);

// Default Vue Settings
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  api,
  render: (h) => h(App),
}).$mount('#app');


