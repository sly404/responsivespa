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

/**
 * 添加点赞
 * @param {*} params 
 * @returns 
 */
export const addLike = async (params) => {
    const uri = '/comment/api/like'
    try {
        const { data } = await ucenterApi.post(uri, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        return data?.data
    } catch (error) {
        throw error
    }
}

/**
 * 删除评论
 * @param {*} params 
 * @returns 
 */
export const deleteComment = async (params) => {
    const uri = '/comment/api/comments/remove'
    try {
        const { data } = await ucenterApi.post(uri, params)
        if(data?.code === 200) {
            return true
        }
        return false
    } catch (error) {
        throw error
    }
}