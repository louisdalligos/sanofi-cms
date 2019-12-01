import React from "react";
import { useField } from "formik";
import { Select } from "antd";
const { Option } = Select;

const SelectTagsFormField = ({ label, placeholder, options, ...props }) => {
  const [field, meta] = useField(props);

  const handleSelectChange = value => {
    props.onChange(field.name, value);
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
        mode="multiple"
        placeholder={placeholder}
        onChange={handleSelectChange}
        onBlur={handleSelectBlur}
        notFoundContent="No results found"
      >
        {options
          ? options.map(c => (
              <Option key={c.id} value={c.id} label={c.title}>
                {c.title}
              </Option>
            ))
          : null}
      </Select>

      {meta.touched && meta.error ? (
        <div className="ant-form-explain">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default SelectTagsFormField;
