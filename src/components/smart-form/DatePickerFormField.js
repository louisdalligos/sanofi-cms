import React from "react";
import { useField } from "formik";
import { DatePicker, Icon, message, Button } from "antd";

const DatePickerFormField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const name = field.name;

  const handleChange = (date, dateString) => {
    console.log(date, dateString);
    //props.onChange(name, info.file);
  };

  return (
    <div
      className={
        meta.touched && meta.error
          ? "has-feedback has-error ant-form-item-control"
          : "ant-form-item-control"
      }
    >
      <label
        style={{ display: "block" }}
        className={
          props.requiredlabel === "true" ? "ant-form-item-required" : null
        }
      >
        {label}
      </label>

      <DatePicker onChange={handleChange} />

      {meta.touched && meta.error ? (
        <div className="ant-form-explain">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default DatePickerFormField;
