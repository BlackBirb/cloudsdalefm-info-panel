import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/playerActions'

class Player extends React.Component {
    componentWillMount() {
        this.props.dispatch(actions.getLiveData())
    }

    render() {
        const { player } = this.props
        return <div className="audioPlayer">
            <div className="player top">
                <div className="player buttons" />
                <div className="player info">
                    <div className="player artist">{player.track.artist}</div>
                    <div className="player title">{player.track.title}</div>
                </div>
            </div>
            <div className="player songInfo">
            <span>{player.track.likes}</span> Likes | <span>{player.track.listeners}</span> Listeners
                
            </div>
            <div className="player slider">
                <div className="player sliderInner" style={{width: `${player.volume}%`}} />
            </div>
        </div>
    }
}


export default connect(store => ({
    player: store.player
}))(Player);