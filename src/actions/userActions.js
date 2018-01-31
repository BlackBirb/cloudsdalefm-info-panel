import { DISCORD_USER_DATA_URL } from '../Utils/Constants'
import api from '../Api/api'

export function setLogged(is) {
    return {
        type: "CHANGE_LOGIN",
        payload: is
    }
}

export function updateAdminData(data) {
    return {
        type: "ADMIN_AUTH",
        payload: data
    }
}

export function updateUserData(data) {
    return {
        type: "USER_DATA_UPDATE",
        payload: {
            id: data.id || null,
            username: data.username || null,
            discriminator: data.discriminator || null
        }
    }
}

export function logoutUser() {
    return dispatch => {
        localStorage.clear()
        dispatch({
            type: "CHANGE_LOGIN",
            payload: false
        })
        dispatch({
            type: "USER_DATA_UPDATE",
            payload: {
                id: null,
                username: null,
                discriminator: null
            }
        })
        dispatch({
            type: "ADMIN_AUTH",
            payload: {
                admin: false, 
                token: null
            }
        })

    }
}

export function fetchUserData(token) {
    return dispatch => {
        fetch(DISCORD_USER_DATA_URL, {
            method: "GET",
            headers: new Headers({
                "Authorization": `Bearer ${token}`
            })
        }).then(res => {
            if(!res.ok) return false
            return res.json()
        }).then(data => {
            if(!data) {
                dispatch({type: "CHANGE_LOGIN", payload: false})
                return false
            }
            dispatch({ 
                type: "USER_DATA_UPDATE",
                payload: {
                    id: data.id,
                    username: data.username,
                    discriminator: data.discriminator,
                    token
                }
            })
            
            dispatch({
                type: "CHANGE_LOGIN", payload: true
            })
            return data;
        })
    }
}

// {
//     id: userData.id,
//     token: userData.token
// }

export function authAsAdmin(credentials) {
    return dispatch => {
        api.user.login(credentials)
            .then(user => {
                if(user && user.valid)
                    dispatch(updateAdminData({
                            admin: true,
                            token: user.token
                        })
                    )
                else
                    dispatch(updateAdminData({
                            admin: false
                        })
                    )
            })
            .catch(() => {
                dispatch(updateAdminData({
                        admin: false
                    })
                )
            })
    }
}