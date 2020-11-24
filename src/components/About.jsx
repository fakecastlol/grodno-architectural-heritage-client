import React, { useEffect, useState } from 'react';
import authHeader from '../services/auth-header';
import axios from 'axios'

const About = () => {
    const[content, setContent] = useState(""); 

    const contentStyle = {
        marginTop: 100,
        color: 'black'
    }

    const getData = async() =>{
        try{
            const data = await  axios.get('https://localhost:5001/about');
            console.log(data.data);
            setContent(data.data);
        }  catch(e){
            console.log(e);
        }
        
    }

    useEffect (()  => {
        getData();
    }
    );
        return (
            <div className="context" style={contentStyle}>
              <h3>{content}</h3>
            </div>
        );
   };
export default About;