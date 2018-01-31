import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import Header from '../Header'

class LivePage extends React.Component {
    render() {
        console.log("Live page!")
        if(!this.props.user.logged) return <Redirect to="/" />
        if(this.props.user.admin) return <Redirect to="/live/admin" />
        return <div>
            <Header>
                <li><Link to="/">Główna</Link></li>
            </Header>
        </div>
    }
}

export default connect(store => ({
    user: store.user
}))(LivePage);