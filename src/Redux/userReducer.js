/* eslint-disable default-case */
const initialState = { 
    logged: false, // false - don't forget
    username: null,
    discriminator: null,
    discordToken: null,
    id: null,
    admin: null, // null - to fix these xD
    adminToken: 'Qi5Nrmp7MmMBUgbUlhSN58qlV7WLLGTC',
    connData: {
        host: null, 
        port: 8080, 
        login: null, 
        pass: null
    }
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case "CHANGE_LOGIN": {
            state = {...state, logged: action.payload}
            break;
        }
        case "USER_DATA_UPDATE": {
            state = {
                ...state, 
                id: action.payload.id,
                username: action.payload.username, 
                discriminator: action.payload.discriminator,
                discordToken: action.payload.token
            }
            break;
        }
        case "ADMIN_AUTH": {
            state = {
                ...state,
                admin: action.payload.admin,
                adminToken: action.payload.token || null
            }
            break;
        }
        case "UPDATE_LOGIN_DATA": {
            state = {
                ...state,
                connData: {
                    ...action.payload
                }
            }
        }
    }
    return state
}

export default userReducer;