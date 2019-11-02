import React from "react";
import { useField } from "formik";
import { Select } from "antd";
const { Option } = Select;

const SelectFormField = ({ label, options, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div
      className={
        meta.touched && meta.error
          ? "has-feedback has-error ant-form-item-control"
          : "ant-form-item-control"
      }
    >
      <label>{label} </label>
      <select {...field} {...props}>
        {options
          ? options.map(c => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))
          : []}
      </select>

      {meta.touched && meta.error ? (
        <div className="ant-form-explain">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default SelectFormField;
