import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Login from "./components/Identity/Login"
import Register from "./components/Identity/Register"
import About from "./components/About"
import NavMenu from './components/NavMenu'
import Home from './components/Home/Home'
import Profile from './components/Profile'
import BoardUser from './components/Board/BoardUser'
import BoardModerator from './components/Board/BoardModerator'
import BoardAdmin from './components/Board/BoardAdmin'
import ManageUser from './components/Identity/ManageUser/ManageUser'

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
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/manageuser/:id" component={ManageUser}/>
          </Switch>
    </div>
    </Router>
  );
}

export default App;