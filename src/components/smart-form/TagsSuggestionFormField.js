import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useField } from "formik";
import { Select, Spin } from "antd";

// redux action
import { fetchTags } from "../../redux/actions/post-management-actions/postManagementActions";

const { Option } = Select;

const TagsSuggestionFormField = ({
  label,
  placeholder,
  options,
  requestInProgress,
  tags,
  ...props
}) => {
  const [field, meta] = useField(props);

  useEffect(() => {
    fetchTags();

    console.log(tags);
  }, [tags]);

  const handleSelectChange = value => {
    //let newValue = value.toString();
    console.log(value);
    props.onChange(field.name, value);
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
        mode="tags"
        placeholder={placeholder}
        onChange={handleSelectChange}
        notFoundContent="No results found"
      >
        {tags
          ? tags.map(c => (
              <Option key={c.id} value={c.text}>
                {c.text}
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

const mapStateToProps = state => {
  return {
    requestInProgress: state.postManagementReducer.requestInProgress,
    tags: state.postManagementReducer.tags
  };
};

export default connect(
  mapStateToProps,
  fetchTags
)(TagsSuggestionFormField);
