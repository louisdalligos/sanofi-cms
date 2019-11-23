import React, { Fragment, useState, useEffect } from "react";
import { Upload, Icon, message, Button } from "antd";

const FileUploader = ({
  auth,
  getImage,
  productId,
  updateAction,
  ...props
}) => {
  const [uploadedFileList, setUploadedFileList] = useState([]);

  useEffect(() => {
    console.log("in effect", uploadedFileList);
    console.log(auth);
    console.log(props.match);
  }, [uploadedFileList, setUploadedFileList]);

  const handleRemove = file => {
    console.log(file);
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

    console.log(productId, formData);

    updateAction(productId, formData);
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
        <Button type="primary" onClick={handleUpload}>
          Save Draft
        </Button>
      </div>
    </Fragment>
  );
};

export default FileUploader;
