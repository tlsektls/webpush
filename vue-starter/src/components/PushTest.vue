<template>

  <div class="container p-32" v-if="userinfo">
    <button @click="subscribePush" class="btn btn-lg btn-primary my-16">푸시 알림 구독</button>
    <div class="mt-16">
      <!--<div class="row">-->
      <div class="row mt-16" v-if="userinfo.role == 'admin'">
        <div class="col-12">
          <h3 class="">알림 보내기 {{this.group}}</h3>
        </div>
        <div class="col-12 info-row">
          <label class="info-head">메세지</label>
          <div class="info-body">
            <input type="text" placeholder="보낼 메세지" v-model="msgTest" class="form-control">
          </div>
        </div>
        <div class="col-12 info-row">
          <label class="info-head" for="groupSel">그룹 선택</label>
          <div class="info-body">
            <select id="groupSel" class="select2 dropdown form-control" variant="outline" data-placeholder="선택" v-model="group">
              <option value="manager">manager</option>
              <option value="team1">team1</option>
              <option value="team2">team2</option>
            </select>
          </div>
        </div>
        <div class="col-12 info-row">
          <label class="info-head">유저 선택</label>
          <div class="info-body">
            <input type="text" placeholder="보낼 메세지" v-model="username" class="form-control">
          </div>
        </div>
        <div class="col-12">
          <button @click="adminSendToUser" class="btn btn-lg btn-block btn-outline-primary" id="adminSendToUser">관리자에서 메서지 보내기</button>
        </div>
      </div>
    </div>
    <div class="row mt-16" v-if="userinfo.role == 'user'">
      <div class="col-6">
        <button @click="logout" class="btn btn-outline-primary" id="logout">로그아웃</button>
      </div>
    </div>
  </div>
</template>

<style>
.row {
  gap: 1rem 0;
}
</style>
<script>
//import config from '@/api/config.js';
import { mapActions, mapGetters } from 'vuex';

//const VAPID_PUBLIC_KEY = 'BO0yGOj7YUlz1-_3mVRr33Q23w_LMBUMwpqrPDNRQnaUeNp6DhZbDm_DFDtmelji81WrnLnFphpz5aHbnR9m4uo';

export default {
  name: 'AppPushtest',
  data() {
    return {
      msgTest: '',
      username: null,
      group: null,
    }
  },
  computed: {
    ...mapGetters({
      userinfo: 'token/userinfo',
    }),
  },
  methods: {
    ...mapActions({
      dispatchSaveSub: 'push/saveSub',
      dispatchPushMsg: 'push/pushMsg',
      dispatchLogout: 'token/logout',
    }),

    logout() {
      this.dispatchLogout();
    },

    adminSendToUser() {
      if (!this.msgTest.trim()) {
        alert('메시지를 입력하세요.');
        return;
      }

      let formData = {
        title:"TEST) 시스템 알림",
        body: this.msgTest,
        group: this.group,
      }

      if(this.username) {
        formData.username = this.username;
      } else {
        formData.group = this.group;
      }

      console.log(formData)

      this.dispatchPushMsg(formData);
    },

    async subscribePush() {
      try {
        const registration = await navigator.serviceWorker.ready;
        alert('✅ 서비스워커 등록 완료');
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
          alert('알림 권한이 필요합니다.');
          return;
        }

        const publicKey = 'BO0yGOj7YUlz1-_3mVRr33Q23w_LMBUMwpqrPDNRQnaUeNp6DhZbDm_DFDtmelji81WrnLnFphpz5aHbnR9m4uo';
        const convertedKey = this.urlBase64ToUint8Array(publicKey);

        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedKey
        });

        console.log('현재 subscription:', subscription);

        // 구독 정보를 백엔드에 저장
        //let backUrl = config.BASE_URL + '/save-subscription';
        //await fetch(backUrl, {
        //  method: 'POST',
        //  headers: { 'Content-Type': 'application/json' },
        //  body: JSON.stringify({
        //    subscription, // 푸시 구독 정보도 같이 전송
        //    title: '모바일 테스트',
        //    body: 'PWA 모바일 알림 수신 확인'
        //  })
        //});
        const formData = JSON.stringify({
          subscription, // 푸시 구독 정보도 같이 전송
          title: '모바일 테스트',
          body: 'PWA 모바일 알림 수신 확인',
          username: this.userinfo.username,
          group: this.userinfo.group,
          icon: '/'
        });
        this.dispatchSaveSub(formData);
        alert('🔔 푸시 구독 완료!');
      } catch (error) {
        console.error('❌ 푸시 구독 실패:', error);
        
      }
    },

    urlBase64ToUint8Array(base64String) {
      const padding = '='.repeat((4 - base64String.length % 4) % 4);
      const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

      const rawData = atob(base64);
      return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
    },
  }
};
</script>
