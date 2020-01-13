import React, { useState, useEffect } from "react";
import { useField, useFormikContext } from "formik";
import { DatePicker } from "antd";
import moment from "moment";

const dateFormat = "YYYY/MM/DD";

const DatePickerFormField = ({ label, disabledDate, disabled, ...props }) => {
  const { values } = useFormikContext();

  const [field, meta] = useField(props);
  const name = field.name;

  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(values.event_date);
  }, [values]);

  const handleChange = (date, dateString) => {
    props.onChange(name, moment(dateString).format(dateFormat));
    console.log(dateString);
  };

  const handleBlur = e => {
    console.log(e);
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
        style={{ display: "block" }}
        className={
          props.requiredlabel === "true" ? "ant-form-item-required" : null
        }
      >
        {label}
      </label>

      <DatePicker
        onChange={handleChange}
        onBluer={handleBlur}
        format={dateFormat}
        value={date !== "" ? moment(`${date}`) : ""}
        disabledDate={disabledDate}
        disabled={disabled}
      />

      {meta.touched && meta.error ? (
        <div className="ant-form-explain">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default DatePickerFormField;
