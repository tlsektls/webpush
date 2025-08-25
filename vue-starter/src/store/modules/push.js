import $api from '@/api';
//import $router from '@/router';

const store = {
  state: {
    msg: '',
  },
  getters: {
    msg: (state) => {
      return state.msg;
    },
  },
  mutations: {
    msg(state, payload) {
      state.msg = payload;
    },
  },
  actions: {
    saveSub(context, payload) {
      return new Promise((resolve, reject) => {
      $api.saveSub(payload)
        .then((res) => {
          console.log("pushMsg", res)
        })
        .catch((err) => {
          reject(err);
        });
      });
    },
    pushMsg(context, payload) {
      return new Promise((resolve, reject) => {
      $api.pushMsgToUser(payload)
        .then((res) => {
          console.log("pushMsg", res)
        })
        .catch((err) => {
          reject(err);
        });
      });
    },
  }
}

export default store