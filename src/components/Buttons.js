import React from 'react';
import { Link } from 'react-router-dom';

import CreateState from '../Utils/Utils'
import { REDIRECT_FORMATED_URL } from '../Utils/Constants';

const getURI = () => `https://discordapp.com/api/oauth2/authorize?client_id=352411517599350785&redirect_uri=${REDIRECT_FORMATED_URL}&response_type=code&scope=identify&state=`


const getState = () => {
    let state = localStorage.getItem("state")
    if(!state) {
        state = CreateState()
        localStorage.setItem("state", state)
    }
    return state
}

export class LoginButton extends React.Component {
    render() {
        if(this.props.user.logged) {
            return (
                <div className="loggedIn">
                    Jesteś zalogowany jako <span>{this.props.user.username}#{this.props.user.discriminator}</span>
                </div>
            )
        }
        return ( <a href={getURI() + getState()}>
                <div className="loginButton">
                    Zaloguj przez discorda!
                </div>
            </a>
        )
    }
}

export class JoinButton extends React.Component {
    constructor(p) {
        super(p)

        this.onClick = () => {
            if(!this.props.user.logged) return false;
            return null
        }
    }

    render() {
        let result = <div className="joinButton">
            Musisz być zalogowany
        </div>
        if(this.props.user.logged) {
            result = <Link to="/live">
                <div className="joinButton active">
                    Dołącz do audycji!
                </div>
            </Link>
        }
        return result
    }
}

export class LogoutButton extends React.Component {

    render() {
        return <div title="Logout" role="button" tabIndex="0" className="logoutButton" onClick={this.props.logout}>
            &#x27B2;
        </div>
    }
}