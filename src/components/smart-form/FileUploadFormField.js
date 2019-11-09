import React from "react";
import { useField } from "formik";
import { Upload, Icon, message, Button } from "antd";

const FileUploadFormField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const name = field.name;

  const handleChange = info => {
    console.log(info);
    props.onChange(name, info.file);
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <div
      className={
        meta.touched && meta.error
          ? "has-feedback has-error ant-form-item-control"
          : "ant-form-item-control"
      }
    >
      <label className={props.isRequired ? "ant-form-item-required" : null}>
        {label}
      </label>

      <Upload
        name={name}
        showUploadList={true}
        onChange={handleChange}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76" // this should be an api call on the backend
      >
        <Button type="primary">
          <Icon type="upload" /> Upload
        </Button>
      </Upload>

      {/* <input
                id="file"
                name={name}
                type="file"
                onChange={event => {
                    handleChange(event.currentTarget.files[0]);
                }}
            /> */}

      {meta.touched && meta.error ? (
        <div className="ant-form-explain">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default FileUploadFormField;
