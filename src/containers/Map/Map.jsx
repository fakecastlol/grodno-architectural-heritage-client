import React, { useRef, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import mapboxgl from "mapbox-gl";

import "./Map.css";
import Tooltip from "./Tooltip";
import ReactDOM from "react-dom";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { Token, MapLayer, EntryPoint, Bounds, getConstructionType } from "../../constants/mapbox";
import Geocoder from "react-mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
//import construction from "../../reducers/construction";
import { getConstructions } from "../../actions/construction";
import construction from "../../reducers/construction";
import Construction from "../Construction/Construction";

const Marker = {
  backgroundColor: "red",
};

mapboxgl.accessToken = Token;

const Map = () => {
  const dispatch = useDispatch();
  const [markerImage, setMarkerPopup] = useState(null);
  // constructions: constructionField,
  // constructions,
  // isLoading
  const objects = useSelector((state) => {
    console.log("checkstate", state);
    return state.construction.constructions;
  });
  console.log("constructionsss", objects);

  useEffect(() => {
    dispatch(getConstructions());
    // console.log("constructionsss", kek);
  }, []);

  const mapContainerRef = useRef(null);
  const tooltipRef = useRef(new mapboxgl.Popup({ offset: 15 }));
  //   const [viewport, setViewport] = useState("");
  const [layer, setLayer] = useState(3);

  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });

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
    // var northWest = mapboxgl.Map.latLng(23.649946, 53.777896),
    //   southWest = mapboxgl.Map.latLng(23.701109, 53.585526),
    //   southEast = mapboxgl.Map.latLng(23.937955, 53.569966),
    //   northEast = mapboxgl.Map.latLng(24.012956, 53.791696),
    //   bounds = mapboxgl.Map.latLngBounds(
    //     northWest,
    //     southWest,
    //     southEast,
    //     northEast
    //   );
    const layers = {
      1: MapLayer + "streets-v10",
      2: MapLayer + "light-v10",
      3: MapLayer + "dark-v9",
      4: MapLayer + "outdoors-v9",
      5: MapLayer + "satellite-v9",
    };

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: layers[layer],
      center: EntryPoint,
      zoom: 16.5,
      antialias: true,
      pitch: 45,
      bearing: -17.6,
      minZoom: 11,
      maxBounds: Bounds,
    });

    // map.addControl(
    //   new Geocoder({
    //     accessToken: mapboxgl.accessToken,
    //     mapboxgl: mapboxgl,
    //   })
    // );

    // document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

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
        const coordinates = e.lngLat.toString();
        // e.features[0].geometry.coordinates.slice();
        // const address = e.address.toString();
        // const addr = map.address;
        // Create tooltip node
        // while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        //   coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        // }
        // map.setLngLat(coordinates);

        const tooltipNode = document.createElement("div");
        ReactDOM.render(
          <Tooltip
            feature={feature}
            coordinates={coordinates}
            // address={address}
          />,
          tooltipNode
        );
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

      if (objects !== undefined) {
        objects.forEach((construction) => {
          console.log(construction.longitude, construction.latitude);

          const popup = new mapboxgl.Popup({ offset: 25 });
          popup.setHTML(
            `<strong class="header-name">${construction.name}</strong>
              <br><strong> Location: </strong> ${construction.longitude}, ${construction.latitude}
              <br><strong> Address: </strong> ${construction.address}
              <br><strong> Article: </strong> <a href=${construction.article} target="_blank">link</a>
              <br>${construction.description}`
          );

          var el = document.createElement("div");
          el.className = "marker " + getConstructionType(construction.type);

          new mapboxgl.Marker(
            el,
            {
              color: "#FFFFFF",
              draggable: false,
              // "marker-symbol":"star"
              // style: Marker
              // className: "dot",
            }
          )
            .setLngLat([construction.longitude, construction.latitude])
            .setPopup(popup)
            .addTo(map);
        });
      }

      // new mapboxgl.Marker({
      //   color: "#FFFFFF",
      //   draggable: true,
      // })
      //   .setLngLat([23.829529, 53.677834])
      //   .addTo(map);

      // new mapboxgl.Marker({
      //   color: "#FFFFFF",
      //   draggable: true,
      // })
      //   .setLngLat([23.839529, 53.667834])
      //   .addTo(map);

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
  }, [layer, objects]);

  return (
    <div>
      <div className="map-container" ref={mapContainerRef} />

      {/* <Geocoder
        className="geocoder"
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={Token}
        // onSelected={onSelected}
        viewport={viewport}
        hideOnSelect={true}
        value=""
        // queryParams={params}
      /> */}

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
