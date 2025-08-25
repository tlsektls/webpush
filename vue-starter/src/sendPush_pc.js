const webpush = require('web-push');

// 👉 VAPID 키 쌍 (테스트용)
const vapidKeys = {
  publicKey: 'BO0yGOj7YUlz1-_3mVRr33Q23w_LMBUMwpqrPDNRQnaUeNp6DhZbDm_DFDtmelji81WrnLnFphpz5aHbnR9m4uo',
  privateKey: 'kDzTXufMOP5InqChqEg1vk-kSaqukYdj_XroV22X2iI'
};

webpush.setVapidDetails(
  'mailto:dyshin@insilicogen.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// 👉 Vue에서 콘솔에 출력된 subscription 내용을 여기에 붙여줘
const subscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/faPEcWOuek0:APA91bFihDheU0In9RcA-hEjZRehU-tkDNtKTf2Jwvx0NdytGXTK68GfLqpCCDngsDxcQZREXSrozOLSMtTm9XwKecePgRgjsLk6aeDSaq06wmfbDjf21UpF-NOcrb5bOoVHtUP6npfk",
    "expirationTime": null,
    "keys": {
        "p256dh": "BDp4ksYWw_4wNIZOmHJEqoBvyXCxumzXVBlG-HSSu2J0nu8eHZKJJ9T_XZ4w2nG1GYSgcCz_rIqhrL-gGM51pw4",
        "auth": "fB-9y_wAtuUb9zu9pDuP4w"
    }
}

// 👉 전송할 알림 내용
const payload = JSON.stringify({
  title: '테스트 알림입니다!',
  body: 'Vue에서 PWA 푸시 구독 성공!',
});

webpush.sendNotification(subscription, payload).then(() => {
  console.log('✅ 푸시 메시지 전송 완료');
}).catch((err) => {
  if (err.statusCode === 410 || err.statusCode === 404) {
    console.warn('🧹 구독 만료됨. 삭제 필요:', err.statusCode);
    // 서버 DB에서 해당 subscription 삭제
  } else {
    console.error('❌ 푸시 전송 실패:', err);
  }
});
