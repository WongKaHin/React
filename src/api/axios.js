import axios from 'axios';

const baseUrl = '/api'

//axios 2次封裝
class HttpRequest {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }
    getInsideConfig() {
        const config = {
            baseUrl: this.baseUrl,
            header: {}
        }
        return config
    }

    interception(instance) {
        axios.interceptors.request.use(function (config) {
            // 在发送请求之前做些什么
            return config;
          }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
          });
        
        // 添加响应拦截器
        axios.interceptors.response.use(function (response) {
            // 2xx 范围内的状态码都会触发该函数。
            // 对响应数据做点什么
            return response;
          }, function (error) {
            // 超出 2xx 范围的状态码都会触发该函数。
            // 对响应错误做点什么
            return Promise.reject(error);
          });
    }


    request(options) {
        options = { ...this.getInsideConfig(), ...options }
        //創建axios的實例
        const instance = axios.create()
        //實例拦截器的綁定
        this.interception(instance)
        return instance(options)
    }
}

export default new HttpRequest(baseUrl)