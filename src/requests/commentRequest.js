import { ucenterApi } from "./axios";

/**
 * 获取我的评论列表
 * @param {*} params 
 * @returns 
 */
export const getMyCommentList = async (params) => {
    const uri = '/comment/api/v2/personal/type/flat/comments/all'
    const defaultParams = {
        pageNo: 1,
        pageSize: 15,
        topicTypeId: '-2,-21'  // 21:话题 
    }
    try {
        const res = await ucenterApi.get(uri, { params: { ...defaultParams, ...params } })
        return res
    } catch (error) {
        throw error
    }
}

export const getReplyList = async (params) => {
    const uri = '/comment/api/personal/replies'
    const defaultParams = {
        pageNo: 1,
        pageSize: 15,
        topicTypeId: '-2,-21'  // 21:话题 
    }
    try {
        const res = await ucenterApi.get(uri,{ params: { ...defaultParams, ...params } })
        return res
    } catch (error) {
        throw error
    }
}

/**
 * 添加点赞
 * @param {*} params 
 * @returns 
 */
export const addLike = async (params) => {
    const uri = '/comment/api/like'
    const res = await ucenterApi.post(uri, params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    const data = res?.data
    const code = res?.code
    if(code !== 200) {
        throw new Error(res?.msg || '点赞失败')
    }
    return data
}

/**
 * 删除评论
 * @param {*} params 
 * @returns 
 */
export const deleteComment = async (params) => {
    const uri = '/comment/api/comments/remove'
    try {
        const res = await ucenterApi.post(uri, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
        })
        if(res?.code === 200) {
            return true
        }
        return false
    } catch (error) {
        throw error
    }
}