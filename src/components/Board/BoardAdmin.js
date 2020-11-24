import React, { useState, useEffect } from "react";
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import * as ReactBootStrap from 'react-bootstrap'

import UserService from "../../services/user.service";
import AdminService from '../../services/admin.service'
import Axios from "axios";
import authHeader from "../../services/auth-header";

const BoardAdmin = () => {
  const [content, setContent] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUserData = async () => {
    // AdminService.getUsers();
    try{
      const data = await Axios.get("https://localhost:5001/users", { headers: authHeader()});
      console.log(data);
      setUsers(data.data);
    } catch (e) {
      console.log(e);
    }
  }; 

  const columns = [
    {dataField: 'id', text: "Id"},
    {dataField: 'email', text: "Email"},
    {dataField: 'role', text: "Role"}
  ];


  useEffect(() => {
    // UserService.getAdminBoard().then(
    //   (response) => {
    //     setContent(response.data);
        getUserData();
    //   },
    //   (error) => {
    //     const _content =
    //       (error.response &&
    //         error.response.data &&
    //         error.response.data.message) ||
    //       error.message ||
    //       error.toString();

    //     setContent(_content);
    //   }
      
    // );
  }, []);



  return (
    <div className="container">
      <header className="jumbotron">
         <h3>{content}</h3>

        <BootstrapTable 
        //  striped bordered hover
          keyField="name"
          data={users}
          columns={columns}
          pagination={paginationFactory()}
        />
       </header>
      </div>
  );
};

export default BoardAdmin;
