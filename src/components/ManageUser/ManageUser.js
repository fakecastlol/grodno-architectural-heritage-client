import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import { getUser } from "../../actions/manageUser";
import { AdminService, ProfileService } from "../../services";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { roleToString } from "../../constants/authorities";
import ManageUserInfo from "./ManageUserInfo";

const ManageUser = (props) => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user, isLoading } = useSelector((state) => state.manageUser);
  const [image, setImage] = useState("");

  useEffect(() => dispatch(getUser(id)), [id, dispatch]);

  useEffect(() => {
    if (id) {
      ProfileService.getProfileImage(id)
        .then((resp) => {
          setImage(resp.data || "");
        })
        .catch(() => setImage(""));
    }
  }, [id]);

  if (isLoading) return <div>Loading</div>;

  const formatRegistration = moment(user.registrationDate).format(
    "MMMM Do YYYY"
  );
  const formatLastVisited = moment(user.lastVisited).format(
    "MMMM Do YYYY, h:mm:ss a"
  );

  const handleOnChangeRole = async (role) => {
    const { id } = user;
    await AdminService.setRole(id, role);
    dispatch(getUser(id), [id, dispatch]);
  };

  const handleDeleteOnClick = async (id) => {
    await AdminService.deleteUser(id);
    props.history.push("/admin");
  };

  return (
    <div className="outer">
      <div className="inner">
        <div className="container">
          <h3>{`Authorities: ${roleToString(user.role)}`}</h3>
          <div className="info">
            <ManageUserInfo
              image={image}
              user={user}
              formatRegistration={formatRegistration}
              formatLastVisited={formatLastVisited}
            />
            <div className="manageForm">
              <Dropdown>
                <DropdownButton
                  variant="secondary"
                  id="dropdown-basic"
                  title="Set role"
                  className="userButton"
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
              {/* <Dropdown>
                <DropdownButton
                  variant="secondary"
                  id="dropdown-basic"
                  title="Ban user"
                  className="userButton"
                >
                  <Dropdown.Item as="button">Day</Dropdown.Item>
                  <Dropdown.Item as="button">Week</Dropdown.Item>
                  <Dropdown.Item as="button">Month</Dropdown.Item>
                  <Dropdown.Item as="button">Permanent</Dropdown.Item>
                </DropdownButton>
              </Dropdown> */}
              <button
                type="button"
                class="btn btn-danger userButton"
                onClick={() => handleDeleteOnClick(user.id)}
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
