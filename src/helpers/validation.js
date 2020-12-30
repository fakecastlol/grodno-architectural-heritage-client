import { isEmail } from "validator";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const vConfirmPassword = (password, confirm) => {
  if (password !== confirm) {
    return (
      <div className="alert alert-danger" role="alert">
        Passwords do not match.
      </div>
    );
  }
};

const validCoordinates = (value) => {
  const regValue = /^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/;
  if (value && !regValue.test(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Coordinates are not valid.
      </div>
    );
  }
};

export { required, vpassword, validEmail, vConfirmPassword, validCoordinates };
