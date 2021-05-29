import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getConstruction } from "../../actions/construction";
import Form from "react-validation/build/form";
import axios from "axios";
import API_URL from "../../constants/api.url";
import authHeader from "../../helpers/auth-header";
import './Construction.css'

const AddConstructionImage = (props) => {
  const [image, setImage] = useState();
  const [preview, setPreview] = useState(image);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  let location = useLocation();

  const form = useRef();
  const checkBtn = useRef();

  const { construction: constructionField, isLoading } = useSelector(
    (state) => state.construction
  );
  useEffect(() => {
    const kek = dispatch(getConstruction(location.state.id));
    console.log("kek", kek);
  }, [location.state.id, dispatch]);

  const uploadImage = (files) => {
    const formData = new FormData();
    try {
      formData.append("File", files);
      formData.append("ConstructionId", constructionField.id);
      axios.post(API_URL + "addimage", formData, {
        headers: {
          ...authHeader(),
          "Content-Type": "multipart/form-data",
          type: "formData",
        },
      });
    } catch (e) {
      console.erorr(e);
    }
  };

  const handleBackOnClick = () => {
    props.history.push("/construction");
  };

  const handleApplyChanges = (e) => {
    e.preventDefault();
    setLoading(true);
    form.current.validateAll();
    // if (checkBtn.current.context._errors.length === 0) {
    setLoading(false);
    uploadImage(image);
    // } else {
    setLoading(true);
    // }
  };

  const onSavePreviewImage = (picture) => {
    setImage(picture.target.files[0]);
    setPreview(URL.createObjectURL(picture.target.files[0]));
  };

  let imgPreview;
  if (preview) {
    imgPreview = <img src={preview || ""} alt="" />;
  }

  return (
    <div className="outer">
      <div className="inner profile-form">
        <Form onSubmit={handleApplyChanges} ref={form}>
          <h3>{constructionField?.name}</h3>

          <div className="info info-form">
            <div>
              <form>
                <div className="form-group preview">{imgPreview}</div>

                <div className="form-group">
                  <input type="file" onChange={onSavePreviewImage} />
                </div>
              </form>
            </div>
            <div className="action-button">
              <button
                type="button"
                className="btn btn-secondary userButton"
                onClick={() => handleBackOnClick()}
              >
                Back
              </button>

              <button type="submit" class="btn btn-secondary applyStyle">
                {`Apply changes`}
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddConstructionImage;
