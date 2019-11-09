import React, { Fragment } from "react";
import { useField } from "formik";

const InputHiddenFormField = ({ props }) => {
  const [field, meta] = useField(props);
  return (
    <Fragment>
      <input type="hidden" {...field} {...props} />
    </Fragment>
  );
};

export default InputHiddenFormField;
