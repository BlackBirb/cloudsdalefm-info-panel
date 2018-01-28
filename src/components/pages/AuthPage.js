import React from 'react';
import { Redirect } from 'react-router';

import { API_ENDPOINT, CLIENT_ID, CLIENT_SECRET, REDIRECT_URL } from '../../Utils/Constants'

function formatQuery(params) {
    const obj = {}
    params.slice(1)
    .split("&")
    .map(val => 
        val.split("=")
    )
    .forEach(param => {
        obj[param[0]] = param[1]
    })
    return obj
}

function getToken(code) {
    const data = new URLSearchParams()
    data.append('client_id', CLIENT_ID)
    data.append('client_secret', CLIENT_SECRET)
    data.append('grant_type', 'authorization_code')
    data.append('code', code)
    data.append('redirect_uri', REDIRECT_URL)
    
    return fetch(API_ENDPOINT, {
        method: "POST",
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        }),
        body: data.toString(),
    }).then(res => {
        if(!res.ok) return null;
        return res.json()
    }) 
}

export default class AuthPage extends React.Component {
    constructor(p) {
        super(p)

        this.state = {
            redirect: false,
            error: "",
            status: "Validating status",
            message: "Please wait"
        }

    }

    componentWillMount() {
        const { state, code } = formatQuery(this.props.history.location.search)
        this.redirect()

        if(state !== localStorage.getItem("state")) {
            return this.setState({
                error: "Invalid state", 
                status: "Redirecting",
            })
        }

        getToken(code)
        .then(data => {
            if(data === null) {
                return this.setState({ error: "Invalid code", status: "Redirecting", message: "Please try again" })
            }
            localStorage.setItem("token", data.access_token)
            localStorage.setItem("refresh_token", data.refresh_token)
            const expireDate = Date.now() + data.expires_in*1000
            localStorage.setItem("expire_date", expireDate)
            return this.setState({ status: "Success", message: "Redirecting" })
        })

        return undefined
    }
    
    redirect(time = 2500) {
        setTimeout(()=>this.setState({redirect: true}),time)
    }

    render() {
        if(this.state.redirect) return <Redirect to="/"/>
        return <div className="auth content">
            <div className="auth contentAnimation">
                <div className="auth" id="a">.</div>
                <div className="auth" id="b">.</div>
                <div className="auth" id="c">.</div>
            </div>
            <p className="auth contentHeader">{this.state.status}</p>
            <p className="auth contentText">{this.state.message}</p>
            {this.state.error && <p className="auth contentError">{this.state.error}</p>}
        </div>
    }
}