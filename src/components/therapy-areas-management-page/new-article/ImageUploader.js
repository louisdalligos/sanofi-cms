import React, { Fragment, useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Upload, Icon, message, Button, Alert } from "antd";
import axios from "axios";
import { API } from "../../../utils/api";

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

const ImageUploader = ({ auth, ...props }) => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [featuredImage, setFeaturedmage] = useState("");
  const [showThumbnails, setShowThumbnails] = useState(false);

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

  const handleUpload = () => {
    const formData = new FormData();

    fileList.forEach(file => {
      console.log("File uploaded", file);
      formData.append("image", file);
    });

    setUploading(true);

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

        // resize our file
        const file = fileList[0];

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
          <h3>Preview:</h3>
          <small style={{ marginBottom: 20, display: "block" }}>
            Images are optimized and cropped automatically
          </small>

          <h4>Masthead</h4>
          <img alt="" style={{ width: "300px" }} src={featuredImage} />

          <h4>Featured</h4>
          <img alt="" style={{ width: "200px" }} src={featuredImage} />

          <h4>Thumbnail</h4>
          <img alt="" style={{ width: "180px" }} src={featuredImage} />
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
