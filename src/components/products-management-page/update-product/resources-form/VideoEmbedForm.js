import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { withFormik, Field } from "formik";
import { Button, message } from "antd";
import * as Yup from "yup";

import axios from "axios";
import { API } from "../../../../utils/api";

// Form components
import TextFormField from "../../../smart-form/TextFormField";
import TextAreaFormField from "../../../smart-form/TextAreaFormField";

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
  handleSubmit: (values, { props, setSubmitting }) => {
    axios({
      url: `${API}/products/update/${props.productId}`,
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.auth.access_token}`
      },
      data: values
    })
      .then(res => {
        setSubmitting(false);
        console.log(res);
        message.success(
          res.data.success ? res.data.success : "Updated product successfully"
        );
      })
      .catch(err => {
        setSubmitting(false);
        console.log(err);
        // message.error(
        //   err.response.data.error
        //     ? err.response.data.error
        //     : "There was an error on processing your request"
        // );
      });
  },
  displayName: "VideoEmbedForm"
})(VideoEmbedForm);
