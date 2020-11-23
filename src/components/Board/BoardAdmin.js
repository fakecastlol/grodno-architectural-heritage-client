import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table'

import UserService from "../../services/user.service";
import AdminService from '../../services/admin.service'

const BoardAdmin = () => {
  const [content, setContent] = useState("");

  const columns = [
    {name: 'id'},
    {name: 'email'},
    {name: 'role'}
  ];

  const users = () =>{
    AdminService.getUsers();
  } 

  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);



  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>

        <Table striped bordered hover >
        <thead>
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>Role</th>
            {/* <th>columns={columns}</th> */}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
          </tr>
        </tbody>
        </Table>

      </header>

    </div>
  );
};

export default BoardAdmin;
