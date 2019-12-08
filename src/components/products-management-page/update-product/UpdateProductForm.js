import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Formik, Field, Form, withFormik } from "formik";
import { Button, Row, Col, message, Icon, Spin, Tooltip, Tabs } from "antd";
import * as Yup from "yup";
//import { DisplayFormikState } from "../../../utils/formikPropDisplay";
import RouteLeavingGuard from "../../utility-components/RouteLeavingGuard";

// redux actions
import {
  fetchCurrentProduct,
  updateProduct,
  changeProductStatus,
  fetchCurrentProductArticlesByCategoryId
} from "../../../redux/actions/product-management-actions/productManagementActions";
import { clearNotifications } from "../../../redux/actions/notification-actions/notificationActions";

// Form elements
import TextFormField from "../../smart-form/TextFormField";
import SelectFormField from "../../smart-form/SelectFormField";
import SelectTagsFormField from "../../smart-form/SelectTagsFormField";
import TagsSuggestionFormField from "../../smart-form/TagsSuggestionFormField";
import ZincCodeFormField from "../../smart-form/ZincCodeFormField";
import TextEditorFormField from "../../smart-form/TextEditorFormField";

// Other components
import ImageUploader from "./ImageUploader";

import OtherReferencesComponent from "../tabs/OtherReferences/OtherReferencesComponent";
import PrescriptionInfoComponent from "../tabs/PrescriptionInfo/PrescriptionInfoComponent";
import ClinicalTrialsComponent from "../tabs/ClinicalTrials/ClinicalTrialsComponent";

import { sampleZincFormat } from "../../../utils/constant";

// validation schema
const schema = Yup.object().shape({
  category_id: Yup.string().required("This field is required"),
  specializations: Yup.string().required("This field is required"),
  short_description: Yup.string()
    .min(1, "Short description is too short")
    .max(150, "Short description is too long")
    .required("This field is required"),
  product_name: Yup.string()
    .min(1, "Product name is too short")
    .max(60, "Product name is too long")
    .required("This field is required"),
  //zinc_code: Yup.string().required("This field is required"),
  page_title: Yup.string()
    .min(1, "Page title is too short")
    .max(60, "Page title is too long")
    .required("This field is required"),
  meta_description: Yup.string()
    .max(150, "Meta description is too long")
    .required("This field is required"),
  body: Yup.string().required("This field is required"),
  zinc_code1: Yup.string()
    .required("Required field")
    .matches(
      /[A-Z]{4}.[A-Z]{3}.[0-9]{2}.[0-9]{2}.[0-9]{4}/,
      "Please complete the code"
    ),
  zinc_code2: Yup.string()
    .required("Required field")
    .matches(/[Version][ ][0-9]{1}.[0-9]{1}/, "Please complete version"),
  zinc_code3: Yup.string()
    .required("Required field")
    .matches(
      /[0-9]{2}[ ][A-Z]{1}[a-z]{1}[a-z]{1}[ ][0-9]{4}/,
      "Please complete the date"
    )
});

const { TabPane } = Tabs;

const UpdateProductForm = ({
  notifs,
  fetchCurrentProduct,
  updateProduct,
  currentProduct,
  changeProductStatus,
  auth,
  ...props
}) => {
  // product Id
  const [currentProductId, setCurrentProductId] = useState(
    props.match.params.id
  );

  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  // Fetch data state
  const [specializationOptions, setSpecializationOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([
    { id: "unpublished", name: "unpublished" },
    { id: "published", name: "published" },
    { id: "archived", name: "archived" }
  ]);

  const [defaultList, setDefaultList] = useState([]); // image list shape per antd docu

  useEffect(() => {
    setLoading(true);
    fetchCurrentProduct(currentProductId);

    setSpecializationOptions(
      props.postManagement.specializations
        ? props.postManagement.specializations
        : []
    );
    setCategoryOptions(
      props.postManagement.categories
        ? props.postManagement.categories.results
        : []
    );

    return () => {
      console.log("unmount -------->");
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (currentProduct) {
      const shapeData = {
        ...currentProduct,
        specializations: props.postManagement.specializations.map(item => {
          return item.id;
        }),
        tag_all: true
      };

      props.getData(
        currentProduct.specializations === "0" ? shapeData : currentProduct
      ); // pass our data to parent for it to set the initial values of formik

      if (currentProduct.product_images) {
        const modifiedData = currentProduct.product_images.map(item => {
          item.uid = item.id;
          item.status = "done";
          item.name = item.filename;
          return item;
        });
        setDefaultList(modifiedData);
      }
      setLoading(false);
    }

    return () => {
      console.log("PRODUCT FORM unmount -------->");
    };
    //eslint-disable-next-line
  }, [currentProduct]);

  useEffect(() => {
    switch (notifs.id) {
      case "CHANGE_PRODUCT_STATUS_SUCCESS":
        setLoading(false);
        setIsDisabled(true);
        message.success(
          notifs.notifications
            ? notifs.notifications.success
            : "Product successfully publised"
        );
        break;
      case "CHANGE_PRODUCT_STATUS_FAILED":
        setLoading(false);
        message.error(
          notifs.notifications
            ? notifs.notifications.error
            : "There was an error on processing your request"
        );
        break;
      case "UPDATE_PRODUCT_SUCCESS":
        message.success(notifs.notifications.success);
        fetchCurrentProduct(currentProduct.id);
        setLoading(false);
        break;
      case "UPDATE_PRODUCT_FAILED":
        clearNotifications();
        message.error(
          notifs.notifications
            ? notifs.notifications
            : "There was an error on processing your request"
        );
        setLoading(false);
        break;
    }

    setIsDisabled(true);
    //eslint-disable-next-line
  }, [notifs.id, notifs.notifications]);

  const saveStatus = val => {
    setLoading(true);
    const id = currentProduct.id;
    const values = {
      status: val
    };
    changeProductStatus(id, values); // redux action
  };

  const callback = key => {
    console.log(key);
  };

  return (
    <Spin spinning={loading}>
      <Row gutter={24} className="change-status-row">
        <Col>
          <Formik
            enableReinitialize={true}
            initialValues={{
              status: props.values.status
            }}
          >
            {props => (
              <Form>
                <label>Current status: </label>
                <SelectFormField
                  options={statusOptions}
                  name="status"
                  onChange={props.setFieldValue}
                  disabled={isDisabled}
                  style={{ width: 200 }}
                />

                {!isDisabled ? (
                  <div className="set-status-form-control">
                    <Button
                      type="primary"
                      onClick={() => {
                        saveStatus(props.values.status);
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => {
                        setIsDisabled(true);
                        props.values.status = currentProduct.status;
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div className="set-status-form-control">
                    <Button type="primary" onClick={() => setIsDisabled(false)}>
                      Change
                    </Button>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </Col>
      </Row>

      <Tabs onChange={callback} type="card" style={{ marginTop: 30 }}>
        <TabPane tab="Main Product Info" key="1">
          <form className="product-form" onSubmit={props.handleSubmit}>
            <Row gutter={24} className="form-section">
              <h3 style={{ marginLeft: 10 }}>Page Organization</h3>
              <Col xs={24} md={8}>
                <SelectFormField
                  options={categoryOptions}
                  label="Category"
                  name="category_id"
                  onChange={props.setFieldValue}
                  requiredlabel="true"
                />
                <TagsSuggestionFormField
                  placeholder={"Select a tag"}
                  label="Other tags"
                  name="other_tags"
                  onChange={props.setFieldValue}
                />
              </Col>
              <Col xs={24} md={7}>
                <SelectTagsFormField
                  options={specializationOptions}
                  label="Specializations"
                  name="specializations"
                  onChange={props.setFieldValue}
                  placeholder="Please select a specialization"
                  allSelected={props.values.tag_all}
                  onEditMode={true}
                />
              </Col>
              <Col xs={24} md={9}>
                <TextFormField
                  name="short_description"
                  type="text"
                  label="Short Description"
                  requiredlabel="true"
                  placeholder="Enter a short description"
                />
                <TextFormField
                  name="product_name"
                  type="text"
                  label="Product Name"
                  requiredlabel="true"
                  placeholder="Enter a product name"
                />

                <label
                  style={{
                    display: "block",
                    margin: "15px 0"
                  }}
                >
                  <span>Zinc Code </span>{" "}
                  <Tooltip placement="top" title={sampleZincFormat}>
                    <Icon type="info-circle" style={{ color: "#1890ff" }} />
                  </Tooltip>
                </label>
                <ZincCodeFormField
                  className="zinc-code-field1"
                  name="zinc_code1"
                  type="text"
                  onChange={props.setFieldValue}
                  maskValidation="AAAA.AAA.11.11.1111"
                  size="small"
                />
                <ZincCodeFormField
                  className="zinc-code-field2"
                  name="zinc_code2"
                  type="text"
                  onChange={props.setFieldValue}
                  maskValidation="Version 1.1"
                  size="small"
                />
                <ZincCodeFormField
                  className="zinc-code-field3"
                  name="zinc_code3"
                  type="text"
                  onChange={props.setFieldValue}
                  maskValidation="11 A** 1111"
                  size="small"
                />
              </Col>
            </Row>

            <Row gutter={24} className="form-section">
              <h3 style={{ marginLeft: 10 }}>Page Optimization</h3>
              <Col xs={24} md={12}>
                <TextFormField
                  name="page_title"
                  type="text"
                  label="Page Title"
                  requiredlabel="true"
                  placeholder="Enter a page title"
                />
                <TextFormField
                  name="meta_description"
                  type="text"
                  label="Meta Description"
                  requiredlabel="true"
                  placeholder="Enter a meta description"
                />
              </Col>

              <Col xs={24} md={12}>
                <TextFormField
                  name="slug"
                  type="text"
                  label="Page Slug(Optional - system will generate if empty"
                  placeholder="Enter a page slug"
                />
                <TextFormField
                  name="meta_keywords"
                  type="text"
                  label="Meta Keywords(Optional)"
                  placeholder="Enter meta keywords"
                />
              </Col>
            </Row>

            {/* 3nd row */}
            <Row gutter={24} className="form-section last">
              <Col xs={24} md={8}>
                <h3 className="ant-form-item-required">
                  Gallery Images <small>(required)</small>
                </h3>
                <ImageUploader data={defaultList} />
              </Col>
              <Col xs={24} md={16}>
                <h3>Product Description</h3>
                <TextEditorFormField
                  name="body"
                  values={props.values.body}
                  onChange={props.setFieldValue}
                />
              </Col>
            </Row>

            {/* <Row>
                            <DisplayFormikState {...props.values} />
                        </Row> */}

            <div className="form-actions">
              <Button style={{ marginRight: 10 }}>
                <Link to="/products">Cancel</Link>
              </Button>
              <Button htmlType="submit" type="primary">
                Save
              </Button>
            </div>

            <RouteLeavingGuard
              when={props.dirty}
              navigate={path => props.history.push(path)}
              shouldBlockNavigation={location => (props.dirty ? true : false)}
            />
          </form>
        </TabPane>

        <TabPane tab="Prescription Info" key="2">
          <PrescriptionInfoComponent auth={auth} id={currentProductId} />
        </TabPane>

        <TabPane
          tab="Clinical Trials"
          key="3"
          // disabled={isClinalTrialsTabDisabled}
        >
          <ClinicalTrialsComponent
            categoryId={35}
            auth={auth}
            id={currentProductId}
          />
        </TabPane>

        <TabPane
          tab="Other Resources"
          key="4"
          // disabled={isOtherReferencesDisabled}
        >
          <OtherReferencesComponent auth={auth} id={currentProductId} />
        </TabPane>
      </Tabs>
    </Spin>
  );
};

const formikEnhancer = withFormik({
  mapPropsToValues: props => props.data,
  validationSchema: schema,
  enableReinitialize: true,
  handleSubmit: (values, { props, setSubmitting, resetForm }) => {
    let formData = new FormData();

    formData.append("product_info[category_id]", values.category_id);
    formData.append("product_info[other_tags]", values.other_tags);
    formData.append(
      "product_info[specializations]",
      values.tag_all ? 0 : values.specializations
    );
    formData.append("product_info[product_name]", values.product_name);
    formData.append(
      "product_info[short_description]",
      values.short_description
    );
    formData.append(
      "product_info[zinc_code]",
      `${values.zinc_code1} | ${values.zinc_code2} | ${values.zinc_code3}`
    );
    formData.append("product_info[page_title]", values.page_title);
    formData.append("product_info[meta_description]", values.meta_description);
    formData.append(
      "product_info[slug]",
      values.slug.replace(/\s+/g, "-").toLowerCase()
    );
    formData.append("product_info[meta_keywords]", values.meta_keywords);
    formData.append("product_info[body]", values.body);
    formData.append("product_info[category_id]", values.category_id);
    formData.append("_method", "PUT");

    //if theres an uploaded image include these field on our form data
    if (values.image_gallery) {
      for (let i = 0; i < values.image_gallery.length; i++) {
        if (values.image_gallery[i] instanceof Blob)
          formData.append("image_gallery[]", values.image_gallery[i]);
      }
    }

    props.updateProduct(props.currentProduct.id, formData);
  },
  displayName: "UpdateProductForm"
})(UpdateProductForm);

const mapStateToProps = state => {
  return {
    auth: state.authReducer,
    notifs: state.notificationReducer,
    currentProduct: state.productManagementReducer.currentProduct,
    postManagement: state.postManagementReducer
  };
};

const UpdateProductFormWrapper = connect(
  mapStateToProps,
  { updateProduct, fetchCurrentProduct, changeProductStatus }
)(formikEnhancer);

export default UpdateProductFormWrapper;
