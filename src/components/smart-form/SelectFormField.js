import React from "react";
import { useField } from "formik";
import { Select } from "antd";
const { Option } = Select;

const SelectFormField = ({ label, placeholder, options, ...props }) => {
  const [field, meta] = useField(props);
  const name = field.name;

  const handleSelectChange = value => {
    props.onChange(name, value);
    console.log(value);
  };

  const handleSelectBlur = value => {
    console.log(value);
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
        className={
          props.requiredlabel === "true" ? "ant-form-item-required" : null
        }
      >
        {label}
      </label>
      <Select
        {...field}
        {...props}
        onChange={handleSelectChange}
        onBlur={handleSelectBlur}
        notFoundContent="No results found"
        placeholder="Select a category"
      >
        {options
          ? options.map(c => (
              <Option key={c.id} value={c.id}>
                {c.name}
              </Option>
            ))
          : []}
      </Select>

      {meta.touched && meta.error ? (
        <div className="ant-form-explain">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default SelectFormField;
