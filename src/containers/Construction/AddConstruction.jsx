import React, { useState, useRef } from "react";
import { ConstructionService } from "../../services";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { required, validCoordinates } from "../../helpers/validation";
import CheckButton from "react-validation/build/button";

const info = {
  textAlign: "left",
};

const formStyle = {
  width: "100%",
  marginRight: 40,
};

const pStyle = {
  display: "flex",
  justifyContent: "space-between",
};

const AddConstruction = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  const [type, setType] = useState("Type");
  const [status, setStatus] = useState("Status");
  const [material, setMaterial] = useState("Material");
  const [archTitle, setArchTitle] = useState("Architectural style");

  const [validated, setValidated] = useState(false);

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

  // const handleValidation = (event) => {
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }

  //   setValidated(true);
  // };

  const handleAddConstruction = async (event) => {
    event.preventDefault();
    setSuccessful(false);
    form.current.validateAll();

    // const form = event.currentTarget;
    // if (form.checkValidity() === false)
    if (checkBtn.current.context._errors.length === 0) {
      // event.preventDefault();
      // event.stopPropagation();
      setSuccessful(true);
      await ConstructionService.createConstruction(formData);
      props.history.push("/construction");
    }
    // setValidated(true);
    else {
      setSuccessful(false);
    }
    // await ConstructionService.createConstruction(formData);
    // props.history.push("/construction");
  };

  return (
    <div className="outer">
      <div className="inner">
        <Form
          // onSubmin={handleAddConstruction}
          ref={form}
        >
          {!successful && <h3>Construction</h3>}
          {!successful ? (
            <div>
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
                      <div className="form-group">
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
                      <div className="form-group">
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
                      <div className="form-group">
                        <Input
                          type="text"
                          className="form-control"
                          name="text"
                          style={formStyle}
                          onChange={(e) => onChangeFormData(e, "location")}
                          validations={[validCoordinates]}
                        />
                      </div>
                    </div>

                    <div style={pStyle}>
                      <strong>Article:</strong>
                      <div className="form-group">
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
                      <div className="form-group">
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
                      <div className="form-group">
                        <Input
                          type="date"
                          className="form-control"
                          name="text"
                          style={formStyle}
                          onChange={(e) => onChangeFormData(e, "lossDate")}
                        />
                      </div>
                    </div>

                    <div>
                      <strong>Description:</strong>
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                          onChange={(e) => onChangeFormData(e, "description")}
                        ></textarea>
                      </div>
                    </div>
                    <Dropdown>
                      <DropdownButton
                        variant="secondary"
                        id="dropdown-basic"
                        title={type}
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
                    <Dropdown>
                      <DropdownButton
                        variant="secondary"
                        id="dropdown-basic"
                        title={status}
                        className="drop-btn"
                      >
                        <Dropdown.Item
                          as="button"
                          onClick={(e) => onSetStatus(e, 1, "active")}
                        >
                          Active
                        </Dropdown.Item>
                        <Dropdown.Item
                          as="button"
                          onClick={(e) => onSetStatus(e, 2, "abandoned")}
                        >
                          Abandoned
                        </Dropdown.Item>
                        <Dropdown.Item
                          as="button"
                          onClick={(e) => onSetStatus(e, 3, "destroyed")}
                        >
                          Destroyed
                        </Dropdown.Item>
                      </DropdownButton>
                    </Dropdown>
                    <Dropdown>
                      <DropdownButton
                        variant="secondary"
                        id="dropdown-basic"
                        title={material}
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
                    <Dropdown>
                      <DropdownButton
                        variant="secondary"
                        id="dropdown-basic"
                        title={archTitle}
                        className="drop-btn"
                      >
                        <Dropdown.Item
                          onClick={(e) => onSetStyle(e, 1, "baroque")}
                        >
                          Baroque
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={(e) => onSetStyle(e, 2, "eclecticism")}
                        >
                          Eclecticism
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={(e) => onSetStyle(e, 3, "moorish")}
                        >
                          Moorish
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={(e) => onSetStyle(e, 4, "gothic revival")}
                        >
                          Gothic Revival
                        </Dropdown.Item>
                      </DropdownButton>
                    </Dropdown>
                    <div className="form-group">
                      <button
                        className="btn btn-dark btn-lg btn-block"
                        onClick={handleAddConstruction}
                      >
                        Add construction
                      </button>
                    </div>
                    {/* {message && (
                      <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                          {message}
                        </div>
                      </div>
                    )} */}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h2>Construction added successfully</h2>
            </div>
          )}
          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default AddConstruction;
