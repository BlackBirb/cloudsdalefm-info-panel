/* eslint-disable import/prefer-default-export */
import api from '../Api/api'

export function getLiveData() { 
    return dispatch => {
        api.player.nowPlaying()
            .then(data => {
                dispatch({type: "DATA_UPDATE", payload: {
                    title: data.title,
                    artist: data.artist,
                    likes: data.likes,
                    listeners: data.listeners
                }})
            })
            .catch(() => {
                dispatch({type: "DATA_UPDATE", payload: {
                    title: "Nic nie gramy",
                    artist: "Error",
                    likes: 0,
                    listeners: 0
                }})
            })
    }
}