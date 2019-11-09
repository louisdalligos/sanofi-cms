import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Upload, Icon, message, Button } from "antd";
import axios from "axios";
import { API } from "../../../utils/api";

const ImageUploader = ({ auth, ...props }) => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

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
      .then(res => {
        console.log(res.data);
        //setFileList([]);
        console.log(fileList);
        setUploading(false);
        message.success("upload successfully.");
      })
      .catch(err => {
        setUploading(false);
        message.error(err.response.data.error);
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
      console.log(file);
      console.log(auth.access_token);
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
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? "Generating thumbnails" : "Generate thumbnails"}
      </Button>
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
