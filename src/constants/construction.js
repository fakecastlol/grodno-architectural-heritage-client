export const styleToString = (style) => {
  switch (style) {
    case 1:
      return "baroque";

    case 2:
      return "eclecticism";

    case 3:
      return "moorish";

    case 4:
      return "gothic revival";

    default:
      return "";
  }
};

export const materialToString = (material) => {
  switch (material) {
    case 1:
      return "wood";

    case 2:
      return "brick";

    default:
      return "";
  }
};

export const typeToString = (type) => {
  switch (type) {
    case 1:
      return "sacral";

    case 2:
      return "castle";

    case 3:
      return "attraction";

    default:
      return "";
  }
};

export const statusToString = (status) => {
  switch (status) {
    case 1:
      return "active";

    case 2:
      return "abandoned";

    case 3:
      return "destroyed";

    default:
      return "";
  }
};
