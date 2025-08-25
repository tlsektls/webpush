<template>
  <button @click="subscribePush" class="btn btn-primary">푸시 알림 구독</button>
</template>

<script>

//const VAPID_PUBLIC_KEY = 'BO0yGOj7YUlz1-_3mVRr33Q23w_LMBUMwpqrPDNRQnaUeNp6DhZbDm_DFDtmelji81WrnLnFphpz5aHbnR9m4uo';

export default {
  methods: {
    async subscribePush() {
      const registration = await navigator.serviceWorker.ready;
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        alert('알림 권한이 필요합니다.');
        return;
      }
      const publicKey = 'BO0yGOj7YUlz1-_3mVRr33Q23w_LMBUMwpqrPDNRQnaUeNp6DhZbDm_DFDtmelji81WrnLnFphpz5aHbnR9m4uo';
      const convertedKey = this.urlBase64ToUint8Array(publicKey);

      // 기존 구독 확인
      const existingSubscription = await registration.pushManager.getSubscription();
      if (existingSubscription) {
        console.log('기존 구독 존재, 해제 시도...');
        await existingSubscription.unsubscribe();
        console.log('기존 구독 해제 완료');
      }

      // 새 구독 요청
      try {
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedKey,
        });

        console.log('푸시 구독 정보:', subscription);
        alert('푸시 구독 완료. 콘솔에서 subscription을 확인하세요.');

        // TODO: 백엔드로 subscription 정보 전송
      } catch (err) {
        console.error('푸시 구독 실패:', err);
        alert('푸시 구독 중 오류 발생. 콘솔을 확인하세요.');
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
