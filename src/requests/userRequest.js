import { ucenterApi } from "./axios";

const DEVICE_CONFIG = {
    mobile: {
        appId: '100016',
        device: 'MPTCFEMOBILEUSER'
    },
    pc: {
        appId: '100018',
        device: 'MPTCFEPCUSER'
    }
}

/**
 * @description 获取用户信息
 * @param {*} type 端类型 mobile/pc
 */
export const getUserInfo = async (type = 'mobile') => {
    const config = DEVICE_CONFIG[type] || DEVICE_CONFIG.mobile
    try {
        const { data } = await ucenterApi.get('/v3/uc/user/info', {
            params: {
                appId: config.appId,
                device: config.device
            }
        })
        return data
    } catch (error) {
        console.error('获取用户信息失败:', error.message)
        return null
    }
}