import React from "react";
import { useField, useFormikContext, Field } from "formik";
import { Select, Checkbox } from "antd";
const { Option } = Select;

const SelectTagsFormField = ({ label, placeholder, options, ...props }) => {
  const [field, meta] = useField(props);
  const { setFieldValue, values } = useFormikContext();

  const handleSelectChange = value => {
    props.onChange(field.name, value);
  };

  const handleSelectBlur = value => {
    console.log(value);
  };

  // on select all settings
  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
    console.log(field, meta);
    if (e.target.checked) {
      const ids = options.map(option => {
        return option.id;
      });

      console.log(ids);

      setFieldValue(field.name, ids); // update our formik props
      setFieldValue("tag_all", true);
    } else {
      setFieldValue(field.name, []);
      setFieldValue("tag_all", false);
    }
  }

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
        maxTagCount={5}
        maxTagTextLength={20}
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

      <Field as={Checkbox} name="tag_all" onChange={onChange}>
        Select all specializations
      </Field>
    </div>
  );
};

export default SelectTagsFormField;
