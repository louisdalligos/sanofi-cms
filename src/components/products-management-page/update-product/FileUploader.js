import React, { Fragment, useState, useEffect } from "react";
import { Upload, Icon, message, Button } from "antd";
import { Link } from "react-router-dom";

import axios from "axios";
import { API } from "../../../utils/api";

const FileUploader = ({
  auth,
  getImage,
  productId,
  updateAction,
  prescriptionInfoData,
  ...props
}) => {
  const [uploadedFileList, setUploadedFileList] = useState(
    prescriptionInfoData ? prescriptionInfoData : []
  );

  useEffect(() => {
    console.log(prescriptionInfoData, "prescription info data");
  }, []);

  useEffect(() => {
    console.log("in effect", uploadedFileList);
    console.log(auth);
    console.log(props.match);
  }, [uploadedFileList, setUploadedFileList]);

  const handleRemove = file => {
    console.log(file);
    const index = uploadedFileList.indexOf(file);
    const newFileList = uploadedFileList.slice();
    newFileList.splice(index, 1);
    setUploadedFileList(newFileList);
  };

  const handleBeforeUpload = file => {
    console.log(file, "BEFORE UPLOAD");
    setUploadedFileList([...uploadedFileList, file]);
    console.log(uploadedFileList, "UPDATED AFTER UPLOAD");
    return false;
  };

  const handleChange = ({ file, fileList }) => {
    console.log(file, "on change");
  };

  const handleUpload = () => {
    console.log(uploadedFileList, "UPLOADED LIST");
    const formData = new FormData();

    uploadedFileList.forEach(file => {
      console.log("File uploaded", file);
      formData.append("prescription_files", file);
    });

    formData.append("_method", "PUT");

    axios({
      url: `${API}/products/update/${productId}`,
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.access_token}`
      },
      data: formData
    })
      .then(res => {
        console.log(res);
        message.success(
          res.data.success ? res.data.success : "Updated product successfully"
        );
        props.enableClinicalTrialsTab(false);
      })
      .catch(err => {
        console.log(err.response.data);
        message.error(
          err.response.data.error
            ? err.response.data.error
            : "There was an error on processing your request"
        );
      });
  };

  return (
    <Fragment>
      <Upload
        onRemove={handleRemove}
        beforeUpload={handleBeforeUpload}
        onChange={handleChange}
        fileList={uploadedFileList}
        accept="application/pdf"
      >
        <Button disabled={uploadedFileList.length > 2}>
          <Icon type="upload" /> Select File
        </Button>
      </Upload>

      <div className="form-actions">
        <Button style={{ marginRight: 10 }}>
          <Link to="/products">Cancel</Link>
        </Button>
        <Button type="primary" onClick={handleUpload}>
          Save
        </Button>
      </div>
    </Fragment>
  );
};

export default FileUploader;
