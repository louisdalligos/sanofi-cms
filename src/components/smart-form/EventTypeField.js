import React from "react";
import { useField } from "formik";
import { Select } from "antd";
const { Option } = Select;

const SelectFormField = ({
  label,
  placeholder,
  options,
  disabled,
  ...props
}) => {
  const [field, meta] = useField(props);
  const name = field.name;

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
        notFoundContent="No results found"
        disabled={disabled ? disabled : false}
      >
        {options
          ? options.map(c => (
              <Option key={c.id} value={c.id} label={c.name}>
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
