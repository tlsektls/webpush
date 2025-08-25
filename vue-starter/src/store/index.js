import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

import modules from '@/store/modules'

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      // 값이 유지되어야 할 module
      paths: ['token'],
    })
  ],
  modules
});
