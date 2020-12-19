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
// import { ConstructionService } from "../../services/";
import { required } from "./Validation";
import CheckButton from "react-validation/build/button";

const container = {
  marginTop: 100,
};

const info = {
  textAlign: "left",
  // marginLeft: 350,
  // marginTop: 20,
};

const formStyle = {
  // display: "flex",
  width: "100%",
  // marginLeft: 10
  marginRight: 40,
  // marginTop: 'auto'
};

const pStyle = {
  display: "flex",
  justifyContent: "space-between",
};

const applyStyle = {
  // marginLeft: "100"
  margin: "auto",
};

const editStyle = {
  margin: "auto",
};

const buttons = {
  display: "flex",
  justifyContent: "space-between",
};

const AddConstruction = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const [message, setMessage] = useState("");

  const [type, setType] = useState("Type");
  const [status, setStatus] = useState("Status");
  const [material, setMaterial] = useState("Material");
  const [archTitle, setArchTitle] = useState("Architectural style");

  // const onSetArch = (text) => {
  //   setArchTitle({text});
  // };

  // const dispatch = useDispatch();
  // const { construction: constructionField, isLoading } = useSelector(
  //   (state) => state.construction
  // );

  const [formData, setFormData] = useState(null);

  // useEffect(() => {
  //   setFormData({});
  // }, [setFormData]);

  const onChangeFormData = (e, fieldName) => {
    const data = e.target.value;
    setFormData((construction) => ({ ...construction, [fieldName]: data }));
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

  const handleAddConstruction = async (e) => {
    e.preventDefault();
    await ConstructionService.createConstruction(formData);
    props.history.push("/construction");
  };

  return (
    <div className="outer">
      <div className="inner">
        <Form
          // onSubmin={handleAddConstruction}
          ref={form}
        >
          <h3>Construction</h3>
          <div className="info" style={info}>
            <div>
              {/* <ImageUploader
                withIcon={true}
                buttonText="Choose images"
                onChange={onChangeImage}
                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                maxFileSize={5242880}
                withPreview={true}
                fileSizeError=" file size is too big"
                singleImage={true}
              /> */}

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
                      name="name"
                      style={formStyle}
                      validations={[required]}
                      onChange={(e) => onChangeFormData(e, "name")}
                    />
                  </div>
                </div>

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

                {/* <table>
                  <tr>
                    <td> */}
                <Dropdown>
                  <DropdownButton
                    variant="secondary"
                    id="dropdown-basic"
                    title={type}
                    // className="dropBtn"
                    //   style={userButton}
                  >
                    <Dropdown.Item
                      as="button"
                      onClick={(e) => onSetType(e, 1, "sacral")}
                    >
                      Sacral
                    </Dropdown.Item>
                  </DropdownButton>
                </Dropdown>
                {/* </td>
                    <td> */}
                <Dropdown>
                  <DropdownButton
                    variant="secondary"
                    id="dropdown-basic"
                    title={status}
                    // className="dropBtn"
                    //   style={userButton}
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
                    title={material}
                    // className="dropBtn"
                    //   style={userButton}
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
                    title={archTitle}
                    // className="dropBtn"
                    //   style={userButton}
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
                {/* </td>
                  </tr>
                </table> */}

                <div className="form-group">
                  <button
                    className="btn btn-dark btn-lg btn-block"
                    // type="submit"
                    onClick={handleAddConstruction}
                  >
                    Add construction
                  </button>
                </div>
                {message && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                      {message}
                    </div>
                  </div>
                )}
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddConstruction;
