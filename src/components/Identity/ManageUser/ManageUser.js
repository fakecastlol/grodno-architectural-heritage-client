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
import { roleToString } from "../../../constants/authorities";

const inner = {
  width: "auto",
};

const container = {
  // marginTop: 100,
};

const info = {
  textAlign: "left",
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

  if (isLoading) return <div>Loading</div>;

  const formatRegistration = moment(user.registrationDate).format(
    "MMMM Do YYYY"
  );
  const formatLastVisited = moment(user.lastVisited).format(
    "MMMM Do YYYY, h:mm:ss a"
  );

  const handleOnChangeRole = async (role) => {
    console.log(user.id, role);
    console.log(user);
    const { id } = user;
    await AdminService.setRole(id, role);
    dispatch(getUser(id), [id, dispatch]);
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
              <strong>{`Id: `}</strong> {user.id}
            </p>
            <p>
              <strong>{`Email: `}</strong> {user.email}
            </p>
            {user.firstName && (
              <p>
                <strong>{`First name:`}</strong> {user.firstName}
              </p>
            )}
            {user.lastName && (
              <p>
                <strong>{`Last name: `}</strong> {user.lastName}
              </p>
            )}
            {user.login && (
              <p>
                <strong>{`Login: `}</strong> {user.login}
              </p>
            )}
            <p>
              <strong>{`Registration date: `}</strong> {formatRegistration}
            </p>
            <p>
              <strong>{`Last visited: `}</strong> {formatLastVisited}
            </p>
            {user.location && (
              <p>
                <strong>{`Location: `}</strong> {user.location}
              </p>
            )}
            <p>
              <strong>{`Article count: `}</strong> {user.articleCount}
            </p>
            <p>
              <strong>{`Messages count: `}</strong> {user.messagesCount}
            </p>
            <p>
              <strong>{`Rank: `}</strong> {user.rank}
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
                  <Dropdown.Item as="button">Moderator</Dropdown.Item>
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
