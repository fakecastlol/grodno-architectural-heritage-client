export const styleToString = (style) => {
  switch (style) {
    case 1:
      return "Baroque";

    case 2:
      return "Eclecticism";
    case 3:
      return "Moorish";
    case 4:
      return "Gothic Revival";

    default:
      return "";
  }
};

export const materialToString = (material) => {
  switch (material) {
    case 1:
      return "Wood";

    case 2:
      return "Brick";

    default:
      return "";
  }
};

export const typeToString = (type) => {
  switch (type) {
    case 1:
      return "Sacral";

    case 2:
      return "Castle";

    case 3:
      return "Attraction";

    default:
      return "";
  }
};

export const statusToString = (status) => {
  switch (status) {
    case 1:
      return "Active";

    default:
      return "";
  }
};
