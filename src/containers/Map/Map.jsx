import React from "react";
import { useDispatch, useSelector } from "react-redux";
import mapboxgl from "mapbox-gl";
import Tooltip from "./Tooltip";
import ReactDOM from "react-dom";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import {
  Token,
  EntryPoint,
  Bounds,
  layers,
  viewport,
  threeDimensionalLayer,
  mapLayers,
} from "../../constants/mapbox";
import Geocoder from "@mapbox/mapbox-gl-geocoder";
import { getConstructions } from "../../actions/construction";
import { statusToString, typeToString } from "../../constants/construction";
import { GetImageConstruction } from "../../constants/api.url";
import {
  Camera,
  Scene,
  DirectionalLight,
  WebGLRenderer,
  Matrix4,
  Vector3,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import "./Map.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

mapboxgl.accessToken = Token;

const Map = () => {
  const mapContainerRef = React.useRef(null);
  const tooltipRef = React.useRef(new mapboxgl.Popup({ offset: 15 }));
  const [layer, setLayer] = React.useState(3);
  const dispatch = useDispatch();
  const objects = useSelector((state) => {
    return state.construction.constructions;
  });

  const handleSwitchLayer = React.useCallback((value) => {
    setLayer(value);
  }, []);

  React.useEffect(() => {
    dispatch(getConstructions());
  }, [dispatch]);

  // Initialize map when component mounts
  React.useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: layers[layer],
      center: [viewport.latitude, viewport.longitude],
      zoom: 16.5,
      antialias: true,
      pitch: 45,
      bearing: -17.6,
      minZoom: 11,
      maxBounds: Bounds,
    });

    map.addControl(
      new Geocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        marker: true,
      })
    );

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
        // Create tooltip node
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        const tooltipNode = document.createElement("div");
        ReactDOM.render(
          <Tooltip feature={feature} coordinates={coordinates} />,
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
          const popup = new mapboxgl.Popup({ offset: 25 });
          popup.setHTML(
            `<strong class="header-name">${construction.name}</strong>       
              ${
                construction.images[0]
                  ? `<div>
                      <img
                        src=${
                          GetImageConstruction +
                          `${construction.images[0].name}`
                        }
                        alt=""
                        class="img-style"                     
                      /> 
                    </div>`
                  : ""
              }
              ${
                construction.address
                  ? `${`<br><strong> Address: </strong> ${construction.address}`}`
                  : ""
              }
              ${
                construction.article
                  ? ` <br><strong> Article: </strong> <a href=${construction.article} target="_blank">link</a>`
                  : ""
              }
              ${
                construction.description
                  ? `<br>${construction.description}`
                  : ""
              }`
          );

          var el = document.createElement("div");
          el.className =
            "marker " +
            typeToString(construction.type) +
            " " +
            statusToString(construction.status);

          new mapboxgl.Marker(el, {
            color: "#FFFFFF",
            draggable: false,
            // "marker-symbol":"star"
            // style: Marker
            // className: "dot",
          })
            .setLngLat([construction.longitude, construction.latitude])
            .setPopup(popup)
            .addTo(map);
        });
      }

      map.addLayer(
        {
          id: threeDimensionalLayer.id,
          source: threeDimensionalLayer.source,
          "source-layer": "building",
          filter: threeDimensionalLayer.filter,
          type: threeDimensionalLayer.type,
          minzoom: threeDimensionalLayer.minzoom,
          paint: threeDimensionalLayer.paint,
        },
        labelLayerId
      );
    });

    const modelAltitude = 0;
    const modelOrigin = [EntryPoint[0], EntryPoint[1]];
    const modelRotate = [Math.PI / 2, 0, 0];

    var modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
      modelOrigin,
      modelAltitude
    );

    var modelTransform = {
      translateX: modelAsMercatorCoordinate.x,
      translateY: modelAsMercatorCoordinate.y,
      translateZ: modelAsMercatorCoordinate.z,
      rotateX: modelRotate[0],
      rotateY: modelRotate[1],
      rotateZ: modelRotate[2],
      /* Since our 3D model is in real world meters, a scale transform needs to be
       * applied since the CustomLayerInterface expects units in MercatorCoordinates.
       */
      scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits(),
    };

    // configuration of the custom layer for a 3D model per the CustomLayerInterface
    var customLayer = {
      id: "3d-model",
      type: "custom",
      renderingMode: "3d",
      onAdd: function (map, gl) {
        this.camera = new Camera();
        this.scene = new Scene();

        // create two three.js lights to illuminate the model
        var directionalLight = new DirectionalLight(0xffffff);
        directionalLight.position.set(0, -70, 100).normalize();
        this.scene.add(directionalLight);

        var directionalLight2 = new DirectionalLight(0xffffff);
        directionalLight2.position.set(0, 70, 100).normalize();
        this.scene.add(directionalLight2);

        // use the three.js GLTF loader to add the 3D model to the three.js scene
        var loader = new GLTFLoader();
        loader.load(
          "https://docs.mapbox.com/mapbox-gl-js/assets/34M_17/34M_17.gltf",
          function (gltf) {
            this.scene.add(gltf.scene);
          }.bind(this)
        );
        this.map = map;

        // use the Mapbox GL JS map canvas for three.js
        this.renderer = new WebGLRenderer({
          canvas: map.getCanvas(),
          context: gl,
          antialias: true,
        });

        this.renderer.autoClear = false;
      },
      render: function (gl, matrix) {
        var rotationX = new Matrix4().makeRotationAxis(
          new Vector3(1, 0, 0),
          modelTransform.rotateX
        );
        var rotationY = new Matrix4().makeRotationAxis(
          new Vector3(0, 1, 0),
          modelTransform.rotateY
        );
        var rotationZ = new Matrix4().makeRotationAxis(
          new Vector3(0, 0, 1),
          modelTransform.rotateZ
        );

        var m = new Matrix4().fromArray(matrix);
        var l = new Matrix4()
          .makeTranslation(
            modelTransform.translateX,
            modelTransform.translateY,
            modelTransform.translateZ
          )
          .scale(
            new Vector3(
              modelTransform.scale,
              -modelTransform.scale,
              modelTransform.scale
            )
          )
          .multiply(rotationX)
          .multiply(rotationY)
          .multiply(rotationZ);

        this.camera.projectionMatrix = m.multiply(l);
        this.renderer.resetState();
        this.renderer.render(this.scene, this.camera);
        this.map.triggerRepaint();
      },
    };

    map.on("style.load", function () {
      map.addLayer(customLayer, "waterway-label");
    });

    // Clean up on unmount
    return () => map.remove();
  }, [layer, objects]);

  return (
    <div>
      <div className="map-container" ref={mapContainerRef} />
      <ButtonGroup type="checkbox" aria-label="Basic example" className="menu">
        {mapLayers.map((item, index) => (
          <Button
            variant="secondary"
            className={`Btn-Blue-BG ${layer === index ? "active" : ""}`}
            onClick={() => handleSwitchLayer(index)}
          >
            {item}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default Map;
