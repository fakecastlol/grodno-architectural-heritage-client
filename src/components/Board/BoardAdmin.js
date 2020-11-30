import React, { useState, useEffect, useCallback } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import * as ReactBootStrap from "react-bootstrap";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import { Router, Link } from "react-router-dom";

import Axios from "axios";
import authHeader from "../../helpers/auth-header";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

import "./board.css";
import adminService from "../../services/admin.service";
import { getUser } from "../../actions/manageUser";
import { connect, useDispatch } from "react-redux";

const tableHeader1 = {
  backgroundColor: "#6c757d",
  borderColor: "#6c757d",
  marginTop: 100,
  color: "white",
};

const userButton = {
  margin: "auto",
  align: "center",
};

const manageForm = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
};

const BoardAdmin = (props) => {
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);

  console.log("statePage", pageNumber)

  const dispatch = useDispatch();

  const getPagedData = useCallback(async (pageNumber) => {
    console.log(pageNumber)
    try {
      const data = await Axios.get("https://localhost:5001/pusers", {
        headers: authHeader(),
        params: { pageNumber },
      });
      // console.log(data);

      setUsers(data.data);
      setLoading(true);
    } catch (e) {
      console.log(e);
    }
  },[]) 
  
  useEffect(() => {
    console.log("pagedata");
    getPagedData(pageNumber);
  }, [getPagedData, pageNumber]);

  const handlePageChange = (pageNumber, pageSize) => {
    console.log("handleChange", pageNumber, pageSize);
    setPageNumber(pageNumber);
    setPageSize(pageSize);
    // getPagedData();
  }

  // const getUserData = async () => {
  //   // AdminService.getUsers();
  //   try {
  //     const data = await Axios.get("https://localhost:5001/users", {
  //       headers: authHeader(),
  //     });
  //     console.log(data);
  //     setUsers(data.data);
  //     setLoading(true);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const deleteUser = async ( {id} ) => {
  //   // AdminService.getUsers();
  //   try {
  //     console.log(id);
  //     const data = await Axios.delete("https://localhost:5001/delete", {
  //       headers: authHeader(),
  //       data: { id },
  //     });
  //   } catch (e) {}
  // };

  // const handleDeleteOnClick = (row) => {
  //   deleteUser(row);
  // };

  // const getUser = async (id) => {
  //   try {
  //     const data = await Axios.get("https://localhost:5001/getuser", {
  //       headers: authHeader(),
  //       params: { id },
  //     });
  //     console.log(data);
  //   } catch (e) {}
  // };

  const handleActionsOnClick = (id) => {
    console.log(id);
    // adminService.getUser(id);
    // console.log(props.onGetUser);
    // dispatch(getUser(id));
    props.history.push(`/manageuser/${id}`);
  };

  const columns = [
    { dataField: "email", text: "Email", sort: true },
    { dataField: "role", text: "Role", sort: true },
    { dataField: "id", text: "Id" },
    { dataField: "login", text: "Login", sort: true },
    {
      btn: "id",
      dataField: "id",
      text: "Manage",
      formatter: (id) => {
        return (
          <div style={manageForm}>
            {/* <Dropdown>
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
            </Dropdown> */}
            {/* <button
              type="button"
              class="btn btn-danger"
              onClick={() => handleDeleteOnClick(row)}
              style={userButton}
            >
              delete
            </button>  */}
            <button
              type="button"
              class="btn btn-secondary"
              onClick={() => handleActionsOnClick(id)}
              style={userButton}
            >
              actions
            </button>
          </div>
        );
      },
    },
  ];



  return (
    <div className="container">
      {loading ? (
        <div class="row" className="hdr">
          <div class="col-sm-12 btn btn-info" style={tableHeader1}>
            LIST OF USERS
          </div>
          {console.log(users)}
          <BootstrapTable
            striped
            bordered
            hover
            keyField="id"
            data={users?.itemList || []}
            columns={columns}
            pagination={paginationFactory({
              sizePerPage: pageSize,
              page: pageNumber,
              totalSize: users?.count,
              onPageChange: handlePageChange,
            })}
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
