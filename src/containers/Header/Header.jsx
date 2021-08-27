import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import { logout } from "../../actions/auth";
import { clearMessage } from "../../actions/message";
import { history } from "../../helpers/history";
import "./header.css";

const Header = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  let location = useLocation();
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage());
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.user.role === "ROLE_MODERATOR");
      setShowAdminBoard(currentUser.user.role === 2);
    }
  }, [currentUser]);

  const logOut = () => {
    dispatch(logout());
  };

  // console.log(currentUser.user.role);

  return (
    <div
      className={
        location.pathname === "/map" || "/mapreact"
          ? "map-style"
          : "header-style"
      }
    >
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link to={"/"} className="navbar-brand navbar-logo">
          Grodno Architectural Heritage
        </Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav mr-auto navbar-left">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/map"} className="nav-link">
                Map
              </Link>
            </li>

            {currentUser && currentUser.user.role !== 5 && (
              <li>
                <NavDropdown title="Construction" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/construction">
                    Construction table
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/addconstruction">
                    Add construction
                  </NavDropdown.Item>
                </NavDropdown>
              </li>
            )}

            {currentUser && currentUser.user.role === 5 && (
              <li className="nav-item">
                <Link to={"/construction"} className="nav-link">
                  Constuctions
                </Link>
              </li>
            )}

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {/* {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )} */}

            <li className="nav-item">
              <Link to={"/about"} className="nav-link">
                About
              </Link>
            </li>
          </ul>

          {currentUser ? (
            <div className="navbar-nav ml-auto navbar-identity">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.user.email}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  Log Out
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto navbar-identity">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Sign in
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
