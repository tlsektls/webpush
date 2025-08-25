<template>
  <footer class="layout-footer">
    <div class="container">
      <h2 class="d-flex align-items-center mb-16">
        <router-link to="/" class="navbar-brand">
          <img src="@/assets/images/logo/logo.png" alt="로고">
        </router-link>
      </h2>
      <div class="term-wrap">
        <router-link to="#">법적고지</router-link>
        <router-link to="#">서비스 이용약관</router-link>
        <router-link to="#">개인정보처리방침</router-link>
      </div>
      <p><b>주소</b> 경기도 용인시 기흥구 흥덕1로 13 흥덕IT밸리 타워 A동 2906호</p>
      <p class="copyright">© {{ date }} insilicogen. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  data() {
    return {
      date: new Date().getFullYear()
    }
  },
}
</script>