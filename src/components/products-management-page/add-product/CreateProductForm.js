import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import { Button, Row, Col, message, Upload, Icon, Spin, Tooltip } from "antd";
import * as Yup from "yup";
//import { DisplayFormikState } from "../../../utils/formikPropDisplay";
//import RouteLeavingGuard from "../../utility-components/RouteLeavingGuard";

// redux actions
import {
  fetchCategories,
  fetchSpecializations
} from "../../../redux/actions/post-management-actions/postManagementActions";
import { createProduct } from "../../../redux/actions/product-management-actions/productManagementActions";
import { clearNotifications } from "../../../redux/actions/notification-actions/notificationActions";

// Form elements
import TextFormField from "../../smart-form/TextFormField";
import SelectFormField from "../../smart-form/SelectFormField";
import SelectTagsFormField from "../../smart-form/SelectTagsFormField";
import TagsSuggestionFormField from "../../smart-form/TagsSuggestionFormField";
import TextEditorFormField from "../../smart-form/TextEditorFormField";
import TextAreaFormField from "../../smart-form/TextAreaFormField";

import { sampleZincFormat } from "../../../utils/constant";

// TODO: Refactor
import {
  setServerSideLoader,
  addProductImages
} from "../../../redux/actions/product-management-actions/productManagementActions";

// validation schema
const schema = Yup.object().shape({
  category_id: Yup.string().required("This field is required"),
  specializations: Yup.string().required("This field is required"),
  other_tags: Yup.string().required("This field is required"),
  short_description: Yup.string()
    .max(1000, "Maximum of 1000 characters allowed only")
    .required("This field is required"),
  product_name: Yup.string()
    .max(100, "Maximum of 100 characters allowed only")
    .required("This field is required"),
  zinc_code: Yup.string()
    .required("This field is required")
    .max(150, "Maximum of 150 characters allowed only"),
  page_title: Yup.string()
    .max(60, "Maximum of 60 characters allowed only")
    .required("This field is required"),
  meta_description: Yup.string()
    .max(150, "Maximum of 150 characters allowed only")
    .required("This field is required"),
  body: Yup.string().required("This field is required")
});

const CreateProductForm = ({
  auth,
  notifs,
  postManagement,
  fetchCategories,
  fetchSpecializations,
  createProduct,
  history,
  data,
  // TODO: Refactor
  setServerSideLoader,
  addProductImages,
  serverSideLoader,
  ...props
}) => {
  const [categories, setCategories] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [imageGalleryFiles, setImageGalleryFiles] = useState([]);

  // TODO: Refactor
  const [productImages, setProductImages] = useState([]);
  const [imageError, setImageError] = useState(null);

  useEffect(() => {
    fetchCategories();
    fetchSpecializations();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    switch (notifs.id) {
      case "FETCH_SPECIALIZATIONS_SUCCESS":
        setSpecializations(postManagement.specializations);
        break;
      case "FETCH_CATEGORIES_SUCCESS":
        setCategories(postManagement.categories.results);
        break;
      case "CREATE_PRODUCT_SUCCESS":
        // NAKIKINIG TO
        clearNotifications();
        history.push("/products");

        break;
      case "CREATE_PRODUCT_FAILED":
        clearNotifications();
        message.error(
          notifs.notifications
            ? notifs.notifications
            : "There was an error on processing your request"
        );
        break;
      default:
        return;
    }
    //eslint-disable-next-line
  }, [notifs.id, notifs.notifications]);

  // get the file
  const getImage = (name, file) => {
    if (name === "image_gallery") {
      setImageGalleryFiles([...imageGalleryFiles, file]);
    }
  };

  // TODO: Refactor
  const removeUploadedImg = removed => {
    /* removed */
    let images = [];
    let blobOnly = [];
    let objOnly = [];
    let imageUid = null;

    try {
      productImages.forEach(image => {
        if (image instanceof Blob) blobOnly.push(image);
        else objOnly.push(image);
      });
      // deleted by Blob
      if (removed instanceof Blob) {
        blobOnly.forEach((image, idx) => {
          if (image.uid === removed.uid) {
            imageUid = removed.uid;
            blobOnly.splice(idx, 1);
          }
        });
        images = objOnly.concat(blobOnly);
        // deleted by object
      } else {
        objOnly.forEach((image, idx) => {
          if (image.uid === removed.uid) {
            imageUid = removed.uid;
            objOnly.splice(idx, 1);
          }
        });
        images = objOnly.concat(blobOnly);
        // only when uploaded already.
        setServerSideLoader(true);
      }
      setImageError(null);
      setProductImages(images);
      // [3] sabit lang sa props
      addProductImages({ productImages: images });
    } catch (error) {
      throw Error("Blob not supported in your device.");
    }
  };

  const addUploadImg = (file, fileList, event) => {
    const { type, size } = file;
    const images = productImages.map(image => image);
    //
    if (size / 1000 / 1000 > 24) {
      return setImageError(
        "Invalid attachment, image should not be more than 25mb."
      );
    } else {
      setImageError(null);
    }
    //
    if (
      type.indexOf("png") !== -1 ||
      type.indexOf("jpeg") !== -1 ||
      type.indexOf("jpg") !== -1
    ) {
      images.push(file);
      setProductImages(images);
      // [2] sabit lang sa props
      addProductImages({
        productImages: images
      });
      setImageError(null);
    } else {
      setImageError("Invalid attachment, only (png,jpeg) format is allowed.");
    }
  };

  const bulkRemoveUploadedImg = () => {
    try {
      productImages.forEach((image, idx) => {
        if (!(image instanceof Blob)) {
          // every time it delete one by one
          setServerSideLoader(true);
        }
        if (idx === productImages.length - 1) {
          setProductImages([]);
          addProductImages({ productImages: [] });
        }
      });
    } catch (error) {
      throw Error("Blob not supported in your device.");
    }
  };

  const submitForm = (values, action) => {
    // action.setSubmitting(true);

    let formData = new FormData();

    formData.append("category_id", values.category_id);
    formData.append("other_tags", values.other_tags);
    values.tag_all === true
      ? formData.set("specializations", 0)
      : formData.set("specializations", values.specializations);
    formData.append("product_name", values.product_name);
    formData.append("short_description", values.short_description);
    formData.append("zinc_code", values.zinc_code);
    formData.append("page_title", values.page_title);
    formData.append("meta_description", values.meta_description);
    formData.append("slug", values.slug);
    formData.append("meta_keywords", values.meta_keywords);
    formData.append("body", values.body);

    //if theres an uploaded image include these field on our form data
    try {
      productImages.forEach(image => {
        if (image instanceof Blob) formData.append("image_gallery[]", image);
      });
    } catch (error) {
      throw Error("Blob not supported in your device.");
    }

    createProduct(formData, history);

    /*
        axios({
            url: `${API}/products/create`,
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.access_token}`
            },
            data: formData
        })
            .then(res => {
                action.resetForm();
                action.setSubmitting(false);
                console.log(res);
                message.success(
                    res.data.success
                        ? res.data.success
                        : "Updated product successfully"
                );
                history.push("/products");
            })
            .catch(err => {
                action.setSubmitting(false);
                console.log(err);
                message.error(
                    err.response.data.error
                        ? err.response.data.error
                        : "There was an error on processing your request"
                );
            });*/
  };

  // http://127.0.0.1:8000/products/create

  return (
    <Spin spinning={serverSideLoader}>
      <>
        <Formik
          enableReinitialize={true}
          initialValues={data}
          onSubmit={(values, actions) => {
            actions.setSubmitting(false);

            if (productImages.length < 3) {
              actions.setSubmitting(false);
              //  setImageError("You must upload a minimum of 3 images.");
            } else {
              setImageError(null);
              setServerSideLoader(true);
              submitForm(values, actions);
            }
          }}
          validationSchema={schema}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {props => (
            <Form className="product-form">
              <Row gutter={24} className="form-section">
                <h3 style={{ marginLeft: 10 }}>Page Organization</h3>
                <Col xs={24} md={8}>
                  <SelectFormField
                    options={categories}
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
                    requiredlabel="true"
                  />
                </Col>
                <Col xs={24} md={7}>
                  <SelectTagsFormField
                    // create
                    options={specializations}
                    label="Specializations"
                    name="specializations"
                    onChange={props.setFieldValue}
                    placeholder="Please select a specialization"
                    requiredlabel="true"
                  />
                </Col>
                <Col xs={24} md={9}>
                  <TextAreaFormField
                    name="product_name"
                    type="text"
                    label="Product Name"
                    requiredlabel="true"
                    placeholder="Enter a product name"
                    onChange={props.setFieldValue}
                    maxCountAllowed={100}
                    rows={1}
                  />
                  <TextAreaFormField
                    name="short_description"
                    type="text"
                    label="Product Description"
                    requiredlabel="true"
                    placeholder="Enter a product description"
                    onChange={props.setFieldValue}
                    maxCountAllowed={1000}
                    rows={4}
                  />

                  <label
                    style={{
                      display: "block",
                      margin: "15px 0"
                    }}
                    className="ant-form-item-required"
                  >
                    <span>Zinc Code </span>
                    <Tooltip placement="top" title={sampleZincFormat}>
                      <Icon type="info-circle" style={{ color: "#1890ff" }} />
                    </Tooltip>
                  </label>
                  <TextFormField
                    name="zinc_code"
                    type="text"
                    size="small"
                    placeholder="Enter the zinc code"
                    onChange={props.setFieldValue}
                    maxCountAllowed={150}
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
                    onChange={props.setFieldValue}
                    maxCountAllowed={60}
                  />
                  <TextAreaFormField
                    name="meta_description"
                    type="text"
                    label="Meta Description"
                    requiredlabel="true"
                    placeholder="Enter a meta description"
                    onChange={props.setFieldValue}
                    maxCountAllowed={150}
                    rows={4}
                  />
                </Col>

                <Col xs={24} md={12}>
                  <TextFormField
                    name="slug"
                    type="text"
                    label="Page Slug(Optional - system will generate if empty"
                    placeholder="Enter a page slug"
                    onChange={props.setFieldValue}
                  />
                  <TextFormField
                    name="meta_keywords"
                    type="text"
                    label="Meta Keywords(Optional)"
                    placeholder="Enter meta keywords"
                    onChange={props.setFieldValue}
                  />
                </Col>
              </Row>

              {/* 3nd row */}
              <Row gutter={24} className="form-section last">
                <Col xs={24} md={8}>
                  <h3 className="ant-form-item-required">
                    Gallery Images <small>(required)</small>
                  </h3>

                  <Fragment>
                    {/* <Spin
                                        spinning={serverSideLoader}
                                        indicator={
                                            <Icon
                                                type="loading"
                                                style={{ fontSize: 24 }}
                                                spin
                                            />
                                        }
                                    > */}
                    <Upload
                      customRequest={() => {}}
                      accept="image/*"
                      fileList={productImages}
                      beforeUpload={addUploadImg}
                      onRemove={removeUploadedImg}
                    >
                      <Button disabled={productImages.length >= 5}>
                        <Icon type="upload" />
                        <span>Select File</span>
                      </Button>
                    </Upload>
                    <div
                      className={
                        "ant-form-item-control " +
                        (imageError ? "has-error" : "")
                      }
                    >
                      {imageError && (
                        <div className="ant-form-explain">{imageError}</div>
                      )}
                    </div>

                    <br />
                    <br />

                    <ul className="image-details">
                      <li>You can only upload png/jpeg format</li>
                      <li>Minimum of 3 and a maximum of 5 attachments</li>
                      <li>Maximum file size of 25mb</li>
                    </ul>

                    <br />

                    <p style={{ textAlign: "right" }}>
                      <a
                        href="javascript:void(0);"
                        type="default"
                        type="danger"
                        disabled={productImages.length < 3}
                        onClick={bulkRemoveUploadedImg}
                      >
                        Clear Images
                      </a>
                    </p>
                    {/* </Spin> */}
                  </Fragment>
                </Col>
                <Col xs={24} md={16}>
                  <h3 className="ant-form-item-required">
                    Product Description
                  </h3>
                  <Field
                    as={TextEditorFormField}
                    name="body"
                    values={props.values.body}
                    onChange={props.setFieldValue}
                  />
                </Col>
              </Row>

              {/* <Row>
                            <DisplayFormikState {...props} />
                        </Row> */}

              <div className="form-actions">
                <Button style={{ marginRight: 10 }} disabled={serverSideLoader}>
                  <Link to="/therapy-areas">Cancel</Link>
                </Button>
                <Button
                  htmlType="submit"
                  loading={serverSideLoader}
                  type="primary"
                  onClick={() => {
                    if (productImages.length < 3) {
                      setImageError("You must upload a minimum of 3 images.");
                    }
                  }}
                >
                  Save Draft
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    </Spin>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.authReducer,
    postManagement: state.postManagementReducer,
    notifs: state.notificationReducer,
    // TODO: Refactor
    productImages: state.productManagementReducer.productImages,
    serverSideLoader: state.productManagementReducer.serverSideLoader
  };
};

const mapDispatchToProps = {
  createProduct,
  fetchSpecializations,
  fetchCategories,
  // TODO: Refactor
  setServerSideLoader,
  addProductImages
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProductForm);
