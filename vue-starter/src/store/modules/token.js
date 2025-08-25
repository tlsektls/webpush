import $api from '@/api';
import $router from '@/router';
//import { sign } from 'core-js/core/number';

const store = {
  state: {
    access: '',
    refresh: '',
    userinfo: null,
  },
  getters: {
    access: (state) => {
      return state.access;
    },
    refresh: (state) => {
      return state.refresh;
    },
    userinfo: (state) => {
      return state.userinfo;
    },
    //role: (state) => {
    //  return state.role;
    //},
  },
  mutations: {
    access(state, payload) {
      state.access = payload;
    },
    refresh(state, payload) {
      state.refresh = payload;
    },
    userinfo(state, payload) {
      state.userinfo = payload;
    },
    //role(state, payload) {
    //  state.role = payload;
    //},
  },
  actions: {
    login(context, payload) {
      return new Promise((resolve, reject) => {
      $api.login(payload)
        .then((res) => {
          console.log("res", res)
          if(res.status === 200) {
            context.commit('access', res.data.access_token);
            context.commit('userinfo', res.data.userinfo);
            //context.dispatch('userinfo');
            $router.replace({ path: '/pushtest' });
            resolve(res);
          } else {
            alert(res.data.error)
          }
        })
        .catch((err) => {
          reject(err);
        });
      });
    },
    signup(context, payload) {
      return new Promise((resolve, reject) => {
      $api.signup(payload)
        .then((res) => {
          console.log("res", res)
          if(res.status === 200) {
            $router.replace({ path: '/login' });
            resolve(res);
          }
        })
        .catch((err) => {
          reject(err);
        });
      });
    },
    logout(context) {
      //context.commit('access', '');
      //context.commit('refresh', '');
      context.commit('role', null);
    },
  }
}

export default store