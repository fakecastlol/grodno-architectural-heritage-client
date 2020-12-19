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
import { required } from "./Validation";
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

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (!isLoading) {
      setFormData({
        id: constructionField.id,
        name: constructionField.name,
        address: constructionField.address,
        article: constructionField.article,
        location: constructionField.location,
        buildDate: constructionField.buildDate,
        lossDate: constructionField.lossDate,
        type: constructionField.type,
        status: constructionField.status,
        material: constructionField.material,
        architecturalStyle: constructionField.architecturalStyle,
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
                        value={constructionField.name}
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
                        value={constructionField.address}
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
                        value={constructionField.coordinates}
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
                        value={constructionField.article}
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
                        onChange={(e) => onChangeFormData(e, "lossDate")}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
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
                      <strong>{`Article: `}</strong> {constructionField.article}
                    </p>
                  )}
                  {constructionField.architecturalStyle && (
                    <p>
                      <strong>{`Architectural style: `}</strong>
                      {styleToString(constructionField.architecturalStyle)}
                    </p>
                  )}
                  {constructionField.location && (
                    <p>
                      <strong>{`Location: `}</strong>{" "}
                      {constructionField.location}
                    </p>
                  )}
                  {constructionField.address && (
                    <p>
                      <strong>{`Address: `}</strong> {constructionField.address}
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
