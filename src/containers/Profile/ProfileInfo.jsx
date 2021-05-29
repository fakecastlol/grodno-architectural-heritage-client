import { GetPic, GetDefaultPic } from "../../constants/api.url";

const ProfileInfo = ({ userField, formatRegistration, formatLastVisited }) => {
  return (
    <>
      <div className="container img">
        <div className="form-group preview">
          <img
            src={
              userField.avatar === "/files/default/default-image"
                ? GetDefaultPic
                : GetPic + `${userField.avatar}`
            }
            alt=""
            className="profile-img"
          />
        </div>
      </div>
      <p>
        <strong>Email:</strong>{" "}
        {userField.role === 5 ? (
          <>
            {userField.email} <strong> (unchecked)</strong>
          </>
        ) : (
          userField.email
        )}
      </p>
      {userField.firstName && (
        <p>
          <strong>First name:</strong> {userField.firstName}
        </p>
      )}
      {userField.lastName && (
        <p>
          <strong>Last name:</strong> {userField.lastName || ""}
        </p>
      )}
      {userField.login && (
        <p>
          <strong>Login:</strong> {userField.login || ""}
        </p>
      )}
      <p>
        <strong>Registration date:</strong> {formatRegistration}
      </p>
      <p>
        <strong>Last visited:</strong> {formatLastVisited}
      </p>
      {userField.location && (
        <p>
          <strong>Location:</strong> {userField.location || ""}
        </p>
      )}
      <p>
        <strong>Article count:</strong> {userField.articleCount}
      </p>
      <p>
        <strong>Messages count:</strong> {userField.messagesCount}
      </p>
      <p>
        <strong>Rank:</strong> {userField.rank}
      </p>
    </>
  );
};

export default ProfileInfo;
