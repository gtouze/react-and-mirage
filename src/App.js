import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import User from './components/user/User';
import Compagny from './components/compagny/Compagny';


class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <h2>TD React and Mirage</h2>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <ul className="navbar-nav mr-auto">
                <li><Link to={'/'} className="nav-link"> Home </Link></li>
                <li><Link to={'/user'} className="nav-link">User</Link></li>
                <li><Link to={'/compagny'} className="nav-link">Compagny</Link></li>
              </ul>
            </nav>
            <hr />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/user' component={User} />
              <Route exact path='/user/:id' component={User} />
              <Route exact path='/compagny' component={Compagny} />
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;