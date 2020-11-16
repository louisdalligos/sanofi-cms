import React from "react";
import { useField } from "formik";
import MaskedInput from "antd-mask-input";

const ZincCodeFormField = ({
  placeholder,
  className,
  maskValidation,
  inlineLabel,
  ...props
}) => {
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
      <span style={{ lineHeight: "20px", marginRight: 5 }}>
        {inlineLabel ? inlineLabel : null}
      </span>
      <MaskedInput
        {...field}
        {...props}
        mask={maskValidation}
        onChange={handleChange}
      />
      {meta.touched && meta.error ? (
        <div className="ant-form-explain">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default ZincCodeFormField;
