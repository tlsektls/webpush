import Axios from 'axios'
import config from './config'
import $store from '@/store';

// 프로젝트 설정에 맞게, 기본적인 정보 입력
const axios = Axios.create({
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
  baseURL: config.BASE_URL,
  headers: {
    'Content-Type': 'application/json'
    //'api-key': config.API_KEY,
  },
});

// 응답에 필요한 처리를 입력
// 요청에 필요한 처리를 입력
axios.interceptors.request.use(
  (config) => {
    if(config.method !== 'put') {
      if($store.getters['token/access'] != '') {
        config.headers['Authorization'] = 'Bearer '+$store.getters['token/access'];
      }
    }

    return config;
  },
  (err) => Promise.reject(err)
);
// 응답에 필요한 처리를 입력
axios.interceptors.response.use(
  (res) => {
    // 주간 업무 수정 성공 시, toast 없음
    if(res?.data.code == 20001) {
      return res;
    }
    return res;
  },
  (err) => {
    console.log(err)
    return Promise.reject(err);
  }
)

// 각 메소드별 함수 생성
export default {
  async get(...options) {
    try {
      const res = await axios.get(...options)
      return res;
    } catch (err) {
      return err.response;
    }
  },
  async post(...options) {
    try {
      const res = await axios.post(...options)
      return res
    } catch (err) {
      return err.response;
    }
  },
  async put(...options) {
    try {
      const res = await axios.put(...options)
      return res
    } catch (err) {
      return err.response;
    }
  },
  async delete(...options) {
    try {
      const res = await axios.delete(...options)
      return res
    } catch (err) {
      return err.response;
    }
  },
}