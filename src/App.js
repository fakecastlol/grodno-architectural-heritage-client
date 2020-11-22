import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import AuthService from './services/auth.service'

import { Login } from "./components/Identity/Login"
import { Register } from "./components/Identity/Register"
import Index from "./index.js"
import { About } from "./components/About"
import { NavMenu } from './components/NavMenu'
import Home from './components/Home/Home'
import Profile from './components/Profile'

function App() {
  return (<Router>
    <div className="App">
      <NavMenu />      
          <Switch>
            <Route exact path={['/', '/home']} component={Home} />
            <Route path="/about" component={About} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path='/profile' component={Profile} />
          </Switch>
    </div>
    </Router>
  );
}

export default App;