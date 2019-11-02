import React from "react";
import { FieldProps, getIn } from "formik";

const TextFormField = ({ field, form, ...props }) => {
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);

  return (
    <div
      className={
        form.errors.short_details && form.touched.short_details
          ? "has-feedback has-error ant-form-item-control"
          : "ant-form-item-control"
      }
    >
      <label>Label</label>
      <input className="ant-input" {...field} {...props} />
      {form.errors.short_details && form.touched.short_details ? (
        <div className="ant-form-explain">{errorText}</div>
      ) : null}
    </div>
  );
};

export default TextFormField;
