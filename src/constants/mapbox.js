export const Token =
  "pk.eyJ1IjoiZmFrZWNhc3Rsb2wiLCJhIjoiY2tpZnQxcG5sMG9vejJ3bGJmN3dzbmd2aiJ9.mMqbWsUTAvl1mazeoOFqTQ";

export const MapLayer = "mapbox://styles/mapbox/";

export const EntryPoint = [23.829529, 53.677834];

export const Bounds = [
  [23.601109, 53.605526], // Southwest coordinates
  [23.989496, 53.721696], // Northeast coordinates
];

export const getConstructionType = (value) => {
  switch (value) {
    case 1:
      return "sacral";

    case 2:
      return "castle";

    case 3:
      return "attraction"

    default:
      return "";
  }
};
