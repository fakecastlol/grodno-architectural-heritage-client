import React, { useRef, useEffect, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";
import Tooltip from "./Tooltip";
import ReactDOM from "react-dom";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { Token } from "../../constants/mapbox";
import { MapLayer } from "../../constants/mapbox";
import Geocoder from "react-mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

mapboxgl.accessToken = Token;

const Map = () => {
  const mapContainerRef = useRef(null);
  const tooltipRef = useRef(new mapboxgl.Popup({ offset: 15 }));
  //   const [viewport, setViewport] = useState("");
  const [layer, setLayer] = useState(3);

  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });

  const layers = {
    1: MapLayer + "streets-v10",
    2: MapLayer + "light-v10",
    3: MapLayer + "dark-v9",
    4: MapLayer + "outdoors-v9",
    5: MapLayer + "satellite-v9",
  };

  const handleSwitchLayer = (value) => {
    setLayer(value);
  };

  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  //   const map = new mapboxgl.Map({
  //     container: mapContainerRef.current,
  //     style: layers[layer],
  //     center: [23.829529, 53.677834],
  //     zoom: 16.5,
  //     antialias: true,
  //     pitch: 45,
  //     bearing: -17.6,
  //   });

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: layers[layer],
      center: [23.829529, 53.677834],
      zoom: 16.5,
      antialias: true,
      pitch: 45,
      bearing: -17.6,
    });

    // map.addControl(
    //   new Geocoder({
    //     accessToken: mapboxgl.accessToken,
    //     mapboxgl: mapboxgl,
    //   })
    // );

    // change cursor to pointer when user hovers over a clickable feature
    map.on("mouseenter", (e) => {
      if (e.features.length) {
        map.getCanvas().style.cursor = "pointer";
      }
    });

    // reset cursor to default when user is no longer hovering over a clickable feature
    map.on("mouseleave", () => {
      map.getCanvas().style.cursor = "";
    });

    // add tooltip when users mouse move over a point
    map.on("mousemove", (e) => {
      const features = map.queryRenderedFeatures(e.point);
      if (features.length) {
        const feature = features[0];

        // Create tooltip node
        const tooltipNode = document.createElement("div");
        ReactDOM.render(<Tooltip feature={feature} />, tooltipNode);

        // Set tooltip on map
        tooltipRef.current
          .setLngLat(e.lngLat)
          .setDOMContent(tooltipNode)
          .addTo(map);
      }
    });

    // The 'building' layer in the mapbox-streets vector source contains building-height
    // data from OpenStreetMap.
    map.on("load", function () {
      // Insert the layer beneath any symbol layer.
      let layers = map.getStyle().layers;

      var labelLayerId;
      for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === "symbol" && layers[i].layout["text-field"]) {
          labelLayerId = layers[i].id;
          break;
        }
      }
      map.addLayer(
        {
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
        },
        labelLayerId
      );
    });

    // Clean up on unmount
    return () => map.remove();
  }, [layer]);

  return (
    <div>
      <div className="map-container" ref={mapContainerRef} />

      <Geocoder
        className="geocoder"
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={Token}
        // onSelected={onSelected}
        viewport={viewport}
        hideOnSelect={true}
        value=""
        // queryParams={params}
      />

      <ButtonGroup type="checkbox" aria-label="Basic example" className="menu">
        <Button
          variant="secondary"
          className={`Btn-Blue-BG ${layer === 1 ? "active" : ""}`}
          onClick={() => handleSwitchLayer(1)}
        >
          streets
        </Button>
        <Button
          variant="secondary"
          className={`Btn-Blue-BG ${layer === 2 ? "active" : ""}`}
          onClick={() => handleSwitchLayer(2)}
        >
          light
        </Button>
        <Button
          variant="secondary"
          className={`Btn-Blue-BG ${layer === 3 ? "active" : ""}`}
          onClick={() => handleSwitchLayer(3)}
        >
          dark
        </Button>
        <Button
          variant="secondary"
          className={`Btn-Blue-BG ${layer === 4 ? "active" : ""}`}
          onClick={() => handleSwitchLayer(4)}
        >
          outdoors
        </Button>
        <Button
          variant="secondary"
          className={`Btn-Blue-BG ${layer === 5 ? "active" : ""}`}
          onClick={() => handleSwitchLayer(5)}
        >
          satellite
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default Map;
