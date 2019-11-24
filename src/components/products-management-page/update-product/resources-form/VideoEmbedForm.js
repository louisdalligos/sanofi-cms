import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { withFormik, Field, Form } from "formik";
import { Input, Button } from "antd";
import * as Yup from "yup";

import TextFormField from "../../../smart-form/TextFormField";
import TextAreaFormField from "../../../smart-form/TextAreaFormField";

const { TextArea } = Input;

// validation schema
const schema = Yup.object().shape({
  video_embed: Yup.string().required("This field is required"),
  title: Yup.string().required("This field is required")
});

const VideoEmbedForm = props => {
  const {
    values,
    handleChange,
    onChange,
    handleSubmit,
    errors,
    touched,
    setSubmitting
  } = props;

  useEffect(() => {
    setSubmitting(false);
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (onChange) {
      onChange(values);
    }
  }, [values, onChange]);

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Video Information</h3>
      <Field
        as={TextAreaFormField}
        rows={4}
        name="video_embed"
        onChange={handleChange}
        values={values.video_embed}
        label="Video Embed Code:"
        requiredlabel="true"
      />

      <Field
        as={TextFormField}
        name="title"
        onChange={handleChange}
        values={values.title}
        label="Video Title"
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
      video_embed: "",
      title: ""
    };
  },
  validationSchema: schema,
  handleSubmit: (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  },
  displayName: "VideoEmbedForm"
})(VideoEmbedForm);
