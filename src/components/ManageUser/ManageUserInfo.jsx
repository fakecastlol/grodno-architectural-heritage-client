const ManageUserInfo = ({
  image,
  user,
  formatRegistration,
  formatLastVisited,
}) => {
  return (
    <div>
      <div className="container img">
        {image && <img src={image} height={100} width={100} />}
      </div>
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
    </div>
  );
};

export default ManageUserInfo;
