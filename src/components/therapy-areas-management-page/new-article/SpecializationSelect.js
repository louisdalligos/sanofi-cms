import React, { useEffect, useState } from "react";
import { Radio, Select } from "antd";

const { Option } = Select;

// dumb component
const SpecializationSelect = ({ data, name, ...props }) => {
  const [specializationOptions, setSpecializationOptions] = useState([]); // put our redux data to state
  const [radioValue, setRadioValue] = useState(0);

  useEffect(() => {
    // set the categories on mount from our data prop passed from CreateArticleForm component
    setSpecializationOptions(
      data.map(c => (
        <Option key={c.id} value={c.name}>
          {c.name}
        </Option>
      ))
    );
  }, []);

  const handleChange = e => {
    console.log("radio checked", e.target.value);
    setRadioValue(e.target.value);
  };

  const handleSelectChange = value => {
    props.onChange(name, value);

    console.log(name, value);
  };

  const handleBlur = () => {
    if (radioValue !== 1) {
      props.onBlur(name, true);
    }
  };

  return (
    <div
      className={
        props.error && props.touched
          ? "has-feedback has-error ant-form-item-control"
          : "ant-form-item-control"
      }
    >
      <label>Specializations</label>
      <Radio.Group onChange={handleChange} value={radioValue}>
        <Radio value={0}>All</Radio>
        <Radio value={1}>Select from the dropdown list</Radio>
      </Radio.Group>

      {radioValue === 1 ? (
        <Select
          name={name}
          mode="tags"
          placeholder="Please select a specialization"
          onChange={handleSelectChange}
          onBlur={handleBlur}
          style={{ width: "100%", marginTop: 20 }}
        >
          {specializationOptions}
        </Select>
      ) : null}

      {!!props.error && props.touched && (
        <div className="ant-form-explain">{props.error}</div>
      )}
    </div>
  );
};

export default SpecializationSelect;
