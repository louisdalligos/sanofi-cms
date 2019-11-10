import React, { Fragment, useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Upload, Icon, message, Button, Spin } from "antd";
import { useFormikContext } from "formik";

import axios from "axios";
import { API } from "../../../utils/api";

// library
import Resizer from "../../library/ImageResizer";

const description = [
  <ul style={{ marginTop: 20 }}>
    <li>
      <small>PNG/JPG</small>
    </li>
    <li>
      <small>Maximum file size of 25mb</small>
    </li>
    <li>
      <small>Minimum width of 940px and height of 400px</small>
    </li>
  </ul>
];

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const ImageUploader = ({ auth, ...props }) => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [featuredImage, setFeaturedmage] = useState("");
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [isSpinning, setIsSpinning] = useState(true);

  const { setFieldValue, values } = useFormikContext();

  useEffect(() => {
    //generateCanvas();
  }, []);

  const handleChange = info => {
    let list = [...info.fileList];
    console.log(list);
    console.log(fileList);
    // Only to show the recent uploaded file
    //list = fileList.slice(-1);
    //setFileList({ list });
  };

  // Set current value unto formik values - used to trigger isDirty boolean
  const setImageFormFieldStatus = (name, output) => {
    return setFieldValue(name, output);
  };

  // Handle clearing of images
  const handleClearImages = () => {
    console.log("clear");
    setImageFormFieldStatus("masthead", "");
    setImageFormFieldStatus("featured", "");
    setImageFormFieldStatus("thumbnail", "");
    setIsSpinning(false);
  };

  const handleUpload = () => {
    const formData = new FormData();

    fileList.forEach(file => {
      console.log("File uploaded", file);
      formData.append("image", file);
    });

    setUploading(true);
    setIsSpinning(true);

    axios({
      url: `${API}/gallery/check-image`,
      method: "post",
      headers: {
        Authorization: `Bearer ${auth.access_token}`
      },
      data: formData
    })
      .then(async res => {
        console.log(res);
        console.log("ORIGINAL FILE: ", fileList[0]);

        // set our file
        const file = fileList[0];

        // Generate masthead image
        Resizer.imageFileResizer(
          file,
          960,
          400,
          "JPEG",
          100,
          0,
          uri => {
            console.log(uri);
            setFeaturedmage(uri);
            setImageFormFieldStatus("masthead", uri); // set form value status
          },
          "base64"
        );

        // Generate featured image
        Resizer.imageFileResizer(
          file,
          300,
          300,
          "JPEG",
          100,
          0,
          uri => {
            console.log(uri);
            setFeaturedmage(uri);
            setImageFormFieldStatus("featured", uri); // set form value status
          },
          "base64"
        );

        // Generate thumbnail image
        Resizer.imageFileResizer(
          file,
          300,
          280,
          "JPEG",
          100,
          0,
          uri => {
            console.log(uri);
            setFeaturedmage(uri);
            setImageFormFieldStatus("thumbnail", uri); // set form value status
          },
          "base64"
        );

        setUploading(false);
        message.success("upload successfully.");
        setShowThumbnails(true);
      })
      .catch(err => {
        console.log(err);
        setUploading(false);
        message.error(
          err.response.data.error ? err.response.data.error : "Oops error"
        );
      });
  };

  const properties = {
    onRemove: file => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      return {
        fileList: newFileList
      };
    },
    beforeUpload: file => {
      setFileList([...fileList, file]);
      return false;
    },
    onChange: handleChange
  };

  return (
    <Fragment>
      <Upload {...properties} fileList={fileList}>
        <Button>
          <Icon type="upload" /> Select File
        </Button>
      </Upload>

      {description}

      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? "Generating thumbnails" : "Generate thumbnails"}
      </Button>

      {showThumbnails ? (
        <div id="preview">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Preview:</h3>
            <Button type="link" onClick={handleClearImages}>
              Clear images
            </Button>
          </div>
          <small style={{ marginBottom: 20, display: "block" }}>
            Images are optimized and cropped automatically
          </small>

          {values.masthead ? (
            <div>
              <h4>Masthead</h4>
              <img alt="" style={{ width: "300px" }} src={values.masthead} />
              <h4>Featured</h4>
              <img alt="" style={{ width: "200px" }} src={values.featured} />
              <h4>Thumbnail</h4>
              <img alt="" style={{ width: "180px" }} src={values.thumbnail} />
            </div>
          ) : (
            <Spin indicator={antIcon} spinning={isSpinning} />
          )}
        </div>
      ) : null}
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.authReducer
  };
};

export default connect(
  mapStateToProps,
  null
)(ImageUploader);
