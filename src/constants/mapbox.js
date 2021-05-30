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

export const layers = {
  1: MapLayer + "streets-v10",
  2: MapLayer + "light-v10",
  3: MapLayer + "dark-v9",
  4: MapLayer + "outdoors-v9",
  5: MapLayer + "satellite-v9",
};

export const viewport = {
  latitude: EntryPoint[0],
  longitude: EntryPoint[1],
  zoom: 8,
};

export const threeDimensionalLayer = {
  id: "3d-buildings",
  source: "composite",
  "source-layer": "building",
  filter: ["==", "extrude", "true"],
  type: "fill-extrusion",
  minzoom: 15,
  paint: {
    "fill-extrusion-color": "#aaa",

    // use an 'interpolate' expression to add a smooth transition effect to the
    // buildings as the user zooms in
    "fill-extrusion-height": [
      "interpolate",
      ["linear"],
      ["zoom"],
      15,
      0,
      15.05,
      ["get", "height"],
    ],
    "fill-extrusion-base": [
      "interpolate",
      ["linear"],
      ["zoom"],
      15,
      0,
      15.05,
      ["get", "min_height"],
    ],
    "fill-extrusion-opacity": 0.6,
  },
};

export const mapLayers = ['streets', 'light', 'dark', 'outdoors', 'satellite'];