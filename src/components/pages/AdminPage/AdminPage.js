import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import Header from '../../Header'
import Player from './Player'
import { connectionDetails } from '../../../actions/userActions';
import { addLike } from '../../../actions/playerActions';

class LivePage extends React.Component {
    componentWillMount() {
        this.props.dispatch(connectionDetails(this.props.user.adminToken))
    }

    giveLike = () => {
        this.props.dispatch(addLike(`${this.props.player.track.artist} - ${this.props.player.track.title}`))
    }

    render() {
        if(!this.props.user.admin) return <Redirect to="/" />
        const { player } = this.props
        const { connData } = this.props.user

        const connNames = []
        const connValues = []
        let i = 0
        for(const [ key, name ] of Array.from(Object.entries(connData))) {
            connNames.push(<span key={i}>{key}</span>)
            connValues.push(<span key={i}>{name}</span>)
            i++
        }

        return <div>
            <Header>
                <li><Link to="/">Główna</Link></li>
            </Header>
            <div className="admin topBar">
                <Player className="contentElement" />

                <div className="verticalSpacer" />
                <div className="contentElement center height flexColumn defaultCursor">
                    <div className="font5 spaced">Now playing:</div>
                    <div className="player artist">{player.track.artist}</div>
                    <div className="player title">{player.track.title}</div>
                </div>

                <div className="verticalSpacer" />
                <div className="contentElement center both flexColumn defaultCursor">
                    <span role="img" aria-label="wat" title="Listeners">&#127911;</span>
                    <div className="slider blueBG spaced" style={{width: 80}}>
                        <div className="sliderInner greenBG" style={{width: `${player.track.listeners}%`}} />
                    </div>
                    <span className="bold">{player.track.listeners}</span><span className="font5">/100</span>
                </div>

                <div className="verticalSpacer" />
                <div className="contentElement center both flexColumn defaultCursor">
                    <span role="img" aria-label="wat" title="Likes">&#128077;</span>
                    <span className="spaced likesCount">{player.track.likes}</span>
                    <div className={`defaultButton greenBG likeButton`} role="button" tabIndex="0" onClick={this.giveLike}>
                        Like
                    </div>
                </div>

                <div className="verticalSpacer" />
                <div className="contentElement">
                    <div className="connData elementsContainer center width">
                    <img src="/images/icons/antena.png" alt="Connection Details" title="Connection Details" height="30" />
                        <div className="connData names bold">
                            {connNames}
                        </div>
                        <div className="connData values">
                            {connValues}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default connect(store => ({
    user: store.user,
    player: store.player
}))(LivePage);