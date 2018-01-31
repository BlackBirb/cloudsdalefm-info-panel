import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import HomePage from './components/pages/HomePage';
import AuthPage from './components/pages/AuthPage';
import LivePage from './components/pages/LivePage';
import AdminPage from './components/pages/AdminPage';

import { fetchUserData, authAsAdmin } from './actions/userActions'

class App extends React.Component {
  componentWillMount() {
    const token = localStorage.getItem("token")
    if (token && !this.props.user.logged) {
      this.props.dispatch(fetchUserData(token))
    }
  }

  render() {
    if (this.props.user.logged && this.props.user.discordToken && this.props.user.admin === null) {
      this.props.dispatch(authAsAdmin({
        id: this.props.user.id,
        token: this.props.user.discordToken
      }))
    }


    return (<div className="App">
      <Route path="/" exact component={HomePage} />
      <Route path="/oauth2/authorize" component={AuthPage} />
      <Route path="/live" component={LivePage} />
      <Route path="/live/admin" component={AdminPage} />
    </div>
    )
  }
}

export default withRouter(connect(store => ({
  user: store.user
}))(App));