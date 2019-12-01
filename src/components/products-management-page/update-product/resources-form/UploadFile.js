import React, { Fragment, useState, useEffect } from "react";
import { Upload, Icon, message, Button } from "antd";

import { useField, useFormikContext } from "formik";

// import axios from "axios";
// import { API } from "../../../utils/api";

const UploadFile = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);
  const [uploadedFileList, setUploadedFileList] = useState([]);

  useEffect(() => {
    console.log("in effect", uploadedFileList);
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
    setFieldValue("other_resources", file);
    //setFieldValue("other_resources", "1");
    //props.getFile(file);
  };

  return (
    <Fragment>
      <div
        className={
          meta.touched && meta.error
            ? `has-feedback has-error ant-form-item-control`
            : `ant-form-item-control`
        }
      >
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

        {meta.touched && meta.error ? (
          <div className="ant-form-explain">{meta.error}</div>
        ) : null}
      </div>
    </Fragment>
  );
};

export default UploadFile;
