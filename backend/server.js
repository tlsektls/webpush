const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const path = require('path');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key';

app.use(cors());
app.use(bodyParser.json());

// 정적 파일 서빙
app.use(express.static(path.join(__dirname, 'dist')));

// 저장할 JSON 파일 경로
const USERS_FILE = path.join(__dirname, 'users.json');
const SUBSCRIPTIONS_FILE = path.join(__dirname, 'subscriptions.json');

// 파일에서 데이터 불러오기 (없으면 빈 배열)
function loadData(filePath) {
  try {
    const json = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(json);
  } catch (err) {
    return [];
  }
}

// 파일에 데이터 저장하기
function saveData(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// 초기 데이터 로드
let users = loadData(USERS_FILE);
let subscriptions = loadData(SUBSCRIPTIONS_FILE);
// 메모리 저장소 (DB 대신)
//const users = [];
//const subscriptions = [];

// service-worker.js 직접 서빙 (SPA 라우트보다 먼저!)
app.get('/service-worker.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/service-worker.js'));
});

// 루트 확인용
app.get('/', (req, res) => {
  res.send('✅ 백엔드 서버가 정상적으로 작동 중입니다.');
});


// VAPID 키 설정 (환경변수 우선)
const vapidKeys = {
  publicKey: process.env.VAPID_PUBLIC_KEY,
  privateKey: process.env.VAPID_PRIVATE_KEY
};

if (!vapidKeys.publicKey || !vapidKeys.privateKey) {
  console.warn('⚠️  VAPID 키가 환경변수에 설정되지 않았습니다. dev 용도로만 사용하세요.');
}

webpush.setVapidDetails(
  process.env.VAPID_SUBJECT || 'mailto:admin@example.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// 기본 계정 자동 등록
//(async () => {
//  const defaultUsers = [
//    { id: 1, username: 'admin', password: 'admin', role: 'admin', group: 'manager' },
//    { id: 2, username: 'user1', password: 'user1', role: 'user', group: 'team1' },
//    { id: 3, username: 'user2', password: 'user2', role: 'user', group: 'team1' },
//    { id: 4, username: 'user3', password: 'user3', role: 'user', group: 'team2' },
//    { id: 5, username: 'user4', password: 'user4', role: 'user', group: 'team2' },
//    { id: 6, username: 'admin2', password: 'admin2', role: 'admin', group: 'manager' },
//  ];

//  for (const user of defaultUsers) {
//    const exists = users.find(u => u.username === user.username);
//    if (!exists) {
//      const hashed = await bcrypt.hash(user.password, 10);
//      users.push({
//        id: user.id,
//        username: user.username,
//        password: hashed,
//        role: user.role,
//        group: user.group
//      });
//      console.log(`✅ 계정 생성: ${user.username}`);
//    }
//  }
//})();

// 회원가입 API (group 포함)
app.post('/signup', async (req, res) => {
  const { username, password, role, group } = req.body;
  if (!username || !password) return res.status(400).json({ error: '아이디와 비밀번호는 필수입니다.' });

  const exists = users.find(u => u.username === username);
  if (exists) return res.status(400).json({ error: '이미 존재하는 사용자입니다.' });

  const hashed = await bcrypt.hash(password, 10);
  const user = {
    id: users.length + 1,
    username,
    password: hashed,
    role: role === 'admin' ? 'admin' : 'user',
    group: group || null
  };
  users.push(user);
  // JSON 파일에 저장
  saveData(USERS_FILE, users);

  res.status(200).json({ message: '가입 완료', userId: user.id });
});

// 로그인 API (group 포함, 토큰 생성)
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ error: '존재하지 않는 사용자입니다.' });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: '비밀번호가 일치하지 않습니다.' });

  const accessToken = jwt.sign(
    { id: user.id, username: user.username, role: user.role, group: user.group },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  const { password: _, ...userWithoutPw } = user;

  res.json({
    message: '로그인 성공',
    userinfo: userWithoutPw,
    access_token: accessToken
  });
});

// 푸시 구독 저장 (username, group 포함)
app.post('/save-subscription', (req, res) => {
  const { username, subscription } = req.body;

  if (!subscription || !subscription.endpoint) {
    return res.status(400).json({ error: '유효하지 않은 subscription 데이터입니다.' });
  }

  const exists = subscriptions.find(sub => sub.subscription.endpoint === subscription.endpoint);
  if (!exists) {
    const user = users.find(u => u.username === username);
    subscriptions.push({
      username,
      group: user?.group || null,
      subscription
    });
    console.log(`📌 구독 저장 완료: ${username} / ${user?.group} / ${subscription.endpoint}`);
  }

  res.status(201).json({ message: 'Subscription 저장 완료', subscriptions });
});

// 단일 사용자에게 푸시 전송
app.post('/send-push', async (req, res) => {
  const { subscription, title = '테스트 알림', body = '푸시 알림 테스트입니다.' } = req.body;

  if (!subscription || !subscription.endpoint) {
    return res.status(400).json({ error: 'subscription 정보가 없습니다.', check: subscription });
  }

  const payload = JSON.stringify({ title, body });

  try {
    await webpush.sendNotification(subscription, payload);
    console.log('🚀 푸시 전송 성공:', subscription.endpoint);
    res.json({ message: '푸시 전송 완료' });
  } catch (err) {
    console.error('❌ 푸시 전송 실패:', err);
    res.status(500).json({ error: err.message });
  }
});

// 관리자용 전체/조건별 푸시 전송
app.post('/send-push-all', async (req, res) => {
  const { username, group, title, body } = req.body;

  if (!title || !body) {
    return res.status(400).json({ error: 'title과 body는 필수입니다.' });
  }

  let targets = subscriptions;

  if (username) {
    targets = targets.filter(sub => sub.username === username);
  } else if (group) {
    targets = targets.filter(sub => sub.group === group);
  }

  if (targets.length === 0) {
    return res.status(404).json({ error: '푸시 대상이 없습니다.' });
  }

  const payload = JSON.stringify({ title, body });

  const results = await Promise.allSettled(
    targets.map(t => webpush.sendNotification(t.subscription, payload))
  );

  const failed = results.filter(r => r.status === 'rejected');
  if (failed.length > 0) {
    console.error(`❌ ${failed.length}건 푸시 전송 실패`);
  }

  res.json({ message: `푸시 전송 완료. ${targets.length}명에게 발송.` });
});

// SPA 라우팅 지원 (dist/index.html 서빙)
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// 서버 실행
app.listen(port, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${port}`);
  console.log(`🔐 VAPID Public Key: ${vapidKeys.publicKey}`);
});
