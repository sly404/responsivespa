import { getOdinData as odinRequest } from 'msfe-client-request'
import { getEnvironmentByURL } from 'mpfe-utils';

const env =  getEnvironmentByURL()
/**
 * @description 奥丁数据请求接口
 * @param {*} opts 
 * @returns 
 */
export const getOdinData = async function (opts) {
    const mainContent = {
        productId: 1163,
        productType: 13,
        secureScore: 100,
        categoryId: 47,
    }
    const param = {
        env: opts?.env ? opts?.env : env,
        mainContent,
        param: opts
    }
    const result = await odinRequest(param)
    console.log('请求结果', result)
    return result
}
