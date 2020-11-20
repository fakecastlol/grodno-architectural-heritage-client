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
                <Link className="navbar-brand" to={"/index"}>Grodno Architectural Heritage</Link>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link className="nav-link" to={"/about"}>About</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/register"}>Sign in</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/login"}>Sign up</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav> 
        );
    }

}