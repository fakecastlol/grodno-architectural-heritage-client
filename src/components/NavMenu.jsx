import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class NavMenu extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
              <div className="container">
                <Link className="navbar-brand" to={"/home"}>Grodno Architectural Heritage</Link>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link className="nav-link" to={"/about"}>About</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/register"}>Sign up</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/login"}>Sign in</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav> 
        );
    }

}