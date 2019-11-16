import React from "react";
import { useField } from "formik";

const TextFormField = ({ label, placeholder, className, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div
      className={
        meta.touched && meta.error
          ? `${className} has-feedback has-error ant-form-item-control`
          : `${className} ant-form-item-control`
      }
    >
      <label className={props.required ? "ant-form-item-required" : null}>
        {label}
        <input
          {...field}
          {...props}
          className={"ant-input"}
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
