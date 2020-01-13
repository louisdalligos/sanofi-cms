import React, { useEffect, useState } from "react";
import { useField, useFormikContext, Field } from "formik";
import { Select, Checkbox } from "antd";
const { Option } = Select;

const SelectTagsFormField = ({
  label,
  placeholder,
  options,
  allSelected,
  onEditMode,
  rawSpecialization,
  ...props
}) => {
  const [field, meta] = useField(props);
  const { setFieldValue, values } = useFormikContext();
  const [autoSelect, setAutoSelect] = useState(false);
  const [selectedOpts, setSelectedOpts] = useState([]);
  const [viewOnlyOpts, setViewOnlyOpts] = useState([]);

  useEffect(() => {
    if (options.length !== 0) setViewOnlyOpts(options);
    if (allSelected === true) {
      // Hooks
      setAutoSelect(true);
      // Formik
      setFieldValue("tag_all", true);
    }
  }, [options, allSelected]);

  useEffect(() => {
    // alert(JSON.stringify(rawSpecialization));

    if (
      rawSpecialization &&
      rawSpecialization === "0" &&
      options.length !== 0
    ) {
      const ids = options.map(option => {
        return option.id;
      });
      // Formik
      setFieldValue(field.name, ids);
      // Hooks
      setSelectedOpts(ids);
    }

    if (
      rawSpecialization &&
      rawSpecialization !== "0" &&
      options.length !== 0
    ) {
      const ids = options.map(option => {
        return option.id;
      });
      let toArray =
        rawSpecialization.indexOf(",") === -1
          ? +rawSpecialization
          : rawSpecialization.split(",");
      const toNums = !isNaN(toArray) ? toArray : toArray.map(str => +str);
      // Hooks
      setSelectedOpts(toNums);
      setAutoSelect(false);
      // Formik
      setFieldValue(field.name, toNums);
      setFieldValue("tag_all", false);
    }
  }, [rawSpecialization, options]);

  const handleSelectChange = value => {
    // Formik
    setFieldValue("tag_all", false);
    setFieldValue(field.name, value);
    // hooks
    setAutoSelect(false);
    setSelectedOpts(value);
  };

  const handleSelectBlur = value => {
    console.log(value);
  };

  // on select all settings
  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
    // console.log(field, meta);
    if (e.target.checked) {
      const ids = viewOnlyOpts.map(option => {
        return option.id;
      });

      // formik
      setFieldValue(field.name, ids);
      setFieldValue("tag_all", true);
      // hooks
      setSelectedOpts(ids);
    } else {
      // hooks
      setSelectedOpts([]);
      // Formik
      setFieldValue(field.name, []);
      setFieldValue("tag_all", false);
    }

    // // hooks
    setAutoSelect(e.target.checked);
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
        // update yung select
        value={selectedOpts}
        mode="multiple"
        placeholder={placeholder}
        onChange={handleSelectChange}
        onBlur={handleSelectBlur}
        notFoundContent="No results found"
        maxTagCount={5}
        maxTagTextLength={20}
      >
        {viewOnlyOpts.length !== 0
          ? viewOnlyOpts.map(c => (
              <Option key={c.id} value={c.id} label={c.title}>
                {c.title}
              </Option>
            ))
          : null}
      </Select>

      {meta.touched && meta.error ? (
        <div className="ant-form-explain">{meta.error}</div>
      ) : null}

      {onEditMode ? (
        <Field
          as={Checkbox}
          name="tag_all"
          onChange={onChange}
          checked={autoSelect}
        >
          Select all specializations
        </Field>
      ) : (
        <Field as={Checkbox} name="tag_all" onChange={onChange}>
          Select all specializations
        </Field>
      )}
    </div>
  );
};

export default SelectTagsFormField;
