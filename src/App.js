import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Login } from "./components/Identity/Login";
import { Register } from "./components/Identity/Register";
import { Index } from "./index.js";
import { About } from "./components/About";
import { NavMenu } from './components/NavMenu';
import { Home } from './components/Home/Home';

function App() {
  return (<Router>
    <div className="App">
      <NavMenu />      
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path="/index" component={Index} />
            <Route path="/about" component={About} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
    </div>
    </Router>
  );
}

export default App;