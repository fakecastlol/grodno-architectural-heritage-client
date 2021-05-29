import React, { useState, useEffect, useCallback, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import * as ReactBootStrap from "react-bootstrap";
import filterFactory from "react-bootstrap-table2-filter";
import "./board.css";
import "../../index.css";
import { roleToString } from "../../constants/authorities";
import { getUsers } from "../../services/admin.service";

const BoardAdmin = (props) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState();

  const getPagedData = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      /**
       * TODO: check server
       */
      const data = await getUsers(params);
      setUsers(data.data.users);
      setTotalCount(data.data.pageViewModel.count);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }, []);

  const handleTableChange = useCallback((type, options) => {
    const { page, sizePerPage } = options;
    setPage(page);
    setPageSize(sizePerPage);
  }, []);

  const handleActionsOnClick = useCallback(
    (id) => {
      props.history.push(`/manageuser/${id}`);
    },
    [props.history]
  );

  const columns = useMemo(() => {
    return [
      { dataField: "email", text: "Email", sort: true },
      {
        dataField: "role",
        text: "Role",
        sort: true,
        formatter: (role) => {
          return roleToString(role);
        },
      },
      { dataField: "login", text: "Login", sort: true },
      {
        btn: "id",
        dataField: "id",
        text: "Action",
        formatter: (id) => {
          return (
            <div className="manageForm">
              <button
                type="button"
                class="btn btn-secondary userButton"
                onClick={() => handleActionsOnClick(id)}
              >
                profile
              </button>
            </div>
          );
        },
      },
    ];
  }, [handleActionsOnClick]);

  const paginationOptions = useMemo(() => {
    return {
      custom: false,
      page,
      sizePerPage: pageSize,
      totalSize: totalCount,
      showTotal: true,
      firstPageText: "First",
      prePageText: "Back",
      nextPageText: "Next",
      lastPageText: "Last",
      nextPageTitle: "First page",
      prePageTitle: "Pre page",
      firstPageTitle: "Next page",
      lastPageTitle: "Last page",
    };
  }, [page, pageSize, totalCount]);

  useEffect(() => {
    getPagedData({ page, pageSize });
  }, [getPagedData, page, pageSize]);

  return (
    <div className="container">
      {loading ? (
        <ReactBootStrap.Spinner animation="border" />
      ) : (
        <div class="row" className="hdr">
          <div className="tHeader">
            <h3>List of users</h3>
          </div>
          <BootstrapTable
            bordered
            hover
            remote
            keyField="id"
            data={users ?? []}
            columns={columns}
            onTableChange={handleTableChange}
            pagination={paginationFactory(paginationOptions)}
            filter={filterFactory()}
            sort={{ dataField: "email", order: 0 }}
          />
        </div>
      )}
    </div>
  );
};

export default BoardAdmin;
