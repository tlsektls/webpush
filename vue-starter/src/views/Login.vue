<template>
  <div class="container">

    <h2 class="my-24 text-center">웹/앱 알림 테스트 전에 계정에 로그인 해주세요.</h2>
    <div class="login-card card">
      <div class="card-body">
        <h3 class="title mb-24">로그인</h3>
        <form onsubmit="return false">
          <div class="info-body mb-10">
            <input type="text" @input="(e) => { username = e.target.value }" name="id" ref="username" class="form-control ta-form" placeholder="아이디" v-model="username">
          </div>
          <div class="info-body mb-24">
            <input type="password" @input="(e) => { password = e.target.value }" name="password" ref="password" class="form-control ta-form" placeholder="비밀번호"
              autocomplete="off" v-model="password" @keypress.enter="login()">
          </div>

          <button type="button" class="btn btn-primary btn-block btn-lg mt-16" @click="login()">로그인</button>
        </form>
        <div class="my-8 text-center">
          <router-link to="/signup">계정 생성</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
form {
  width: 100%;
}
</style>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'AppLogin',
  data() {
    return {
      username: '',
      password: '',
      loginSubmit : false
    }
  },
  components: {

  },
  computed: {
    ...mapGetters({
      refreshToken: 'token/refresh',
      accessToken : 'token/access'
    })
  },
  methods: {
    ...mapActions({
      dispatchLogin: 'token/login',
    }),
    login() {
      if(this.loginSubmit) return;
      if (this.username.trim() == '') {
        this.$root.$emit('showToast', 'danger', '아이디를 입력해주세요.');
        this.$refs.username.focus();
        return;
      }
      if (this.password.trim() == '') {
        this.$root.$emit('showToast', 'danger', '비밀번호를 입력해주세요.');
        this.$refs.password.focus();
        return;
      }

      this.loginSubmit = true;

      const formData = JSON.stringify({
        'username': this.username,
        'password': this.password,
      });

      this.dispatchLogin(formData).then(()=>{
        setTimeout(() => {this.loginSubmit = false}, 2000);
      }).catch(()=>{
        alert("로그인 에러")
        setTimeout(() => {this.loginSubmit = false}, 2000);
      });
    }
  },
  created() {
    
  },
}
</script>

