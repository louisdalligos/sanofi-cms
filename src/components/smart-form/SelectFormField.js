import React from "react";
import { useField } from "formik";

const SelectFormField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div
      className={
        meta.touched && meta.error
          ? "has-feedback has-error ant-form-item-control"
          : "ant-form-item-control"
      }
    >
      <label>
        {label}
        <select className="ant-input" {...field} {...props} />
      </label>
      {meta.touched && meta.error ? (
        <div className="ant-form-explain">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default SelectFormField;
