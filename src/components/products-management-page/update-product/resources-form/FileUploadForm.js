import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { withFormik, Field } from "formik";
import { Button, message } from "antd";
import * as Yup from "yup";

import axios from "axios";
import { API } from "../../../../utils/api";

// Form components
import TextFormField from "../../../smart-form/TextFormField";
import UploadFile from "./UploadFile";

// validation schema
const schema = Yup.object().shape({
  document_name: Yup.string()
    .required("This field is required")
    .max(150, "Document name is too long"),
  other_resources: Yup.mixed().required("This field is required!")
  // .test(
  //   "fileSize",
  //   "Your file is too big",
  //   value => value && value.size <= 262144000
  // )
});

const FileUploadForm = props => {
  const {
    values,
    handleChange,
    onChange,
    handleSubmit,
    setSubmitting,
    resetForm
  } = props;

  const [uploadedFile, setUploadedFile] = useState(null);

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

  const getFile = file => {
    console.log(file);
    debugger;
    setUploadedFile(file); // put our file on state
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>File Upload Information</h3>

      <Field
        as={UploadFile}
        name="other_resources"
        label="other_resources"
        requiredlabel="true"
        values={values.other_resources}
        getFile={getFile}
      />

      <Field
        as={TextFormField}
        name="document_name"
        onChange={handleChange}
        values={values.document_name}
        label="Document Name"
        requiredlabel="true"
      />

      {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}

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
      other_resources: "",
      document_name: ""
    };
  },
  validationSchema: schema,
  handleSubmit: (values, { props, setSubmitting }) => {
    console.log(props);
    const formData = new FormData();
    formData.append("document_name", values.document_name);
    formData.append("other_resources", values.other_resources);
    formData.append("_method", "PUT");

    console.log(formData);

    axios({
      url: `${API}/products/update/${props.productId}`,
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.auth.access_token}`
      },
      data: formData
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
  displayName: "FileUploadForm"
})(FileUploadForm);
