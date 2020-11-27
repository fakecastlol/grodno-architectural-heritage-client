import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import moment from "moment";
import { getUser } from "../../../actions/manageUser";

const container = {
  marginTop: 100,
};

const info = {
  textAlign: "left",
  marginLeft: 350,
  marginTop: 50,
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

  return (
    <div className="container" style={container}>
      <h3>{`Role: ${user.role}`}</h3>
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
      </div>
    </div>
  );
};

export default ManageUser;
