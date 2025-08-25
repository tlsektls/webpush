<template>
  <nav>
    <b-pagination class="justify-content-center mt-32" v-model="currentPage" :total-rows="this.total" :per-page="this.perPage" @page-click="sendParent">
      <template #first-text><i class="material-icons">first_page</i></template>
      <template #prev-text><i class="material-icons">chevron_left</i></template>
      <template #next-text><i class="material-icons">chevron_right</i></template>
      <template #last-text><i class="material-icons">last_page</i></template>
    </b-pagination>
  </nav>
</template>

<script>
export default {
  name: 'AppPagination',
  data(){
    return {
      currentPage: 1,
    }
  },
  props: {
    total: Number,
    perPage: Number,
  },
  methods: {
    sendParent(el, currentPage){
      this.$emit('sendParent', currentPage);
    }
  },
}
</script>