import React from 'react';
import { connect } from 'react-redux';

import { setStatus } from '../../../actions/playerActions'
import audioPlayer from '../../../Utils/AudioPlayer'

/* eslint-disable jsx-a11y/no-static-element-interactions */

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

    setVolume = vol => {
        if(vol < 0) vol = 0
        else if(vol > 100) vol = 100
        audioPlayer.setVolume(vol)
        this.setState({volume: vol})
    }
    
    calcVolume = evn => {
        const e = evn.nativeEvent
        if(e.buttons === 1) {
            this.setVolume((e.offsetX / e.target.clientWidth)*100)
        }
    }

    render() {
        const { player } = this.props
        return <div className={this.props.className ? this.props.className : ""}>
            <div className="audioPlayer">
                <span className="font8 defaultCursor">Posłuchaj radia:</span>
                <div className="player top center both">
                    <div className="player buttons pointer" role="button" tabIndex="0" id={player.status} onClick={this.onClick} />
                </div>
                <div className="player slider pointer" onMouseMove={this.calcVolume} onMouseDown={this.calcVolume}>
                    <div className="player sliderInner" style={{width: `${this.state.volume}%`}} />
                </div>
            </div>
        </div>
    }
}


export default connect(store => ({
    player: store.player
}))(Player);