import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import moment from "moment";
import { getUser } from "../../../actions/manageUser";
import AdminService from "../../../services/admin.service";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import {roleToString} from "../../../constants/authorities"

const inner = {
  width: "auto"
}

const container = {
  // marginTop: 100,
};

const info = {
  textAlign: "left",
  // marginLeft: 350,
  // marginTop: 50,
};

const userButton = {
  align: "center",
};

const manageForm = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  flexWrap: "nowrap",
  width: "100%",
};

const ManageUser = (props) => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user, isLoading } = useSelector((state) => state.manageUser);

  useEffect(() => dispatch(getUser(id)), [id, dispatch]);

  // if (!currentUser) {
  //   return <Redirect to="/login" />;
  // }

  if (isLoading) return <div>Loading</div>;

  const formatRegistration = moment(user.registrationDate).format(
    "MMMM Do YYYY"
  );
  const formatLastVisited = moment(user.lastVisited).format(
    "MMMM Do YYYY, h:mm:ss a"
  );

  const handleOnChangeRole = (role) => {
    console.log(user.id, role);
    console.log(user);
    const { id } = user;
    AdminService.setRole(id, role);
  };

  const handleDeleteOnClick = (id) => {
    AdminService.deleteUser(id);
    props.history.push("/admin");
  };

  return (
    <div className="outer">
      <div className="inner" style={inner}>
        <div className="container" style={container}>
          <h3>{`Authorities: ${roleToString(user.role)}`}</h3>
          <div className="info" style={info}>
            <p>
              <strong>{`Id: ${user.id}`}</strong> {}
            </p>
            <p>
              <strong>{`Email: ${user.email}`}</strong> {}
            </p>
            <p>
              <strong>{`First name: ${user.firstName}`}</strong> {}
            </p>
            <p>
              <strong>{`Last name: ${user.lastName}`}</strong> {}
            </p>
            <p>
              <strong>{`Login: ${user.login}`}</strong> {}
            </p>
            <p>
              <strong>{`Registration date: ${formatRegistration}`}</strong> {}
            </p>
            <p>
              <strong>{`Last visited: ${formatLastVisited}`}</strong> {}
            </p>
            <p>
              <strong>{`Location: ${user.location}`}</strong> {}
            </p>
            <p>
              <strong>{`Article count: ${user.articleCount}`}</strong> {}
            </p>
            <p>
              <strong>{`Messages count: ${user.messagesCount}`}</strong> {}
            </p>
            <p>
              <strong>{`Rank: ${user.rank}`}</strong> {}
            </p>
            <div style={manageForm}>
              <Dropdown>
                <DropdownButton
                  variant="secondary"
                  id="dropdown-basic"
                  title="Set role"
                  style={userButton}
                >
                  <Dropdown.Item
                    as="button"
                    onClick={() => handleOnChangeRole(3)}
                  >
                    User
                  </Dropdown.Item>
                  <Dropdown.Item 
                    as="button">Moderator
                  </Dropdown.Item>
                  <Dropdown.Item
                    as="button"
                    onClick={() => handleOnChangeRole(2)}
                  >
                    Admin
                  </Dropdown.Item>
                </DropdownButton>
              </Dropdown>
              <Dropdown>
                <DropdownButton
                  variant="secondary"
                  id="dropdown-basic"
                  title="Ban user"
                  style={userButton}
                >
                  <Dropdown.Item as="button">Day</Dropdown.Item>
                  <Dropdown.Item as="button">Week</Dropdown.Item>
                  <Dropdown.Item as="button">Month</Dropdown.Item>
                  <Dropdown.Item as="button">Permanent</Dropdown.Item>
                </DropdownButton>
              </Dropdown>
              <button
                type="button"
                class="btn btn-danger"
                onClick={() => handleDeleteOnClick(user.id)}
                style={userButton}
              >
                Delete user
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
