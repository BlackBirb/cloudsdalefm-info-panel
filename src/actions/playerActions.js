/* eslint-disable import/prefer-default-export */
import api from '../Api/api'

export function setStatus(status) {
    return {
        type: "STATUS_CHANGE",
        payload: status
    }
}

export function setLiveData(data) {
    return {
        type: "DATA_UPDATE", payload: {
            title: data.title,
            artist: data.artist,
            likes: data.likes,
            listeners: data.listeners
        }
    }
}

export function addLike(song) {
    return dispatch => {
        api.player.like(song)
            .then(data => {
                // check in data for errors... i think, API is not done yet
                dispatch({
                    type: "DATA_UPDATE", payload: {
                        likes: data.likes // ??
                    }
                })
            })
            .catch(() => "I don't care just don't error in console")
    }
}

export function getLiveData() {
    return dispatch => {
        api.player.nowPlaying()
            .then(data => {
                dispatch({
                    type: "DATA_UPDATE", payload: {
                        title: data.title,
                        artist: data.artist,
                        likes: data.likes,
                        listeners: data.listeners
                    }
                })
            })
            .catch(() => {
                dispatch({
                    type: "DATA_UPDATE", payload: {
                        title: "Nic nie gramy",
                        artist: "Error",
                        likes: 0,
                        listeners: 0
                    }
                })
            })
    }
}