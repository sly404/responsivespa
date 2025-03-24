import axios from 'axios'

export const createAxiosByInterceptors = (config) => {
    const instance = axios.create({
        timeout: 2000,
        withCredentials: true, //自动携带cookie，此时后端的cors不能是*，需要回填
        // 自定义配置覆盖基本配置
        ...config,
    })

    // 添加请求拦截器
    instance.interceptors.request.use(
        function (config) {
            return config
        },
        function (error) {
            return Promise.reject(error)
        }
    )

    // 添加响应拦截器
    instance.interceptors.response.use(
        function (response) {
            const { status, data } = response
            if (status === 200) {
                return Promise.resolve(data)
            } else {
                return Promise.reject(data)
            }
        },
        // 响应错误
        function (error) {
            return Promise.reject(error)
        }
    )
    return instance
}
