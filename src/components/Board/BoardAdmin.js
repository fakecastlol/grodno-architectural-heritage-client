import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import * as ReactBootStrap from "react-bootstrap";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

import Axios from "axios";
import authHeader from "../../services/auth-header";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

import "./board.css"

const tableHeader1 = {
  backgroundColor: "#6c757d",
  borderColor: "#6c757d",
  marginTop: 100,
  color: "white",
};

const userButton = {
  margin: 10,
  align: 'center'
};

const manageForm = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap'
}

const BoardAdmin = () => {
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
    { dataField: "id", text: "Id",  },
    {
      btn: "id",
      text: "Manage",
      formatter: (row) => {
        return (
          <div style={manageForm}>
            <Dropdown>
              <DropdownButton 
                variant="secondary" 
                id="dropdown-basic" 
                title='role' 
                style={userButton}>
                    <Dropdown.Item as="button">User</Dropdown.Item>
                    <Dropdown.Item as="button">Moderator</Dropdown.Item>
                    <Dropdown.Item as="button">Admin</Dropdown.Item>
              </DropdownButton>
            </Dropdown>
            <Dropdown>
              <DropdownButton 
                variant="secondary" 
                id="dropdown-basic" 
                title='ban' 
                style={userButton}>
                    <Dropdown.Item as="button">Day</Dropdown.Item>
                    <Dropdown.Item as="button">Week</Dropdown.Item>
                    <Dropdown.Item as="button">Month</Dropdown.Item>
                    <Dropdown.Item as="button">Permanent</Dropdown.Item>
              </DropdownButton>
            </Dropdown>
            <button
              type="button"
              class="btn btn-danger"
              onClick={() => handleDeleteOnClick(row)}
              style={userButton}
            >
              delete
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
      {loading ? (
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
