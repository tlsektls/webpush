<template>
  <div class="error-wrap text-center">
    <div class="error-inner">
      <div class="container">
        <div class="error">404</div>
        <p class="lead text-gray-800 mb-32">Page Not Found</p>
        <p class="text-gray-500 mb-8">요청하신 페이지를 찾을 수 없습니다.</p>
        <router-link to="/">← 메인 페이지로 가기</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppPageNotFound',
}
</script>
