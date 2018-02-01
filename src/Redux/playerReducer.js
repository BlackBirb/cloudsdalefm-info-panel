/* eslint-disable default-case */
const initialState = {
    status: "PAUSED",
    track: {
        title: "Nic nie gramy!",
        artist: "Error",
        likes: 0,
        listeners: 0
    }
}

const playerReducer = (state = initialState, action) => {
    switch(action.type) {
        case "STATUS_CHANGE": {
            state = {...state, status: action.payload}
            break;
        }
        case "TITLE_CHANGE": {
            state = {...state, track: { ...state.track, title: action.payload.title, artist: action.payload.artist } }
            break;
        }
        case "DATA_UPDATE": {
            state = {...state, track: { ...state.track, ...action.payload, likes: 15 } } // remove likes... api still doesn't send anything
            break;
        }
    }
    return state
}

export default playerReducer