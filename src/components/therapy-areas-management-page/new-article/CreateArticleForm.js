import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import { Button, Row, Col } from "antd";
import * as yup from "yup";
import { DisplayFormikState } from "../../../utils/formikPropDisplay";

// Form elements
import TextFormField from "../../smart-form/TextFormField";

// validation schema
const schema = yup.object().shape({
  //   category_id: yup.string().required("This field is required"),
  //   subcategory_id: yup.string().required("This field is required"),
  //   specializations: yup.string().required("This field is required"),
  short_details: yup
    .string()
    .min(2, "Description is too short")
    .max(150, "Headline is too long")
    .required("This field is required"),
  headline: yup
    .string()
    .min(2, "Title is too short")
    .max(150, "Headline is too long")
    .required("This field is required"),
  zinc_code: yup
    .number()
    .positive("Positive numbers only")
    .required("This field is required")
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

const CreateArticleForm = ({ submitForm, data }) => {
  useEffect(() => {
    console.log("Form mounting");
    console.log("Form data from page: ", data);
  }, []);

  return (
    <Formik
      validateOnChange={false}
      enableReinitialize={true}
      initialValues={data}
      onSubmit={submitForm}
      validationSchema={schema}
    >
      {props => (
        <Form>
          <Row gutter={16} className="form-section">
            <h3 style={{ marginLeft: 10 }}>Page Organization</h3>

            <Col span={8}>1</Col>
            <Col span={8}>2</Col>
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
