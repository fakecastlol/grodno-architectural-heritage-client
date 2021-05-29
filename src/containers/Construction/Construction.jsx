import React, { useState, useEffect, useCallback, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import overlayFactory from "react-bootstrap-table2-overlay";
import * as ReactBootStrap from "react-bootstrap";
import filterFactory, {
  customFilter,
  textFilter,
} from "react-bootstrap-table2-filter";
import { getConstructions } from "../../services/construction.service";
import "./Construction.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";

const Construction = (props) => {
  const [constructions, setConstructions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState();
  const [sortOrder, setSortOrder] = useState(0);

  const getPagedData = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      /**
       * TODO: check server
       */
      const data = await getConstructions(params);
      setConstructions(data.data.constructions);
      setTotalCount(data.data.pageViewModel.count);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }, []);

  const handleTableChange = useCallback((type, options) => {
    const { name, page, sizePerPage, sortOrder, sortField } = options;
    // setName(name);
    setPage(page);
    setPageSize(sizePerPage);
    setSortOrder(sortOrder);
  });
  //   getPagedData({
  //     page,
  //     sizePerPage,
  //     sortOrder: sortOrder === "asc" ? 1 : 0,
  //   });
  // }, []);

  const handleAddImageOnClick = useCallback(
    (id) => {
      // props.history.push(`/manageconstruction?${id}`);
      props.history.push({
        pathname: `/addconstructionimage/${id}`,
        state: { id: id },
      });
    },
    [props.history]
  );

  const handleActionsOnClick = useCallback(
    (id) => {
      // props.history.push(`/manageconstruction?${id}`);
      props.history.push({
        pathname: `/manageconstruction/${id}`,
        state: { id: id },
      });
    },
    [props.history]
  );

  // const textFilter = useMemo(() => {
  //   return {
  //     placeholder: "My Custom PlaceHolder", // custom the input placeholder
  //     className: "my-custom-text-filter", // custom classname on input
  //     defaultValue: "test", // default filtering value
  //     // comparator: Comparator.EQ, // default is Comparator.LIKE
  //     caseSensitive: true, // default is false, and true will only work when comparator is LIKE
  //     // style: { ... }, // your custom styles on input
  //     delay: 1000, // how long will trigger filtering after user typing, default is 500 ms
  //     // getFilter: (f) => { ... }, // accept callback function and you can call it for filter programmtically
  //     id: "id", // assign a unique value for htmlFor attribute, it's useful when you have same dataField across multiple table in one page
  //   };
  // }, []);

  const columns = useMemo(() => {
    return [
      {
        dataField: "name",
        text: "Name",
        sort: true,
        // sortFunc: (a, b, order, dataField, rowA, rowB) => {
        //   if (order === 'asc') {
        //     setSortOrder(0);
        //   }
        //   else setSortOrder(1); // desc
        // },

        // filter: textFilter(),

        // { onFilter: setName(name) }
        // filter: customFilter(),
        // filterRenderer: (onFilter, column) => .....
      },
      {
        dataField: "address",
        text: "Address",
        sort: true,
        // sortFunc: (a, b, order, dataField, rowA, rowB) => {
        //   if (order === 'asc') {
        //     setSortOrder(0);
        //   }
        //   else setSortOrder(1); // desc
        // },
        // filter: textFilter()
        // filter: customFilter(),
      },
      // { dataField: ["latitude", "longitude"], text: "Location" },
      // { dataField: "login", text: "Login", sort: true },
      {
        btn: "id",
        dataField: "id",
        text: "Action",
        formatter: (id) => {
          return (
            <div className="manageform action-button">
              <div>
                <button
                  type="button"
                  className="btn btn-secondary userButton"
                  onClick={() => handleActionsOnClick(id)}
                >
                  open
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-secondary userButton"
                  onClick={() => handleAddImageOnClick(id)}
                >
                  add image
                </button>
              </div>
            </div>
          );
        },
      },
    ];
  }, [handleActionsOnClick, handleAddImageOnClick]);

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

  // useEffect(() => {
  //   getPagedData({
  //     page,
  //     pageSize,
  //     sortOrder,
  //   });
  // }, []);

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
            <h3>List of constructions</h3>
          </div>
          <BootstrapTable
            bordered
            hover
            remote
            keyField="id"
            data={constructions ?? []}
            columns={columns}
            onTableChange={handleTableChange}
            pagination={paginationFactory(paginationOptions)}
            filter={filterFactory()}
            sort={
              ({ dataField: "name", order: 1 },
              { dataField: "name", order: 0 },
              { dataField: "address", order: 2 },
              { dataField: "address", order: 3 })
            }
          />
        </div>
      )}
    </div>

    // <div className="container">
    //   <div className="hdr">
    //     <div className="tHeader">
    //       <h3>List of constructions</h3>
    //     </div>
    //     <BootstrapTable
    //       bordered
    //       hover
    //       remote
    //       keyField="id"
    //       data={constructions ?? []}
    //       columns={columns}
    //       onTableChange={handleTableChange}
    //       pagination={paginationFactory(paginationOptions)}
    //       filter={filterFactory()}
    //       sort={
    //         ({ dataField: "name", order: 1 },
    //         { dataField: "name", order: 0 },
    //         { dataField: "address", order: 2 },
    //         { dataField: "address", order: 3 })
    //       }
    //     />
    //   </div>
    // </div>
  );
};

export default Construction;
