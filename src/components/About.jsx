import React, {Component} from 'react';

const About = () => {
    // static displayName = About.name;

    // constructor(props){

    //     super(props);
    // }

    const getUrl = () =>{
        window.axios.get('https://localhost:5001/about')
        .then(response => {  
            localStorage.setItem('token', response.data.auth.access_token)           
        }
        );
    }

    // render( {
        return (
            <div style={{marginTop: "10em"}}>
              <h2>about page</h2>  
            </div>
        )
    // }
    
};

export default About;