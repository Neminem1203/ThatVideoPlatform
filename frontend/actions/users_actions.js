import * as UserAPIUtil from "../util/users_util";
import { showModal, receiveError } from "./modal_actions";
export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_USER = "RECEIVE_USER";
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";


export const receiveUsers = users => {
    return {
        type: RECEIVE_USERS,
        users
    }
}

export const receiveUser = user =>{
    return {
        type: RECEIVE_USER,
        user
    }
}

export const loginUser = user => { //works differently than receiveUser in sessionReducer
    return {
        type: LOGIN_USER,
        user
    }
}

export const logoutUser = () => {
    return {
        type: LOGOUT_USER
    }
}

export const getUsers = userList => dispatch =>{
    return UserAPIUtil.receiveUsers(userList).then(
        payload => dispatch(receiveUsers(payload)),
        error => {
            dispatch(receiveError(error.responseJSON[0]));
            setInterval(()=>dispatch(receiveError("")), 4000);
        });
}

export const getUser = userId => dispatch =>{
    return UserAPIUtil.receiveUser(userId).then
        (payload => dispatch(receiveUser(payload)),
            error => {
                dispatch(receiveError(error.responseJSON[0]));
                setInterval(() => dispatch(receiveError("")), 4000);
            });
}

export const createUser = user => dispatch =>{
    return UserAPIUtil.createUser(user).then(
        payload=>{
            dispatch(loginUser(payload));
            dispatch(showModal(""));
        },
        error => {
            dispatch(receiveError(error.responseJSON[0]));
            setInterval(() => dispatch(receiveError("")), 4000);
        });
}

export const login = user => dispatch =>{
    return UserAPIUtil.login(user).then(
        payload =>{
            dispatch(loginUser(payload));
            dispatch(showModal(""));
        },
        error => {
            dispatch(receiveError(error.responseJSON[0]));
            setInterval(() => dispatch(receiveError("")), 4000);
        });
}

export const logout = () => dispatch =>{
    return UserAPIUtil.logout().then(
        () => dispatch(logoutUser()),
        error => {
            dispatch(receiveError(error.responseJSON[0]));
            setInterval(() => dispatch(receiveError("")), 4000);
        });
}