import React from "react";
import { useField } from "formik";
import { DatePicker } from "antd";
import moment from "moment";

const dateFormat = "Y-MM-DD";

const DatePickerFormField = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    const name = field.name;

    const handleChange = (date, dateString) => {
        props.onChange(name, moment(dateString).format(dateFormat));
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
                    props.requiredlabel === "true"
                        ? "ant-form-item-required"
                        : null
                }
            >
                {label}
            </label>

            <DatePicker onChange={handleChange} format={dateFormat} />

            {meta.touched && meta.error ? (
                <div className="ant-form-explain">{meta.error}</div>
            ) : null}
        </div>
    );
};

export default DatePickerFormField;
