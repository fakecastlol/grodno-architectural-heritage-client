import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams, useLocation } from "react-router-dom";
import moment from "moment";
import { getConstruction } from "../../actions/construction";
import { ConstructionService } from "../../services";
// import { ProfileService } from "../../../services";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Construction from "./Construction";
// import { roleToString } from "../../../constants/authorities";
import { required } from "../../helpers/validation";
import CheckButton from "react-validation/build/button";
import "../../index.css";
import {
  materialToString,
  styleToString,
  typeToString,
  statusToString,
} from "../../constants/construction";

const inner = {
  width: "auto",
};

const container = {
  // marginTop: 100,
};

const info = {
  textAlign: "left",
};

const userButton = {
  align: "center",
};

const manageForm = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  flexWrap: "nowrap",
  width: "100%",
};

const img = {
  textAlign: "center",
};

const pStyle = {
  display: "flex",
  justifyContent: "space-between",
};

const formStyle = {
  // display: "flex",
  width: "100%",
  // marginLeft: 10
  marginRight: 40,
  // marginTop: 'auto'
};

const ManageConstruction = (props) => {
  //const { id } = useParams();
  let location = useLocation();
  const dispatch = useDispatch();
  const form = useRef();
  const checkBtn = useRef();
  const [message, setMessage] = useState("");

  const { construction: constructionField, isLoading } = useSelector(
    (state) => state.construction
  );

  const [type, setType] = useState("Type");
  const [status, setStatus] = useState("Status");
  const [material, setMaterial] = useState("Material");
  const [archTitle, setArchTitle] = useState("Architectural style");
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (!isLoading) {
      setFormData({
        id: constructionField.id,
        name: constructionField.name,
        address: constructionField.address,
        article: constructionField.article,
        location:
          constructionField.longitude + ", " + constructionField.latitude,
        buildDate: constructionField.buildDate,
        lossDate: constructionField.lossDate,
        type: constructionField.type,
        status: constructionField.status,
        material: constructionField.material,
        architecturalStyle: constructionField.architecturalStyle,
        latitude: constructionField.latitude,
        longitude: constructionField.longitude,
        description: constructionField.description,
      });
    }
  }, [isLoading, setFormData, constructionField]);

  //   const { construction, isLoading } = useSelector(
  //     (state) => state.construction
  //   );
  //   const [image, setImage] = useState("");

  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const handleSwitchView = async () => {
    setIsSwitchOn(!isSwitchOn);
    await dispatch(getConstruction(location.state.id));
  };

  const onChangeFormData = (e, fieldName) => {
    const data = e.target.value;
    setFormData((construction) => ({ ...construction, [fieldName]: data }));
  };

  const handleApplyChanges = async (e) => {
    e.preventDefault();
    await ConstructionService.updateConstruction(formData);
    dispatch(getConstruction(constructionField.id));
    // uploadImage(image);
    // console.log("userProfile", formData);
  };

  const handleDeleteOnClick = async (id) => {
    await ConstructionService.deleteConstruction(id);
    console.log("gde id", id);
    // await AdminService.getUsers();
    props.history.push("/construction");
  };

  const handleBackOnClick = () => {
    props.history.push("/construction");
  };

  const onSetType = async (e, value, title) => {
    e.preventDefault();
    setType("Type: " + title);
    setFormData((construction) => ({
      ...construction,
      ["type"]: value,
    }));
  };

  const onSetStatus = async (e, value, title) => {
    e.preventDefault();
    setStatus("Status: " + title);
    setFormData((construction) => ({
      ...construction,
      ["status"]: value,
    }));
  };

  const onSetMaterial = async (e, value, title) => {
    e.preventDefault();
    setMaterial("Material: " + title);
    setFormData((construction) => ({
      ...construction,
      ["material"]: value,
    }));
  };

  const onSetStyle = async (e, value, title) => {
    e.preventDefault();
    setArchTitle("Style: " + title);
    setFormData((construction) => ({
      ...construction,
      ["architecturalStyle"]: value,
    }));
  };

  useEffect(() => dispatch(getConstruction(location.state.id)), [
    location.state.id,
    dispatch,
  ]);

  //   useEffect(() => {
  //     if (id) {
  //         ConstructionService.getProfileImage(id)
  //         .then((resp) => {
  //           setImage(resp.data || "");
  //         })
  //         .catch(() => setImage(""));
  //     }
  //   }, [id]);

  // const formatBuildDate = moment(constructionField.buildDate).format(
  //   "MMMM Do YYYY"
  // );
  // const formatLostDate = moment(constructionField.lostDate).format(
  //   "MMMM Do YYYY"
  // );

  if (isLoading) return <div>Loading</div>;

  return (
    <div className="outer">
      <div className="inner" style={inner}>
        <Form onSubmit={handleApplyChanges} ref={form}>
          <div className="container" style={container}>
            <h3>{constructionField.name}</h3>
            <div className="info" style={info}>
              {isSwitchOn ? (
                <div className="fields">
                  <div style={pStyle}>
                    <strong>Name:</strong>
                    <div
                      className="form-group"
                      // style={formStyle}
                    >
                      <Input
                        type="text"
                        className="form-control"
                        name="text"
                        value={formData.name}
                        style={formStyle}
                        validations={[required]}
                        onChange={(e) => onChangeFormData(e, "name")}
                      />
                    </div>
                  </div>
                  {message && (
                    <div className="form-group">
                      <div className="alert alert-danger" role="alert">
                        {message}
                      </div>
                    </div>
                  )}
                  {/* <CheckButton style={{ display: "none" }} ref={checkBtn} /> */}
                  <div style={pStyle}>
                    <strong>Address:</strong>
                    <div
                      className="form-group"
                      // style={formStyle}
                    >
                      <Input
                        type="text"
                        className="form-control"
                        name="text"
                        value={formData.address}
                        style={formStyle}
                        onChange={(e) => onChangeFormData(e, "address")}
                      />
                    </div>
                  </div>

                  <div style={pStyle}>
                    <strong>Location:</strong>
                    <div
                      className="form-group"
                      // style={formStyle}
                    >
                      <Input
                        type="text"
                        className="form-control"
                        name="text"
                        value={formData.location}
                        style={formStyle}
                        onChange={(e) => onChangeFormData(e, "location")}
                      />
                    </div>
                  </div>

                  <div style={pStyle}>
                    <strong>Article:</strong>
                    <div
                      className="form-group"
                      // style={formStyle}
                    >
                      <Input
                        type="text"
                        className="form-control"
                        name="text"
                        value={formData.article}
                        style={formStyle}
                        onChange={(e) => onChangeFormData(e, "article")}
                      />
                    </div>
                  </div>

                  <div style={pStyle}>
                    <strong>Build date:</strong>
                    <div
                      className="form-group"
                      // style={formStyle}
                    >
                      <Input
                        type="date"
                        className="form-control"
                        name="text"
                        style={formStyle}
                        value={formData.buildDate}
                        onChange={(e) => onChangeFormData(e, "buildDate")}
                      />
                    </div>
                  </div>
                  <div style={pStyle}>
                    <strong>Lost date:</strong>
                    <div
                      className="form-group"
                      // style={formStyle}
                    >
                      <Input
                        type="date"
                        className="form-control"
                        name="text"
                        style={formStyle}
                        value={formData.lossDate}
                        onChange={(e) => onChangeFormData(e, "lossDate")}
                      />
                    </div>
                  </div>

                  <Dropdown>
                    <DropdownButton
                      variant="secondary"
                      id="dropdown-basic"
                      title={typeToString(formData.type)}
                      className="drop-btn"
                    >
                      <Dropdown.Item
                        as="button"
                        onClick={(e) => onSetType(e, 1, "sacral")}
                      >
                        Sacral
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="button"
                        onClick={(e) => onSetType(e, 2, "castle")}
                      >
                        Castle
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="button"
                        onClick={(e) => onSetType(e, 3, "attraction")}
                      >
                        Attraction
                      </Dropdown.Item>
                    </DropdownButton>
                  </Dropdown>
                  {/* </td>
                    <td> */}
                  <Dropdown>
                    <DropdownButton
                      variant="secondary"
                      id="dropdown-basic"
                      title={statusToString(formData.status)}
                      className="drop-btn"
                    >
                      <Dropdown.Item
                        as="button"
                        onClick={(e) => onSetStatus(e, 1, "active")}
                      >
                        Active
                      </Dropdown.Item>
                    </DropdownButton>
                  </Dropdown>
                  {/* </td>
                  </tr>
                  <tr>
                    <td> */}
                  <Dropdown>
                    <DropdownButton
                      variant="secondary"
                      id="dropdown-basic"
                      title={materialToString(formData.material)}
                      className="drop-btn"
                    >
                      <Dropdown.Item
                        as="button"
                        onClick={(e) => onSetMaterial(e, 1, "wood")}
                      >
                        Wood
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="button"
                        onClick={(e) => onSetMaterial(e, 1, "brick")}
                      >
                        Brick
                      </Dropdown.Item>
                    </DropdownButton>
                  </Dropdown>
                  {/* </td>
                    <td> */}
                  <Dropdown>
                    <DropdownButton
                      variant="secondary"
                      id="dropdown-basic"
                      title={styleToString(formData.archTitle)}
                      className="drop-btn"
                    >
                      <Dropdown.Item
                        // as="button"
                        onClick={(e) => onSetStyle(e, 1, "baroque")}
                      >
                        Baroque
                      </Dropdown.Item>
                      <Dropdown.Item
                        // as="button"
                        onClick={(e) => onSetStyle(e, 2, "eclecticism")}
                      >
                        Eclecticism
                      </Dropdown.Item>
                      <Dropdown.Item
                        // as="button"
                        onClick={(e) => onSetStyle(e, 3, "moorish")}
                      >
                        Moorish
                      </Dropdown.Item>
                      <Dropdown.Item
                        // as="button"
                        onClick={(e) => onSetStyle(e, 4, "gothic revival")}
                      >
                        Gothic Revival
                      </Dropdown.Item>
                    </DropdownButton>
                  </Dropdown>

                  <div>
                    <strong>Description:</strong>
                    <div class="form-group form-info">
                      <textarea
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        value={formData.description}
                        onChange={(e) => onChangeFormData(e, "description")}
                      ></textarea>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="form-info">
                  {constructionField.type && (
                    <p>
                      <strong>{`Type:`}</strong>{" "}
                      {typeToString(constructionField.type)}
                    </p>
                  )}
                  {constructionField.status && (
                    <p>
                      <strong>{`Status:`}</strong>{" "}
                      {statusToString(constructionField.status)}
                    </p>
                  )}
                  {constructionField.buildDate && (
                    <p>
                      <strong>{`BuildDate: `}</strong>{" "}
                      {constructionField.buildDate}
                    </p>
                  )}
                  {constructionField.lossDate && (
                    <p>
                      <strong>{`LossDate: `}</strong>{" "}
                      {constructionField.lossDate}
                    </p>
                  )}
                  {constructionField.lossCause && (
                    <p>
                      <strong>{`Loss cause: `}</strong>{" "}
                      {constructionField.lossCause}
                    </p>
                  )}
                  {constructionField.material && (
                    <p>
                      <strong>{`Material: `}</strong>{" "}
                      {materialToString(constructionField.material)}
                    </p>
                  )}
                  {/* {construction.location && ( */}
                  {constructionField.article && (
                    <p>
                      <strong>{`Article: `}</strong>{" "}
                      <a href={constructionField.article} target="_blank">
                        link
                      </a>
                    </p>
                  )}
                  {constructionField.architecturalStyle && (
                    <p>
                      <strong>{`Architectural style: `}</strong>
                      {styleToString(constructionField.architecturalStyle)}
                    </p>
                  )}
                  {constructionField.latitude && (
                    <p>
                      <strong>{`Location: `}</strong>{" "}
                      {constructionField.latitude},{" "}
                      {constructionField.longitude}
                    </p>
                  )}
                  {constructionField.address && (
                    <p>
                      <strong>{`Address: `}</strong> {constructionField.address}
                    </p>
                  )}
                  {constructionField.description && (
                    <p>
                      <strong>{`Description: `}</strong>{" "}
                      {constructionField.description}
                    </p>
                  )}
                </div>
              )}
              <div style={manageForm}>
                {!isSwitchOn && (
                  <button
                    type="button"
                    class="btn btn-secondary"
                    onClick={() => handleBackOnClick()}
                    style={userButton}
                  >
                    Back
                  </button>
                )}
                <button
                  type="button"
                  class="btn btn-secondary"
                  onClick={() => handleSwitchView()}
                  style={userButton}
                >
                  {isSwitchOn ? "Close" : "Edit object"}
                </button>
                {!isSwitchOn && (
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => handleDeleteOnClick(constructionField.id)}
                    style={userButton}
                  >
                    Delete object
                  </button>
                )}

                {isSwitchOn && (
                  <button
                    type="submit"
                    class="btn btn-secondary"
                    style={userButton}
                  >
                    Apply changes
                  </button>
                )}
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ManageConstruction;
