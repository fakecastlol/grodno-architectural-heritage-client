import React, { Component } from "react";
import './identity.css';

export default class Register extends Component {

    constructor(props) {

        super(props);

        this.state = {
            email: '',
            password: ''
        };

    }

    handleChangeEmail = (event) => {
        let email = event.target.value;
        this.setState({
            email: email
        });
    }

    handleChangePassword = (event) => {
        let password = event.target.value;
        this.setState({
            password: password
        });
    }
    
    handleChangeConfirmPassword = (event) => {
        let confirmPassword = event.target.value;
        this.setState({
            confirmPassword: confirmPassword
        });
    }

    submit = (event) => {
        event.preventDefault();

        console.log(this.state);

        window.axios.post('https://localhost:5001/register', { email: this.state.email, password: this.state.password, confirmPassword: this.confirmPassword })
            .then(response => {

                localStorage.setItem('token', response.data.auth.access_token)
                
            })
            ;
    }

    render() {
        return (
            <form onSubmit={ this.submit }>
                <h3>Register</h3>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange = { this.handleChangeEmail }/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange = { this.handleChangePassword }/>
                </div>

                <div className="form-group">
                    <label>Confirm password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange = { this.handleChangeConfirmPassword }/>
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block" >Sign up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="#">log in?</a>
                </p>
            </form>
        );
    }
}