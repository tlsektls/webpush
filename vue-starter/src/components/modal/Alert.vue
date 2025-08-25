<template>
  <b-modal id="idAlert" centered ok-variant="secondary">
    <template #modal-header>
      <div class="modal-icon-wrap" :class="type">
        <i class="material-icons modal-icon" v-if="type == 'success'">check_circle</i>
        <i class="material-icons modal-icon" v-if="type == 'info'">info</i>
        <i class="material-icons modal-icon" v-if="type == 'warning'">warning</i>
        <i class="material-icons modal-icon" v-if="type == 'danger'">warning</i>
      </div>
    </template>
    <div class="content-wrap text-center">
      <p>{{ message }}</p>
      <p class="sub-message" v-if="subMessage">{{ subMessage }}</p>
    </div>
    <template #modal-footer>
      <div class="btn-wrap" v-if="type == 'success'">
        <button type="button" class="btn btn-success small" @click="confirm">확인하기</button>
      </div>
      <div class="btn-wrap" v-if="type == 'info'">
        <button type="button" class="btn btn-outline small" @click="$bvModal.hide('idAlert')">취소하기</button>
        <button type="button" class="btn btn-info small" @click="confirm">확인하기</button>
      </div>
      <div class="btn-wrap" v-if="type == 'warning'">
        <button type="button" class="btn btn-outline small" @click="$bvModal.hide('idAlert')">취소하기</button>
        <button type="button" class="btn btn-warning small" @click="confirm">삭제하기</button>
      </div>
      <div class="btn-wrap" v-if="type == 'danger'">
        <button type="button" class="btn btn-outline small" @click="$bvModal.hide('idAlert')">취소하기</button>
        <button type="button" class="btn btn-danger small" @click="confirm">삭제하기</button>
      </div>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: 'AppAlert',
  props: {
    type: String,
    message: String,
    subMessage: String,
  },
  methods: {
    confirm() {
      this.$bvModal.hide('idAlert');
      // trigger callback function
      this.$emit('confirm');
    },
    redirect(name) {
      this.$bvModal.hide('idAlert');
      this.$router.replace({ name, params: {history: this.$route.path} });
    }
  },
}
</script>