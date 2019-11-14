import React from "react";
import { useField } from "formik";
import MaskedInput from "antd-mask-input";

const ZincCodeFormField = ({ label, placeholder, className, ...props }) => {
  const [field, meta] = useField(props);

  const handleChange = e => {
    let val = e.currentTarget.value;
    props.onChange(field.name, val);
  };

  return (
    <div
      className={
        meta.touched && meta.error
          ? `${className} has-feedback has-error ant-form-item-control`
          : `${className} ant-form-item-control`
      }
    >
      <label className={props.isRequired ? "ant-form-item-required" : null}>
        {label}
        {/* <input
                    {...field}
                    {...props}
                    onChange={handleChange}
                    className={"ant-input"}
                    placeholder={placeholder}
                /> */}

        <MaskedInput
          {...field}
          {...props}
          mask="AAAA.###.**.**.** | Version *.* | 11 ### 1111"
          onChange={handleChange}
        />
      </label>
      {meta.touched && meta.error ? (
        <div className="ant-form-explain">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default ZincCodeFormField;
