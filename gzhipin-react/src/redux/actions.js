import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST
} from './action-type'

import {
    reqRegister,
    reqLogin,
    reqUpdateUser,
    reqUser,
    reqUserList
} from '../api/index'

// 同步错误消息
const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg })
// 同步成功响应
const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user })

const receiveUser = (user) => ({type:RECEIVE_USER,data:user})
export const resetUser = (msg) => ({type:RESET_USER,data:msg})
export const updateUser = (user) =>{
    return async dispatch => {
        const response = await reqUpdateUser(user)
        const result = response.data
        if(result.code == 0){
            dispatch(receiveUser(result.data))
        }else{
            dispatch(resetUser(result.msg))
        }
    }
}
export function register({ username, password, password2, type }) {
    // 进行前台表单验证, 如果不合法返回一个同步 action 对象, 显示提示信息
    if (!username || !password || !type) {
        return errorMsg('用户名密码必须输入')
    }
    if (password !== password2) {
        return errorMsg('密码和确认密码不同')
    }

    return async dispatch => {
        const response = await reqRegister({ username, password, type })

        const result = response.data

        if (result.code === 0) {
            dispatch(authSuccess(result.data))
        } else {
            dispatch(errorMsg(result.msg))
        }
    }
}

// 异步登陆
//     * /
export const login = ({ username, password }) => {
    if (!username || !password) {
        return errorMsg('用户密码必须输入')
    }
    return async dispatch => {
        const response = await reqLogin({ username, password })
        const result = response.data
        if (result.code === 0) {
            dispatch(authSuccess(result.data))
        } else {
            dispatch(errorMsg(result.msg))
        }
    }
}

// 异步获取用户
export const getUser = () => {
    return async dispatch => {
        const response = await reqUser()
        const result = response.data
        if(result.code === 0){
            dispatch(receiveUser(result.data))
        }else{
            dispatch(resetUser(result.msg))
        }
    }
}


//用户列表
const receiveUserList = (users) => ({type:RECEIVE_USER_LIST,data:users})

// 异步获取用户列表
export const getUserList = (type) => {
    return async dispatch => {
        const response = await reqUserList(type)
        const result = response.data
        if(result.code == 0){
            dispatch(receiveUserList(result.data))
        }
    }
}