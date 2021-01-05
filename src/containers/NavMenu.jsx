import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Link } from "react-router-dom";

import { logout } from "../actions/auth";
import { clearMessage } from "../actions/message";
import { history } from "../helpers/history";

const NavMenu = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      console.log(currentUser);
      setShowModeratorBoard(currentUser.user.role === "ROLE_MODERATOR");
      setShowAdminBoard(currentUser.user.role === 2);
    }
  }, [currentUser]);

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
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

            <li className="nav-item">
              <Link to={"/construction"} className="nav-link">
                Construction
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/about"} className="nav-link">
                About
              </Link>
            </li>

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

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
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

export default NavMenu;
