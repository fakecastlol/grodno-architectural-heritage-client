import React from "react";
import { BrowserRouter as Router, Switch, useLocation } from "react-router-dom";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  let location = useLocation();
  return location.pathname === "/map" || "/mapreact" ? null : (
    <MDBFooter className="font-small footer">
      <MDBContainer fluid className="text-center text-md top-footer">
        <MDBRow>
          <MDBCol md="6 footer-content">
            <h5 className="title">Grodno Architectural Heritage</h5>
            <p>Touch the history of your city</p>
          </MDBCol>
          <MDBCol md="6 footer-content">
            {/* <h5 className="title links">Links</h5> */}
            <ul>
              <li className="list-unstyled">
                <Link to={"/home"} className="link">
                  Home
                </Link>
              </li>
              <li className="list-unstyled">
                <Link to={"/map"} className="link">
                  Map
                </Link>
              </li>
              <li className="list-unstyled">
                <Link to={"/about"} className="link">
                  About
                </Link>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3 bottom-footer">
        <MDBContainer fluid>
          &copy; 2020-{new Date().getFullYear()} Grodno Architectural Heritage
        </MDBContainer>
      </div>
    </MDBFooter>
  );
};

export default Footer;
