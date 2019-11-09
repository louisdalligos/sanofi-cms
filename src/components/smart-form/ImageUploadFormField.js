import React, { useEffect } from "react";
import { useField } from "formik";
import { Upload, Icon, message, Button } from "antd";

const ImageUploadFormField = ({ label, apiCallAction, ...props }) => {
  const [field, meta] = useField(props);
  const name = field.name;

  useEffect(() => {
    console.log(apiCallAction);
    return () => {};
  }, []);

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = file => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
      return;
    }
    const isLt100M = file.size / 1024 / 1024 < 100;
    if (!isLt100M) {
      message.error("Image must smaller than 100MB!");
      return;
    }
    return isJpgOrPng && isLt100M;
  };

  const handleChange = info => {
    console.log(info);
    switch (info.file.status) {
      case "uploading":
        console.log("before upload");
        break;
      case "error":
        message.error(`${info.file.name} file upload failed.`);
        break;
      case "done":
        getBase64(info.file.originFileObj, image => {
          props.onChange(name, image);
        });
        message.success(`${info.file.name} file uploaded successfully`);
        break;
      default:
        return;
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
        action={apiCallAction}
        beforeUpload={beforeUpload}
        showUploadList={true}
        onChange={handleChange}
      >
        <Button type="primary">
          <Icon type="upload" /> Upload
        </Button>
      </Upload>

      {meta.touched && meta.error ? (
        <div className="ant-form-explain">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default ImageUploadFormField;
