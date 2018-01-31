import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import Header from '../../Header'
import Player from './Player'
import { connectionDetails } from '../../../actions/userActions';

class LivePage extends React.Component {
    componentWillMount() {
        this.props.dispatch(connectionDetails(this.props.user.adminToken))
    }
    render() {
        if(!this.props.user.admin) return <Redirect to="/" />
        const { connData } = this.props.user

        const connNames = []
        const connValues = []
        for(const [ key, name ] of Array.from(Object.entries(connData))) {
            connNames.push(<span>{key}</span>)
            connValues.push(<span>{name}</span>)
        }

        return <div>
            <Header>
                <li><Link to="/">Główna</Link></li>
            </Header>
            <div className="admin topBar">
                <Player />
                <div className="verticalSpacer" />
                <div className="connData container">
                    <div className="connData elementsContainer">
                    Connection<br />
                    Details
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
    user: store.user
}))(LivePage);