import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import store from "./store";

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

window.axios = axios;

ReactDOM.render(
  // <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  // </BrowserRouter>
  ,
  document.getElementById("root")
);

serviceWorker.unregister();
