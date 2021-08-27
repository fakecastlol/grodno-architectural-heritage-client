import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./containers/Identity/Login/Login";
import Register from "./containers/Identity/Register/Register";
import Forgot from "./containers/Identity/Forgot/Forgot";
import About from "./components/About/About";
import Header from "./containers/Header/Header";
import Home from "./components/Home/Home";
import Profile from "./containers/Profile/Profile";
import BoardUser from "./components/Board/BoardUser";
import BoardModerator from "./components/Board/BoardModerator";
import BoardAdmin from "./components/Board/BoardAdmin";
import ManageUser from "./components/ManageUser/ManageUser";
import NotFound from "./components/NotFound/NotFound";
import Map from "./containers/Map/Map.jsx";
import Construction from "./containers/Construction/Construction";
import ManageConstruction from "./containers/Construction/ManageConstruction.jsx";
import AddConstruction from "./containers/Construction/AddConstruction";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Footer from "./components/Footer/Footer";
import ConfirmRegister from "./containers/Identity/ConfirmRegister/ConfirmRegister";
import AddConstructionImage from "./containers/Construction/AddConstructionImage";
import MapReact from "./containers/Map/MapReact";

function App() {
  return (
    // <Alerts>
    <Router>
      <div className="App">
        <div className="full-wrapper">
          <div class="content-wrapper">
            <Header />
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route path="/about" component={About} />
              <Route path="/login" component={Login} />
              <Route path="/forgot" component={Forgot} />
              <Route path="/register" component={Register} />
              <Route path="/confirmregister" component={ConfirmRegister} />
              <Route path="/profile" component={Profile} />
              <Route path="/user" component={BoardUser} />
              <Route path="/mod" component={BoardModerator} />
              <Route path="/admin" component={BoardAdmin} />
              <Route path="/manageuser/:id" component={ManageUser} />
              <Route path="/map" component={Map} />
              <Route path="/construction" component={Construction} />
              <Route
                path="/manageconstruction"
                component={ManageConstruction}
              />
              <Route
                path="/addconstructionimage"
                component={AddConstructionImage}
              />
              <Route path="/addconstruction" component={AddConstruction} />
              <Route path="/footer" component={Footer} />
              <Route component={NotFound} />
            </Switch>
          </div>
          <div className="footer-wrapper">
            <Footer />
          </div>
        </div>
      </div>
    </Router>
    // </Alerts>
  );
}

export default App;
