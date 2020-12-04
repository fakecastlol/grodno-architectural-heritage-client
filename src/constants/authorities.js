export const roleToString = (role) => {
  switch (role) {
    case 1:
      return "super_admin";

    case 2:
      return "admin";

    case 3:
      return "user";

    default:
      return "user";
  }
};
