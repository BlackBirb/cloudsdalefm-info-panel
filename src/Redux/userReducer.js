const initialState = { 
    logged: false,
    username: null,
    discriminator: null,
    discordToken: null,
    id: null,
    admin: null,
    adminToken: null
}

const userReducer = (state = initialState, action) => {
    if(action.type === "CHANGE_LOGIN") {
        state = {...state, logged: action.payload}
    }
    else if(action.type === "USER_DATA_UPDATE") {
        state = {
            ...state, 
            id: action.payload.id,
            username: action.payload.username, 
            discriminator: action.payload.discriminator,
            discordToken: action.payload.token
        }
    } else if(action.type === "ADMIN_AUTH") {
        state = {
            ...state,
            admin: action.payload.admin,
            adminToken: action.payload.token || null
        }
    }
    return state
}

export default userReducer;