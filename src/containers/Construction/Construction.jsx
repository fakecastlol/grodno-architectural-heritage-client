import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import * as ReactBootStrap from "react-bootstrap";
import filterFactory from "react-bootstrap-table2-filter";
import "./Construction.css";

const inner = {
  width: "auto",
};

const tableHeader1 = {
  // backgroundColor: "#6c757d",
  // borderColor: "#6c757d",
  marginTop: 100,
  // color: "white",
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

const Construction = (props) => {
  const [constructions, setConstructions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const getPagedData = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      const data = await Axios.get("https://localhost:5001/constructions", {
        // headers: authHeader(),
        params,
      });
      console.log(data.data);
      setConstructions(data.data);
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

  const handleAddOnClick = () => {
    props.history.push({
      pathname: "/addconstruction",
    });
  };

  const handleActionsOnClick = (id) => {
    // props.history.push(`/manageconstruction?${id}`);
    props.history.push({
      pathname: `/manageconstruction/${id}`,
      state: { id: id },
    });
  };

  const columns = [
    { dataField: "name", text: "Name", sort: true },
    { dataField: "address", text: "Address" },
    { dataField: "location", text: "Location" },
    // { dataField: "login", text: "Login", sort: true },
    {
      btn: "id",
      dataField: "id",
      text: "Action",
      formatter: (id) => {
        return (
          <div
          //   style={manageForm}
          >
            <button
              type="button"
              class="btn btn-secondary"
              onClick={() => handleActionsOnClick(id)}
              //   style={userButton}
            >
              open
            </button>
          </div>
        );
      },
    },
  ];

  return (
    // <div className="outer">
    //   <div className="inner" style={inner}>
    <div className="container">
      <PaginationProvider
        pagination={paginationFactory({
          custom: true,
          page,
          sizePerPage: setPageSize,
          totalSize: constructions.count,
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
                  <div
                    // class="col-sm-12 btn btn-info"
                    style={tableHeader1}
                  >
                    <h3>List of constructions</h3>
                    <button
                      type="button"
                      class="btn btn-secondary btn-add"
                      onClick={() => handleAddOnClick()}
                      //   style={userButton}
                    >
                      add Construction
                    </button>
                  </div>
                  <BootstrapTable
                    bordered
                    hover
                    remote
                    keyField="id"
                    data={constructions.itemList ?? []}
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
    // </div>
  );
};

export default Construction;
