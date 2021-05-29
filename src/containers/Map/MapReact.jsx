// import React from "react";
// import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
// import { Token, MapLayer, EntryPoint, Bounds } from "../../constants/mapbox";
// import "mapbox-gl/dist/mapbox-gl.css";
// import "./Map.css";

// ReactMapboxGl.accessToken = Token;

const MapReact = () => {
  // const Map = ReactMapboxGl({
  //   accessToken: Token,
  //   center: [EntryPoint[0], EntryPoint[1]],
  //   zoom: 20,
  // });

  // const layers = {
  //   1: MapLayer + "streets-v10",
  //   2: MapLayer + "light-v10",
  //   3: MapLayer + "dark-v9",
  //   4: MapLayer + "outdoors-v9",
  //   5: MapLayer + "satellite-v9",
  // };

  // const mapStyle = {
  //   flex: 1,
  // };

  // const paintLayer = {
  //   "fill-extrusion-color": "#aaa",
  //   "fill-extrusion-height": {
  //     property: "height",
  //   },
  //   "fill-extrusion-base": {
  //     property: "min_height",
  //   },
  //   "fill-extrusion-opacity": 0.6,
  // };

  // return (
  //   <Map
  //     center={[EntryPoint[0], EntryPoint[1]]}
  //     zoom={[16.5]}
  //     style="mapbox://styles/mapbox/dark-v9"
  //     containerStyle={{
  //       height: "100vh",
  //       width: "100vw",
  //     }}
  //   >
  //     <Layer
  //       //   type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}

  //       id="3d-buildings"
  //       sourceId="composite"
  //       layerOptions={{
  //         "source-layer": "building",
  //         filter: ["==", "extrude", "true"],
  //         type: "fill-extrusion",
  //         minzoom: 15,
  //       }}
  //       paint={{
  //         "fill-extrusion-color": "#aaa",
  //         "fill-extrusion-height": {
  //           type: "identity",
  //           property: "height",
  //         },
  //         "fill-extrusion-base": {
  //           type: "identity",
  //           property: "min_height",
  //         },
  //         "fill-extrusion-opacity": 0.6,
  //       }}
  //     >
  //       <Feature
  //       // coordinates={[-0.481747846041145, 51.3233379650232]}
  //       />
  //     </Layer>
  //   </Map>
  // );
};

export default MapReact;
