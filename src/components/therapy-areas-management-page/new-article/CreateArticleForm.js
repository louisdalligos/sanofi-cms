import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import { Button, Row, Col } from "antd";
import * as Yup from "yup";
import { DisplayFormikState } from "../../../utils/formikPropDisplay";

// Form elements
import TextFormField from "../../smart-form/TextFormField";
import SelectFormField from "../../smart-form/SelectFormField";

// validation schema
const schema = Yup.object().shape({
  category_id: Yup.string().required("This field is required"),
  subcategory_id: Yup.string().required("This field is required"),
  //   specializations: Yup.string().required("This field is required"),
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

const CreateArticleForm = ({
  submitForm,
  categoryOptions,
  subCategoryOptions,
  data
}) => {
  useEffect(() => {
    console.log("Form mounting");
    console.log("Form data from page: ", categoryOptions);
  }, []);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={data}
      onSubmit={submitForm}
      validationSchema={schema}
    >
      {props => (
        <Form>
          <Row gutter={16} className="form-section">
            <h3 style={{ marginLeft: 10 }}>Page Organization</h3>

            <Col span={8}>
              <SelectFormField
                options={categoryOptions}
                label="Category"
                name="category_id"
                onChange={props.setFieldValue}
              />
              <SelectFormField
                options={subCategoryOptions}
                label="Sub Category"
                name="subcategory_id"
                onChange={props.setFieldValue}
              />
            </Col>
            <Col span={8}>2nd column</Col>
            <Col span={8}>
              <TextFormField
                name="short_details"
                type="text"
                label="Short Details"
              />
              <TextFormField name="headline" type="text" label="Headline" />
              <TextFormField name="zinc_code" type="text" label="Zinc Code" />
            </Col>
          </Row>

          <Row gutter={16} className="form-section">
            <h3 style={{ marginLeft: 10 }}>Page Optimization</h3>
            <Col span={12}>
              <TextFormField name="page_title" type="text" label="Page Title" />
              <TextFormField
                name="meta_description"
                type="text"
                label="Meta Description"
              />
            </Col>

            <Col span={12}>
              <TextFormField
                name="page_slug"
                type="text"
                label="Page Slug(Optional - system will generate if empty"
              />
              <TextFormField
                name="meta_keywords"
                type="text"
                label="Meta Keywords(Optional)"
              />
            </Col>
          </Row>

          <Row>
            <DisplayFormikState {...props} />
          </Row>

          <div className="form-actions">
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateArticleForm;
