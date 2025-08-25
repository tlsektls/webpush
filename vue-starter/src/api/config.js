let BASE_URL = '';
let API_KEY = '';

if(process.env.NODE_ENV === 'production') {
  // 배포(build)
  //BASE_URL = 'https://961dc25865bf.ngrok-free.app';
  //BASE_URL = 'https://example.com';
  BASE_URL= 'https://44fd3fb42c17.ngrok-free.app';
  //API_KEY = 'NYDQCaA1.sW9IJOHjZ9RXPK7UiiMEG7bP5DGH2smw';
} else {
  // 개발(dev)
  //BASE_URL= 'https://961dc25865bf.ngrok-free.app';
  BASE_URL= 'http://localhost:4000';
  //API_KEY = 'llc43TEQ.T9rp4PCKiDWZCknXeLgz2HIfflxy29oF';
}

export default {
  BASE_URL,
  API_KEY
}