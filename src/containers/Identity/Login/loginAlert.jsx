export const loginAlert = (loading) => {
  if (loading) {
    return (
      <div className="alert alert-success" role="alert">
        Login success!
      </div>
    );
  }
};
