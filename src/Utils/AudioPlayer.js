/* NO I don't know what i'm doing */
// this player became huge mess...
/* eslint-disable class-methods-use-this */
import store from '../Redux/Store'
import { RADIO_STREAM } from './Constants'

import { setStatus, setLiveData } from '../actions/playerActions'
import api from '../Api/api'

const stream = new Audio(RADIO_STREAM)

class AudioPlayer {
    constructor() {
        this.state = {
            status: "PAUSED",
            volume: 50,
        }
        this.refreshing = false
    }

    setState(state) {
        for(const key in state) {
            if(Object.prototype.hasOwnProperty.call(this.state, key)) { // why eslint? why?
                this.state[key] = state[key]
            }
        }
        this.update()
    }

    update() {
        const { status } = this.state
        if(status === "PAUSED" && !stream.paused) {
            stream.pause()
        } else 
        if(status === "PLAYING" && stream.paused) {
            stream.load()
            store.dispatch(setStatus("LOADING"))
            stream.play()
             .then(() => {
                store.dispatch(setStatus("PLAYING"))
             }) 
             .catch(() => {
                store.dispatch(setStatus("ERROR"))
             })
        }
        if(status === "ERROR") {
            console.log("do something i guess lol")
        }
    }

    setVolume(vol) { 
        stream.volume = vol/100
    }

    get volume() {
        return stream.volume*100
    }

    refresh() {
        console.log("Refresh", this.refreshing)
        if(this.refreshing) {
            api.player.nowPlaying() // I'm not using getLiveData() because i don't want to dispatch if nothing changed...
            .then(data => {
                const state = store.getState().player.track
                if(state.title !== data.title)
                    store.dispatch(setLiveData(data))
            })
            .catch(() => {
                store.dispatch(
                    setLiveData({
                        title: "Nic nie gramy",
                        artist: "Error",
                        likes: 0,
                        listeners: 0
                    })
                )
            })
            setTimeout(() => this.refresh(), 10000)
        }
    }

    startRefreshing() {
        if(!this.refreshing) {
            this.refreshing = true
            this.refresh()
        }
    }

    stopRefreshing() {
        this.refreshing = false
    }
}
/**
 * status can be:
 * PAUSED
 * PLAYING
 * LOADING
 * ERROR
 */

const audioplayer = new AudioPlayer()
audioplayer.update()
audioplayer.setVolume(50)

store.subscribe(() => {
    const { status } = store.getState().player
    audioplayer.setState({ status })
})

export default audioplayer