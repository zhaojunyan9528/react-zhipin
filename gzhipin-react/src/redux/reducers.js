import { combineReducers } from 'redux'
import {getRedirectPath} from '../utils/index'
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER
} from './action-type'
const initUser = {
    username: '',
    type: '',
    msg: '',
    redirectTo: ''
}
function user(state = initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            const redirectTo = getRedirectPath(action.data.type,action.data.header)
            return { ...action.data, redirectTo }
        case ERROR_MSG: // 错误信息提示
            return { ...state, msg: action.data }
        case RECEIVE_USER: // 接收用户
            return action.data
        case RESET_USER: // 重置用户
            return {...initUser, msg: action.data}
        default:
            return state
    }
}
const initUserList = []
function userList(state = initUserList,action){
    switch(action.type){
        case RECEIVE_USER_LIST:
            return action.data
        default:
            return state
    }
}
export default combineReducers({
    user,
    userList
})