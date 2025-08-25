<template>
  <div class="error-wrap text-center">
    <div class="error-inner">
      <div class="container">
        <div class="error">500</div>
        <p class="lead text-gray-800 mb-32">Internal Server Error</p>
        <p class="text-gray-500 mb-8">접근권한이 없는 페이지입니다.</p>
        <router-link to="/">← 메인 페이지로 가기</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppInternalServerError',
}
</script>
