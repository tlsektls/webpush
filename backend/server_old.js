const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

// 테스트용 메모리 저장소 (DB 대신)
let subscriptions = [];

// VAPID 키 설정 (본인 키로 교체하세요)
const vapidKeys = {
  publicKey: 'BO0yGOj7YUlz1-_3mVRr33Q23w_LMBUMwpqrPDNRQnaUeNp6DhZbDm_DFDtmelji81WrnLnFphpz5aHbnR9m4uo',
  privateKey: 'kDzTXufMOP5InqChqEg1vk-kSaqukYdj_XroV22X2iI'
};

webpush.setVapidDetails(
  'mailto:dyshin@insilicogen.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// 1) 구독 저장 API
app.post('/save-subscription', (req, res) => {
  const subscription = req.body;
  // 중복 저장 방지
  const exists = subscriptions.find(sub => sub.endpoint === subscription.endpoint);
  if (!exists) {
    subscriptions.push(subscription);
    console.log('구독 저장 완료:', subscription.endpoint);
  }
  res.status(201).json({ message: 'Subscription saved.' });
});

// 2) 푸시 보내기 API (테스트용)
//app.post('/send-push', async (req, res) => {
//  const payload = JSON.stringify({
//    title: req.body.title || '테스트 알림',
//    body: req.body.body || '푸시 알림 테스트입니다.'
//  });

//  const promises = subscriptions.map(sub => 
//    webpush.sendNotification(sub, payload).catch(err => {
//      console.error('푸시 전송 실패:', err);
//    })
//  );

//  try {
//    await Promise.all(promises);
//    res.json({ message: '푸시 전송 완료' });
//  } catch (e) {
//    res.status(500).json({ error: e.message });
//  }
//});
app.post('/send-push', async (req, res) => {
  const subscription = req.body.subscription;
  const title = req.body.title || '테스트 알림';
  const body = req.body.body || '푸시 알림 테스트입니다.';

  if (!subscription) {
    return res.status(400).json({ error: 'subscription 정보가 없습니다.' });
  }

  const payload = JSON.stringify({ title, body });

  try {
    await webpush.sendNotification(subscription, payload);
    res.json({ message: '푸시 전송 완료' });
  } catch (err) {
    console.error('푸시 전송 실패:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`서버 실행 중: http://localhost:${port}`);
  console.log(`VAPID Public Key: ${vapidKeys.publicKey}`);
});

// 기존 코드 위쪽 아무 곳에 추가
app.get('/', (req, res) => {
  res.send('✅ 백엔드 서버가 정상적으로 작동 중입니다.');
});

