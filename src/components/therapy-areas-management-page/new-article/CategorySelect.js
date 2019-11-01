import React, { useEffect, useState } from "react";
import { Select } from "antd";
const { Option } = Select;

// dumb component
const CategorySelect = ({ data, label, name, ...props }) => {
  const [categoryOptions, setCategoryOptions] = useState([]); // put our redux data to state

  useEffect(() => {
    // set the categories on mount from our data prop passed from CreateArticleForm component
    setCategoryOptions(
      data.map(c => (
        <Option key={c.id} value={c.id}>
          {c.name}
        </Option>
      ))
    );
  }, []);

  const handleChange = value => {
    props.onChange(name, value);
  };

  const handleBlur = () => {
    props.onBlur(name, true);
  };

  return (
    <div
      className={
        props.error && props.touched
          ? "has-feedback has-error ant-form-item-control"
          : "ant-form-item-control"
      }
    >
      <label>{label}</label>
      <Select
        name={name}
        placeholder={`Select a ${label}`}
        onChange={handleChange}
        onBlur={handleBlur}
        notFoundContent={`No ${label} found`}
      >
        {categoryOptions}
      </Select>

      {!!props.error && props.touched && (
        <div className="ant-form-explain">{props.error}</div>
      )}
    </div>
  );
};

export default CategorySelect;
