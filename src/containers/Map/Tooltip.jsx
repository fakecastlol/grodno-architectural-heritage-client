import React from "react";

const Tooltip = ({
  feature,
  coordinates,
}) => {
  const { id } = feature.properties;

  return (
    <div id={`tooltip-${id}`} className="sidebar-style">
      <strong>Source Layer:</strong> {feature.layer["source-layer"]}
      <br />
      <strong>Layer ID:</strong> {feature.layer.id}
      <br />
      <strong>Type:</strong> {feature.layer.type}
      <br />
      <strong>Coordinates:</strong> {coordinates}
    </div>
  );
};

export default Tooltip;