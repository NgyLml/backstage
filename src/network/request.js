import axios from 'axios'

export function request(config) {
    //1.创建axios的实例
    const instance = axios.create({
        baseURL: 'http://localhost:8081/backstage',
        // baseURL: 'http://httpbin.org',
        timeout: 5000
    })

    //axios的拦截器
    instance.interceptors.request.use(config => {
        return config
    },err => {
        console.log(err);
    })

    instance.interceptors.response.use(res => {
        return res.data
    },err => {
        console.log(err);
    })

    //发送真正的网络请求
    return instance(config)
}
