import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { withFormik, Field } from "formik";
import { Button } from "antd";
import * as Yup from "yup";

import TextFormField from "../../../smart-form/TextFormField";

// validation schema
const schema = Yup.object().shape({
  links: Yup.string().required("This field is required"),
  title: Yup.string().required("This field is required")
});

const LinkForm = props => {
  const {
    values,
    handleChange,
    onChange,
    handleSubmit,
    setSubmitting,
    resetForm
  } = props;

  useEffect(() => {
    setSubmitting(false);
    return () => {
      resetForm();
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (onChange) {
      onChange(values);
    }
  }, [values, onChange]);

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>File Upload Information</h3>

      <Field
        as={TextFormField}
        name="links"
        onChange={handleChange}
        values={values.links}
        label="Link"
        requiredlabel="true"
      />

      <Field
        as={TextFormField}
        name="title"
        onChange={handleChange}
        values={values.title}
        label="Link Title"
        requiredlabel="true"
      />

      <pre>{JSON.stringify(values, null, 2)}</pre>

      <div className="form-actions">
        <Button style={{ marginRight: 10 }}>
          <Link to="/products">Cancel</Link>
        </Button>
        <Button htmlType="submit" type="primary">
          Save
        </Button>
      </div>
    </form>
  );
};

export default withFormik({
  mapPropsToValues: () => {
    return {
      links: "",
      title: ""
    };
  },
  validationSchema: schema,
  handleSubmit: (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  },
  displayName: "LinkForm"
})(LinkForm);
