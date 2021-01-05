import React from "react";

const Tooltip = ({
  feature,
  coordinates,
  // address
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
      {/* <br />
      <strong>Adress:</strong> {address} */}
    </div>
  );
};

export default Tooltip;
