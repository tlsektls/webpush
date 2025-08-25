<template>
  <div class="container">
    <div class="login-card card">
      <div class="card-body">
        <h3 class="title mb-24">회원가입</h3>

        <form onsubmit="return false">

          <div class="info-body mb-10">
            <label>아이디:</label>
            <input type="text" @input="(e) => { username = e.target.value }" name="id" ref="username" class="form-control ta-form" placeholder="아이디" v-model="username">
          </div>
          <div class="info-body mb-10">
            <label>비밀번호:</label>
            <input type="password" @input="(e) => { password = e.target.value }" name="password" ref="password" class="form-control ta-form" placeholder="비밀번호"
              autocomplete="off" v-model="password" @keypress.enter="login()">
          </div>
          <div class="info-body mb-10">
            <label>권한:</label>

            <div class="ta-radio-wrap">
              <input type="radio" name="role" id="role_user" class="sr-only" value=true v-model="role" />
              <label for="role_user">일반 사용자</label>
            </div>
            <div class="ta-radio-wrap">
              <input type="radio" name="role" id="role_admin" class="sr-only" value=false v-model="role" />
              <label for="role_admin">관리자</label>
            </div>
          </div>
          <button type="button" class="btn btn-primary btn-block btn-lg mt-16" @click="signup()">가입하기</button>

          <!--<button type="submit">가입하기</button>-->
        </form>
        <p v-if="message">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: "SignUp",
  data() {
    return {
      username: "",
      password: "",
      role: "user",
      message: ""
    };
  },
  methods: {
    ...mapActions({
      dispatchSignup: 'token/signup',
    }),
    signup() {
      let dddd = {
        'username': this.username,
        'password': this.password,
        'role': this.role
      }
      this.dispatchSignup(dddd).then(()=>{}).catch(()=>{});
    }
  }
};
</script>
