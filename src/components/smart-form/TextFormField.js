import React from "react";
import { useField } from "formik";

const TextFormField = ({ label, placeholder, ...props }) => {
  const [field, meta] = useField(props);
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
        <input
          {...field}
          {...props}
          className="ant-input"
          placeholder={placeholder}
        />
      </label>
      {meta.touched && meta.error ? (
        <div className="ant-form-explain">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default TextFormField;
