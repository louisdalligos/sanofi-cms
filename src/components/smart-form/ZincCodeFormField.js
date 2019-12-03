import React from "react";
import { useField } from "formik";
import MaskedInput from "antd-mask-input";

const ZincCodeFormField = ({
    placeholder,
    className,
    maskValidation,
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
