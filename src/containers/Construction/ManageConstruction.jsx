import React, { useEffect, useState, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getConstruction } from "../../actions/construction";
import { ConstructionService } from "../../services";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { required } from "../../helpers/validation";
import { imagesPath } from "../../constants/construction";
import "../../index.css";
import {
  materialToString,
  styleToString,
  typeToString,
  statusToString,
} from "../../constants/construction";
import ConstructionInfo from "./ConstructionInfo";
import { GetImageConstruction } from "../../constants/api.url";
import moment from "moment";

const ManageConstruction = (props) => {
  let location = useLocation();
  const dispatch = useDispatch();
  
  const form = useRef();
  const checkBtn = useRef();

  const [message, setMessage] = useState("");
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isImageSwitchOn, setIsImageSwitchOn] = useState(false);

  const { construction: constructionField, isLoading } = useSelector(
    (state) => state.construction
  );
  // const [image, setImage] = useState();

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
        images: constructionField.images,
      });
    }
  }, [isLoading, setFormData, constructionField]);

  const handleSwitchView = async () => {
    setIsSwitchOn(!isSwitchOn);
    dispatch(getConstruction(location.state.id));
  };

  const handleSwitchToImages = () => {
    setIsImageSwitchOn(isImageSwitchOn);
  };

  const onChangeFormData = (e, fieldName) => {
    const data = e.target.value;
    setFormData((construction) => ({ ...construction, [fieldName]: data }));
  };
  // const [images, setImages] = useState(`https://localhost:5001/getimageconstruction${constructionField.images[0].name}`);
  const handleApplyChanges = async (e) => {
    e.preventDefault();
    await ConstructionService.updateConstruction(formData);
    dispatch(getConstruction(constructionField.id));
  };

  const handleDeleteOnClick = async (id) => {
    await ConstructionService.deleteConstruction(id);
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

  const [formatBuildDate, formatLossDate] = useMemo(() => {
    return [
      moment(constructionField?.buildDate?.value).format("MM.D.YYYY"),
      moment(constructionField?.lossDate?.value).format("MM.D.YYYY"),
    ];
  }, [constructionField]);

  useEffect(() => {
    dispatch(getConstruction(location.state.id));
    // setImage(`https://localhost:5001/getimageconstruction/${constructionField.images[0].name}`);
  }, [
    // setImage, constructionField.images,
    location.state.id,
    dispatch,
  ]);

  if (isLoading) return <div>Loading</div>;

  // let imgPreview;
  // if (constructionField.images[0]) {
  //   imgPreview = (
  //     <img
  //       src={GetImageConstruction + `${constructionField.images[0].name}`}
  //       alt=""
  //     />
  //   );
  // }

  console.log("checkimagesw", isImageSwitchOn);

  return (
    <div className="outer">
      <div className="inner">
        <Form onSubmit={handleApplyChanges} ref={form}>
          <div className="container">
            <h3>{constructionField.name}</h3>
            <div className="info info-text">
              {isSwitchOn ? (
                <div className="fields">
                  <ul>
                    <li>
                      <div className="pStyle">
                        <strong>Name:</strong>
                        <div className="form-group">
                          <Input
                            type="text"
                            className="form-control formStyle"
                            name="text"
                            value={formData.name}
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
                    </li>

                    <li>
                      <div className="pStyle">
                        <strong>Address:</strong>
                        <div className="form-group">
                          <Input
                            type="text"
                            className="form-control formStyle"
                            name="text"
                            value={formData.address}
                            onChange={(e) => onChangeFormData(e, "address")}
                          />
                        </div>
                      </div>
                    </li>

                    <li>
                      <div className="pStyle">
                        <strong>Location:</strong>
                        <div className="form-group">
                          <Input
                            type="text"
                            className="form-control formStyle"
                            name="text"
                            value={formData.location}
                            onChange={(e) => onChangeFormData(e, "location")}
                          />
                        </div>
                      </div>
                    </li>

                    <li>
                      <div className="pStyle">
                        <strong>Article:</strong>
                        <div className="form-group">
                          <Input
                            type="text"
                            className="form-control formStyle"
                            name="text"
                            value={formData.article}
                            onChange={(e) => onChangeFormData(e, "article")}
                          />
                        </div>
                      </div>
                    </li>

                    <li>
                      <div className="pStyle">
                        <strong>Build date:</strong>
                        <div className="form-group">
                          <Input
                            type="date"
                            className="form-control formStyle"
                            name="text"
                            value={formData.buildDate}
                            onChange={(e) => onChangeFormData(e, "buildDate")}
                          />
                        </div>
                      </div>
                    </li>

                    <li>
                      <div className="pStyle">
                        <strong>Lost date:</strong>
                        <div className="form-group">
                          <Input
                            type="date"
                            className="form-control formStyle"
                            name="text"
                            value={formData.lossDate}
                            onChange={(e) => onChangeFormData(e, "lossDate")}
                          />
                        </div>
                      </div>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Dropdown>
                        <DropdownButton
                          variant="secondary"
                          id="dropdown-basic"
                          title={"Type: " + typeToString(formData.type)}
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
                    </li>
                    <li>
                      <Dropdown>
                        <DropdownButton
                          variant="secondary"
                          id="dropdown-basic"
                          title={"Status: " + statusToString(formData.status)}
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
                    </li>
                    <li>
                      <Dropdown>
                        <DropdownButton
                          variant="secondary"
                          id="dropdown-basic"
                          title={
                            "Material: " + materialToString(formData.material)
                          }
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
                    </li>
                    <li>
                      <Dropdown>
                        <DropdownButton
                          variant="secondary"
                          id="dropdown-basic"
                          title={
                            "Architectural style: " +
                            styleToString(formData.archTitle)
                          }
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
                    </li>
                  </ul>
                  <div>
                    <strong>Description:</strong>
                    <div className="form-group form-info">
                      <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        value={formData.description}
                        onChange={(e) => onChangeFormData(e, "description")}
                      ></textarea>
                    </div>
                  </div>
                </div>
              ) : (
                <ConstructionInfo
                  // imgPreview={imgPreview}
                  formatBuildDate={formatBuildDate}
                  formatLossDate={formatLossDate}
                  constructionField={constructionField}
                  typeToString={typeToString}
                  statusToString={statusToString}
                  materialToString={materialToString}
                  styleToString={styleToString}
                />
              )}
              {isImageSwitchOn && (
                <div>
                  <h3>Images</h3>
                </div>
              )}
              <div className="manageForm">
                {!isSwitchOn && (
                  <button
                    type="button"
                    className="btn btn-secondary userButton"
                    onClick={() => handleBackOnClick()}
                  >
                    Back
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-secondary userButton"
                  onClick={() => handleSwitchView()}
                >
                  {isSwitchOn ? "Close" : "Edit object"}
                </button>
                {!isSwitchOn && (
                  <button
                    type="button"
                    className="btn btn-danger userButton"
                    onClick={() => handleDeleteOnClick(constructionField.id)}
                  >
                    Delete object
                  </button>
                )}

                {isSwitchOn && (
                  <button
                    type="button"
                    className="btn btn-secondary userButton"
                    onClick={() => handleSwitchToImages()}
                  >
                    Images
                  </button>
                )}

                {isSwitchOn && (
                  <button
                    type="submit"
                    className="btn btn-secondary userButton"
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
