import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import Header from '../../Header'
import Player from './Player'

class LivePage extends React.Component {
    render() {
        if(!this.props.user.admin) return <Redirect to="/" />
        return <div>
            <Header>
                <li><Link to="/">Główna</Link></li>
            </Header>
            <Player />
        </div>
    }
}

export default connect(store => ({
    user: store.user
}))(LivePage);