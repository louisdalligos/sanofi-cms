import React, { useEffect, useState, Fragment } from "react";
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
  fetchCurrentProductArticlesByCategoryId,
  addProductImages,
  removeProductImageById,
  setServerSideLoader,
  setStatusChangeFormDisable
} from "../../../redux/actions/product-management-actions/productManagementActions";
import { clearNotifications } from "../../../redux/actions/notification-actions/notificationActions";

// Form elements
import TextFormField from "../../smart-form/TextFormField";
import SelectFormField from "../../smart-form/SelectFormField";
import SelectTagsFormField from "../../smart-form/SelectTagsFormField";
import TagsSuggestionFormField from "../../smart-form/TagsSuggestionFormField";
import TextEditorFormField from "../../smart-form/TextEditorFormField";

// Other components
// import ImageUploader from "./ImageUploader";

import OtherReferencesComponent from "../tabs/OtherReferences/OtherReferencesComponent";
import PrescriptionInfoComponent from "../tabs/PrescriptionInfo/PrescriptionInfoComponent";
import ClinicalTrialsComponent from "../tabs/ClinicalTrials/ClinicalTrialsComponent";

import { sampleZincFormat } from "../../../utils/constant";

// TODO: Refactor
import { Upload } from "antd";
import TextAreaFormField from "../../smart-form/TextAreaFormField";

// validation schema
const schema = Yup.object().shape({
  category_id: Yup.string().required("This field is required"),
  specializations: Yup.string().required("This field is required"),
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

const { TabPane } = Tabs;

const UpdateProductForm = ({
  notifs,
  fetchCurrentProduct,
  updateProduct,
  currentProduct,
  changeProductStatus,
  auth,
  addProductImages,
  removeProductImageById,
  setServerSideLoader,
  history,
  isFormDirty,
  loading,
  statusChangeFormDisable,
  setStatusChangeFormDisable,
  ...props
}) => {
  // product Id
  const [currentProductId, setCurrentProductId] = useState(
    props.match.params.id
  );

  // Fetch data state
  const [statusOptions, setStatusOptions] = useState([
    { id: "unpublished", name: "Unpublished" },
    { id: "published", name: "Published" },
    { id: "archived", name: "Archived" }
  ]);

  const [defaultList, setDefaultList] = useState([]); // image list shape per antd docu
  // TODO: tabControls
  const [curTabKey, setCurTabKey] = useState(1);
  // TODO: Upload images
  const [productImages, setProductImages] = useState([]);
  const [imageError, setImageError] = useState(null);

  useEffect(() => {
    fetchCurrentProduct(currentProductId);

    return () => {
      console.log("unmount -------->");
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (currentProduct) {
      const shapeData = {
        ...currentProduct,
        specializations: props.specializations.map(item => {
          return item.id;
        }),
        tag_all: true
      };

      props.getData(
        +currentProduct.specializations === 0 ? shapeData : currentProduct
      );

      try {
        if (
          currentProduct.product_images &&
          currentProduct.product_images.length
        ) {
          const formatted = currentProduct.product_images.map(image => {
            if (!(image instanceof Blob)) {
              image.uid = image.id;
              image.name = image.filename;
            }
            return image;
          });
          // set state
          setProductImages(formatted);
          // set props
          addProductImages({
            productImages: formatted
          });
        }
      } catch (error) {
        throw Error("Blob not supported in your device.");
      }
    }

    return () => {
      console.log("PRODUCT FORM unmount -------->");
    };
    //eslint-disable-next-line
  }, [currentProduct]);

  useEffect(() => {
    switch (notifs.id) {
      case "UPDATE_PRODUCT_SUCCESS":
        message.success(notifs.notifications.success);
        history.push("/products");
        fetchCurrentProduct(currentProduct.id);
        break;
      case "UPDATE_PRODUCT_FAILED":
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

  const saveStatus = val => {
    const id = currentProduct.id;
    const values = {
      status: val
    };
    changeProductStatus(id, values); // redux action
  };

  const callback = key => {
    let newValue = key;
    switch (+key) {
      case 1:
        newValue = key + "_" + "main";
        break;
      case 2:
        newValue = key + "_" + "prescribing";
        break;
      case 3:
        newValue = key + "_" + "clinical";
        break;
      case 4:
        newValue = key + "_" + "other";
        break;
      default:
        break;
    }
    setCurTabKey(newValue);
  };

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
        removeProductImageById(imageUid);
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
        "Invalid attachment, image should not more than 25mb."
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
          removeProductImageById(image.uid);
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

  return (
    <Spin spinning={props.serverSideLoader}>
      <Row gutter={24} className="change-status-row">
        <Col>
          <Formik
            enableReinitialize={true}
            initialValues={{
              status: props.values.status
            }}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {props => (
              <Form>
                <label>Current status: </label>
                <SelectFormField
                  options={statusOptions}
                  name="status"
                  onChange={props.setFieldValue}
                  disabled={statusChangeFormDisable}
                  style={{ width: 200 }}
                />

                {!statusChangeFormDisable ? (
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
                        setStatusChangeFormDisable(true);
                        props.values.status = currentProduct.status;
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div className="set-status-form-control">
                    <Button
                      type="primary"
                      onClick={() => setStatusChangeFormDisable(false)}
                    >
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
          <form
            className="product-form"
            onSubmit={evt => {
              evt.preventDefault();
              if (props.productImages.length < 3) {
                setImageError("You must upload a minimum of 3 images.");
              } else {
                setImageError(null);
                props.handleSubmit.bind(props.handleSubmit)();
              }
            }}
          >
            <Row gutter={24} className="form-section">
              <h3 style={{ marginLeft: 10 }}>Page Organization</h3>
              <Col xs={24} md={8}>
                <SelectFormField
                  options={props.categories}
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
                  rawSpecialization={
                    (currentProduct && currentProduct.specializations) || null
                  }
                  options={props.specializations}
                  label="Specializations"
                  requiredlabel="true"
                  name="specializations"
                  onChange={props.setFieldValue}
                  placeholder="Please select a specialization"
                  allSelected={props.values.tag_all}
                  values={props.values.specializations}
                  onEditMode={true}
                />
              </Col>
              <Col xs={24} md={9}>
                <TextAreaFormField
                  name="product_name"
                  type="text"
                  label="Product Name"
                  requiredlabel="true"
                  placeholder="Enter a product name"
                  values={props.values.product_name}
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
                  values={props.values.short_description}
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
                  values={props.values.page_title}
                  onChange={props.setFieldValue}
                  maxCountAllowed={60}
                />
                <TextAreaFormField
                  name="meta_description"
                  type="text"
                  label="Meta Description"
                  requiredlabel="true"
                  placeholder="Enter a meta description"
                  values={props.values.meta_description}
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
                  values={props.values.slug}
                  onChange={props.setFieldValue}
                />
                <TextFormField
                  name="meta_keywords"
                  type="text"
                  label="Meta Keywords(Optional)"
                  placeholder="Enter meta keywords"
                  values={props.values.meta_keywords}
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
                      "ant-form-item-control " + (imageError ? "has-error" : "")
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
                </Fragment>
              </Col>
              <Col xs={24} md={16}>
                <h3 className="ant-form-item-required">Product Description</h3>
                <Field
                  as={TextEditorFormField}
                  name="body"
                  values={props.values.body}
                  onChange={props.setFieldValue}
                />
              </Col>
            </Row>

            <div className="form-actions">
              <Button
                disabled={props.serverSideLoader}
                style={{ marginRight: 10 }}
              >
                <Link to="/products">Cancel</Link>
              </Button>

              <Button
                htmlType="submit"
                loading={props.serverSideLoader}
                type="primary"
                onClick={() => {
                  // alert(1);
                }}
              >
                Save
              </Button>
            </div>

            <RouteLeavingGuard
              when={isFormDirty}
              navigate={path => props.history.push(path)}
              shouldBlockNavigation={location => (isFormDirty ? true : false)}
            />
          </form>
        </TabPane>

        <TabPane tab="Prescribing Information" key="2">
          <PrescriptionInfoComponent
            auth={auth}
            tabKey={curTabKey}
            id={currentProductId}
          />
        </TabPane>

        <TabPane
          tab="Clinical Trials"
          key="3"
          // disabled={isClinalTrialsTabDisabled}
        >
          <ClinicalTrialsComponent
            auth={auth}
            tabKey={curTabKey}
            id={currentProductId}
          />
        </TabPane>

        <TabPane
          tab="Other Resources"
          key="4"
          // disabled={isOtherReferencesDisabled}
        >
          <OtherReferencesComponent
            auth={auth}
            tabKey={curTabKey}
            id={currentProductId}
          />
        </TabPane>
      </Tabs>
    </Spin>
  );
};

const formikEnhancer = withFormik({
  mapPropsToValues: props => props.data,
  validationSchema: schema,
  enableReinitialize: true,
  handleSubmit: (values, { props }) => {
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
    formData.append("product_info[zinc_code]", values.zinc_code);
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

    try {
      props.productImages.forEach(image => {
        if (image instanceof Blob) formData.append("image_gallery[]", image);
      });
    } catch (error) {
      throw Error("Blob not supported in your device.");
    }

    // [save]
    props.setServerSideLoader(true);

    props.updateProduct(props.currentProduct.id, props.history, formData);
  },
  displayName: "UpdateProductForm"
})(UpdateProductForm);

const mapStateToProps = state => {
  return {
    auth: state.authReducer,
    notifs: state.notificationReducer,
    currentProduct: state.productManagementReducer.currentProduct,
    postManagement: state.postManagementReducer,
    isFormDirty: state.postManagementReducer.isFormDirty,
    // TODO: Refactor
    productImages: state.productManagementReducer.productImages,
    serverSideLoader: state.productManagementReducer.serverSideLoader,
    loading: state.productManagementReducer.requestInProgress,
    statusChangeFormDisable:
      state.productManagementReducer.statusChangeFormDisable
  };
};

const mapDispatchToProps = {
  updateProduct,
  fetchCurrentProduct,
  changeProductStatus,
  // TODO: Refactor
  addProductImages,
  removeProductImageById,
  setServerSideLoader,
  setStatusChangeFormDisable
};

const UpdateProductFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(formikEnhancer);

export default UpdateProductFormWrapper;
