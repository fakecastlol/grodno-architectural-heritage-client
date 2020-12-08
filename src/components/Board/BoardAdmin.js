import React, { useState, useEffect, useCallback } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import * as ReactBootStrap from "react-bootstrap";
import filterFactory from "react-bootstrap-table2-filter";

import Axios from "axios";
import authHeader from "../../helpers/auth-header";
import "./board.css";
import "../../index.css";
import authName from "../../constants/authorities";
import { roleToString } from "../../constants/authorities";

const inner = {
  width: "auto",
};

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
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  // const dispatch = useDispatch();

  const getPagedData = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      const data = await Axios.get("https://localhost:5001/users", {
        headers: authHeader(),
        params,
      });
      console.log(data.data);
      setUsers(data.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getPagedData({ page, pageSize });
  }, [getPagedData, page, pageSize]);

  const handleTableChange = useCallback((type, options) => {
    const { page, sizePerPage } = options;
    setPage(page);
    setPageSize(sizePerPage);
  }, []);

  const handleActionsOnClick = (id) => {
    props.history.push(`/manageuser/${id}`);
  };

  const columns = [
    { dataField: "email", text: "Email", sort: true },
    {
      dataField: "role",
      text: "Role",
      sort: true,
      formatter: (role) => {
        return roleToString(role);
      },
    },
    { dataField: "id", text: "Id" },
    { dataField: "login", text: "Login", sort: true },
    {
      btn: "id",
      dataField: "id",
      text: "Action",
      formatter: (id) => {
        return (
          <div style={manageForm}>
            <button
              type="button"
              class="btn btn-secondary"
              onClick={() => handleActionsOnClick(id)}
              style={userButton}
            >
              profile
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="outer">
      <div className="inner" style={inner}>
        {/* <div className="container">  */}

        <PaginationProvider
          pagination={paginationFactory({
            custom: true,
            page,
            sizePerPage: setPageSize,
            totalSize: users.count,
          })}
        >
          {({ paginationProps, paginationTableProps }) => (
            <div className="container">
              {
                loading ? (
                  <ReactBootStrap.Spinner animation="border" />
                ) : (
                  // <div >
                  <div class="row" className="hdr">
                    <div class="col-sm-12 btn btn-info" style={tableHeader1}>
                      {`LIST OF USERS`}
                    </div>
                    <BootstrapTable
                      bordered
                      hover
                      remote
                      keyField="id"
                      data={users.itemList ?? []}
                      columns={columns}
                      onTableChange={handleTableChange}
                      {...paginationTableProps}
                      // filterFactory={filterFactory()}
                    />
                  </div>
                )
                // </div>
              }
              <PaginationListStandalone {...paginationProps} />
            </div>
          )}
        </PaginationProvider>
        {/* //   </div> */}
      </div>
    </div>
  );
};

export default BoardAdmin;
