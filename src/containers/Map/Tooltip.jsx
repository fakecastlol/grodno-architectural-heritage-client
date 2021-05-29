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
      <strong>Description:</strong> {feature.properties.description} */}
      {/* <br />
      <strong>Adress:</strong> {address} */}
    </div>
  );
};

export default Tooltip;


// `<${ConstructionImages} 
//                       ${constructionField}=${construction}
//                     />`


// `<img
//                       src=${`https://localhost:5001/getimageconstruction/objects/79138a2a-d.jpg`}
//                       alt=""
//                     /> `


// ${
//   construction.images[0]
//     ? `<${ConstructionImages} 
//     ${constructionField}=${construction}
//   />`
//     : ""
// }