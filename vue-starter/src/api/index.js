import service from './service'

export default {
  test(options) {
    return service.get('/test', options);
  },
  login(...data) {
    return service.post('/login', ...data);
  },
  signup(...data) {
    return service.post('/signup', ...data);
  },
  logout() {
    return service.post('/logout');
  },
  saveSub(...data) {
    return service.post('/save-subscription', ...data);
  },
  pushMsgToUser(...data) {
    return service.post('/send-push-all', ...data);
  },
}