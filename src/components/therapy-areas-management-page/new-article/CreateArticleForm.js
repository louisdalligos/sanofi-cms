import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button } from "antd";
import * as Yup from "yup";

// Form elements
import TextFormField from "../../smart-form/TextFormField";

const ArticleSchema = Yup.object().shape({
  category_id: Yup.string().required("This field is required"),
  subcategory_id: Yup.string().required("This field is required"),
  specializations: Yup.string().required("This field is required"),
  short_details: Yup.string()
    .min(2, "Description is too short")
    .max(150, "Headline is too long")
    .required("This field is required"),
  headline: Yup.string()
    .min(2, "Title is too short")
    .max(150, "Headline is too long")
    .required("This field is required"),
  zinc_code: Yup.number()
    .positive("Positive numbers only")
    .required("This field is required"),
  page_title: Yup.string()
    .min(2, "Title is too short")
    .max(60, "Page title is too long")
    .required("This field is required"),
  meta_description: Yup.string()
    .max(150, "Meta description is too long")
    .required("This field is required")
  //text_editor: Yup.string().required("This field is required")
});

const CreateArticleForm = () => {
  return (
    <Formik
      validationSchema={ArticleSchema}
      initialValues={{ short_details: "" }}
      onSubmit={(values, actions) => {
        console.log(values);
        actions.setSubmitting(false);
      }}
      render={formikProps => (
        <form onSubmit={formikProps.handleSubmit}>
          <TextFormField
            name="short_details"
            type="text"
            label="Short Details"
          />
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </form>
      )}
    />
  );
};

export default CreateArticleForm;
