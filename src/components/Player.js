import React from 'react';
import { connect } from 'react-redux';

import { setStatus } from '../actions/playerActions'
import audioPlayer from '../Utils/AudioPlayer'

class Player extends React.Component {
    constructor(p) {
        super(p)
        this.state = { volume: audioPlayer.volume } // I don't want to use redux for volume changes, it's going to be called way too many times
    }

    componentWillMount() {
        audioPlayer.startRefreshing()
    }
    componentWillUnmount() {
        audioPlayer.stopRefreshing()
    }

    onClick = () => {
        const { status } = this.props.player
        if(status === "PAUSED") 
            this.props.dispatch(setStatus("PLAYING"))
        else if(status === "PLAYING")
            this.props.dispatch(setStatus("PAUSED"))
    }

    onMouseMove = evn => {
        const e = evn.nativeEvent
        if(e.buttons === 1) {
            this.setVolume((e.offsetX / e.target.clientWidth)*100)
        }
    }

    setVolume = vol => {
        if(vol < 0) vol = 0
        else if(vol > 100) vol = 100
        audioPlayer.setVolume(vol)
        this.setState({volume: vol})
    }

    render() {
        const { player } = this.props
        return <div className="audioPlayer">
            <div className="player top">
                <div className="player buttons" role="button" tabIndex="0" id={player.status} onClick={this.onClick} />
                <div className="player info">
                    <div className="player artist">{player.track.artist}</div>
                    <div className="player title">{player.track.title}</div>
                </div>
            </div>
            <div className="player songInfo">
            <span>{player.track.likes}</span> Likes | <span>{player.track.listeners}</span> Listeners
                
            </div>
            <div className="player slider" onMouseMove={this.onMouseMove}>
                <div className="player sliderInner" style={{width: `${this.state.volume}%`}} />
            </div>
        </div>
    }
}


export default connect(store => ({
    player: store.player
}))(Player);