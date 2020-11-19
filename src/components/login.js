import React, { Component } from "react";

export default class Login extends Component {

    constructor(props){

        super(props);
    
        this.state={
          email:'',
          password:'',
          loggedIn:false,
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


    componentDidMount() {
        if(window.token){
          this.setState({loggedIn:true});
        }
    }

    submit(event){
        this.setState({loggedIn:true})
        event.preventDefault();
        
        // console.log(this.state);

        window.axios.post('http://localhost:5000/login',{email: this.state.email, password: this.state.password})
        .then(response=>{
           console.log(response);
    
           this.setState({loggedIn:true});
    
           localStorage.setItem('token',response.data.auth.access_token)
        });
    }
    

    render() {
        return (
            <form onSubmit={this.submit}>
                <h3>Login</h3>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange = { this.handleChangeEmail }/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange = { this.handleChangePassword }/>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        );
    }
}