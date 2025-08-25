<template>
  <div class="layout-wrap">
    <!-- header -->
    <Header v-if="this.$route.name != 'pageNotFound' && this.$route.name != 'internalServerError'" />

    <!-- content -->
    <main class="layout-main" id="content">
      <!--<router-link to="/pushtest" class="btn btn-primary ml-20">
        go push test
      </router-link>-->
      <router-view/>
    </main>

    <!-- footer -->
    <Footer v-if="this.$route.name != 'pageNotFound' && this.$route.name != 'internalServerError'" />

    <!-- modal -->
    <Alert :type="modalType" :message="modalMessage" :subMessage="modalSubMessage" @confirm="callback" />
  </div>
</template>
<style lang="scss">
  @import '@/assets/scss/main';
</style>
<script>
import Header from '@/components/layout/Header.vue';
import Footer from '@/components/layout/Footer.vue';
import Alert from '@/components/modal/Alert.vue';
export default {
  name: 'App',
  data() {
    return {
      modalType: null,
      modalMessage: null,
      modalSubMessage: null,
    }
  },
  components: {
    Header,
    Footer,
    Alert
  },
  /**
   * Manage Common Vue Components settings only here.
   * ex)
   * this.$root.$on('name', () => {});
   */
  methods: {
    /**
     * Set Toast Message
     * type: success, info, warning, danger
     * ex) this.$root.$emit('showToast', 'success', '');
     */
    setToast() {
      this.$root.$on('showToast', (type, message) => {
        this.$bvToast.toast(' ', {
          title: message,
          variant: type,
          toaster: 'b-toaster-top-center',
          autoHideDelay: 3000,
        });
      });
    },
    /**
     * Set Alert
     * type: success, info, warning, danger
     * this.$root.$emit('showAlert', 'success', 'test', 'test', function() {});
     */
    setAlert() {
      // 이벤트 등록
      this.$root.$on('showAlert', (type, message, subMessage, callback) => {
        if (type) {
          this.modalType = type;
        }
        if (message) {
          this.modalMessage = message;
        }
        if (subMessage) {
          this.modalSubMessage = subMessage;
        }
        if (callback) {
          this.callback = callback;
        } else {
          this.callback = () => {}
        }
        this.$bvModal.show('idAlert');
      });
    },
    callback() {},
  },
  watch: {
    $route(to, from) {
      if (to.path != from.path) {
        const html = document.querySelector('html');
        html.scrollTop = 0;
      }
    }
  },
  mounted() {
    this.setToast();
    this.setAlert();
  }
}
</script>
