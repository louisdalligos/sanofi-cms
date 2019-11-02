import React from "react";
import { useField } from "formik";
import { Select } from "antd";
const { Option } = Select;

const SelectTagsFormField = ({ label, placeholder, options, ...props }) => {
  const [field, meta] = useField(props);
  const name = field.name;

  const handleSelectChange = value => {
    console.log(value);
    props.onChange(name, value);
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
      <Select
        {...field}
        {...props}
        mode="multiple"
        placeholder={placeholder}
        onChange={handleSelectChange}
        notFoundContent="No results found"
      >
        {options.map(c => (
          <Option key={c.id} value={c.name}>
            {c.name}
          </Option>
        ))}
      </Select>

      {meta.touched && meta.error ? (
        <div className="ant-form-explain">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default SelectTagsFormField;
