export const roleToString = (role) => {
  switch (role) {
    case 1:
      return "super_admin";

    case 2:
      return "admin";

    case 3:
      return "user";

    case 4:
      return "moderator";

    case 5:
      return "unchecked";

    default:
      return "user";
  }
};
