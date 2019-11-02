import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button } from "antd";
import * as yup from "yup";
import { DisplayFormikState } from "../../../utils/formikPropDisplay";

// Form elements
import TextFormField from "../../smart-form/TextFormField";

const schema = yup.object().shape({
  //   category_id: yup.string().required("This field is required"),
  //   subcategory_id: yup.string().required("This field is required"),
  //   specializations: yup.string().required("This field is required"),
  short_details: yup
    .string()
    .min(2, "Description is too short")
    .max(150, "Headline is too long")
    .required("This field is required")
  //   headline: yup
  //     .string()
  //     .min(2, "Title is too short")
  //     .max(150, "Headline is too long")
  //     .required("This field is required"),
  //   zinc_code: yup
  //     .number()
  //     .positive("Positive numbers only")
  //     .required("This field is required"),
  //   page_title: yup
  //     .string()
  //     .min(2, "Title is too short")
  //     .max(60, "Page title is too long")
  //     .required("This field is required"),
  //   meta_description: yup
  //     .string()
  //     .max(150, "Meta description is too long")
  //     .required("This field is required")
  //text_editor: yup.string().required("This field is required")
});

const CreateArticleForm = () => {
  const submitForm = (values, action) => {
    console.log(values);
    action.setSubmitting(false);
  };

  return (
    <Formik
      validateOnChange={false}
      initialValues={{ short_details: "" }}
      onSubmit={submitForm}
      validationSchema={schema}
    >
      {props => (
        <Form>
          <TextFormField
            name="short_details"
            type="text"
            label="Short Details"
          />
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
          <DisplayFormikState {...props} />
        </Form>
      )}
    </Formik>
  );
};

export default CreateArticleForm;
