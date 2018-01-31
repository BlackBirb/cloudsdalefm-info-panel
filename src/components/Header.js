import React from 'react';
import { connect } from 'react-redux';

import { logoutUser } from '../actions/userActions'
import { LogoutButton, LoginButton } from './Buttons'

class Header extends React.Component {

    logoutUser = () => {
        this.props.dispatch(logoutUser())
    }

    render() {
        return <div className="header">
            <div className="headerInner">
                <div className="headerLogo">
                    <a target="_blank" rel="noopener noreferrer" href="https://www.cloudsdalefm.net/">
                        <img src="/images/full-logo.png" alt="logo" width="auto" height="86" />
                    </a>
                </div>
                <ul className="headerLinks"> 
                    {this.props.children}
                </ul>
                <LoginButton user={this.props.user} />
                {this.props.user.logged && <LogoutButton logout={this.logoutUser} />}
            </div>
        </div>
    }
}


export default connect(store => ({
    user: store.user
}))(Header);