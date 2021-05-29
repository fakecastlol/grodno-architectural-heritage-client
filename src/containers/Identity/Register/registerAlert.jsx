export const registerAlert = (loading) => {
  if (loading) {
    return (
      <div className="alert alert-success" role="alert">
        Register success!
      </div>
    );
  }
};
