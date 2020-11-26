import React, { useEffect, useState } from 'react';
import axios from 'axios'
import UserService from '../../../services/user.service';

const ManageUser = () => {  
  const [content, setContent] = useState("");
  
  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
        <h1>This applcation is under development</h1>
    </div>
  );
   };
export default ManageUser;