import React, {Component} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import axios from 'axios';

export default class Index extends Comment{
    
    constructor(props){

        super(props);
    }

    render(){
        return (
            <h3>Kek</h3>
        );
    }
}

window.axios=axios;

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("root")
);