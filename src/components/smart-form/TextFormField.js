import React, { useState, useEffect } from "react";
import { useField } from "formik";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { setFormDirty } from "../../redux/actions/form-actions/formActions";

const TextFormField = ({
  label,
  placeholder,
  className,
  maxCountAllowed,
  setFormDirty,
  isFormDirty,
  ...props
}) => {
  const [field, meta] = useField(props);
  const [characterCount, setCharacterCount] = useState(0);

  const handleChange = e => {
    let val = e.currentTarget.value;
    let valCount = val.length;
    console.log(meta);

    props.onChange(field.name, val);

    // check form dirty
    if (
      meta.error === undefined &&
      meta.value !== meta.initialValue &&
      !isFormDirty
    ) {
      setFormDirty(true);
    }

    if (valCount <= maxCountAllowed) {
      setCharacterCount(valCount);
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (field.value) setCharacterCount(field.value.length);
  }, [field.value]);

  return (
    <div
      className={
        meta.touched && meta.error
          ? `${className} has-feedback has-error ant-form-item-control`
          : `${className} ant-form-item-control`
      }
    >
      <label
        className={
          props.requiredlabel === "true" ? "ant-form-item-required" : null
        }
      >
        {label}
        <input
          {...field}
          {...props}
          className={"ant-input"}
          placeholder={placeholder}
          onChange={handleChange}
        />
      </label>

      <div className="meta-info-field-wrap">
        {meta.touched && meta.error ? (
          <div className="ant-form-explain">{meta.error}</div>
        ) : null}

        {maxCountAllowed ? (
          <div className="character-counter">
            {characterCount} of remaining {maxCountAllowed} allowed
          </div>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isFormDirty: state.formReducer.isFormDirty
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setFormDirty: setFormDirty
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TextFormField);
