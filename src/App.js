import React from 'react';
import { Route } from 'react-router-dom';

import HomePage from './components/pages/HomePage';
import AuthPage from './components/pages/AuthPage';
import LivePage from './components/pages/LivePage';
import AdminPage from './components/pages/AdminPage';

class App extends React.Component {
  render() {
    return (<div className="App">
      <Route path="/" exact component={HomePage} />
      <Route path="/oauth2/authorize" component={AuthPage} />
      <Route path="/live" component={LivePage}/>
      <Route path="/live/admin" component={AdminPage}/>
    </div>
    )
  }
}

export default App