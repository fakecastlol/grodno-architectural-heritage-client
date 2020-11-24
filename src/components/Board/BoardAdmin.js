import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import * as ReactBootStrap from "react-bootstrap";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

import UserService from "../../services/user.service";
import AdminService from "../../services/admin.service";
import Axios from "axios";
import authHeader from "../../services/auth-header";
import { Redirect, Link } from "react-router-dom";

const tableHeader1 = {
  backgroundColor: "#6c757d",
  borderColor: "#6c757d",
  marginTop: 100,
  color: "white",
};

const userButton = {
  margin: 10,
  // marginTop: 0
};

const BoardAdmin = () => {
  const [content, setContent] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUserData = async () => {
    // AdminService.getUsers();
    try {
      const data = await Axios.get("https://localhost:5001/users", {
        headers: authHeader(),
      });
      console.log(data);
      setUsers(data.data);
      setLoading(true);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteUser = async ({ id }) => {
    // AdminService.getUsers();
    try {
      console.log(id);
      const data = await Axios.delete("https://localhost:5001/delete", {
        headers: authHeader(),
        data: { id },
      });
    } catch (e) {}
  };

  const handleDeleteOnClick = (row) => {
    deleteUser(row);
  };

  const columns = [
    { dataField: "email", text: "Email", sort: true },
    { dataField: "role", text: "Role", sort: true },
    { dataField: "id", text: "Id" },
    {
      btn: "id",
      text: "Manage",
      formatter: (rowContent, row) => {
        return (
          <div>
            <button type="button" class="btn btn-secondary">
              edit role
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              onClick={() => handleDeleteOnClick(row)}
              style={userButton}
            >
              delete user
            </button>
          </div>
        );
      },
    },
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
      {/* <h3>{content}</h3> */}
      {/* <h3>List of users:</h3> */}
      {loading ? (
        // <div className="container">
        <div class="row" className="hdr">
          <div class="col-sm-12 btn btn-info" style={tableHeader1}>
            LIST OF USERS
          </div>

          <BootstrapTable
            striped
            bordered
            hover
            keyField="id"
            data={users}
            columns={columns}
            pagination={paginationFactory()}
            filterFactory={filterFactory()}
          />
        </div>
      ) : (
        // </div>
        <ReactBootStrap.Spinner animation="border" />
      )}
    </div>
  );
};

export default BoardAdmin;
