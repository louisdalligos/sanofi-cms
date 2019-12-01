import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import {
  Button,
  Row,
  Col,
  message,
  Icon,
  Tooltip,
  Tabs,
  Spin,
  Switch
} from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as Yup from "yup";
//import { DisplayFormikState } from "../../../utils/formikPropDisplay";
import RouteLeavingGuard from "../../utility-components/RouteLeavingGuard";

// redux actions
import {
  fetchCategories,
  fetchSpecializations
} from "../../../redux/actions/post-management-actions/postManagementActions";
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

// Other components
import ImageUploader from "./ImageUploader";
import FileUploader from "./FileUploader";
import ClinicalTrialsForm from "./clinical-trial-form/ClinicalTrialsForm";
import ResourcesForm from "./resources-form/ResourcesForm";

import OtherReferencesComponent from "../tabs/OtherReferences/OtherReferencesComponent";
import PrescriptionInfo from "../tabs/PrescriptionInfo/PrescriptionInfo";

import { sampleZincFormat } from "../../../utils/constant";

// validation schema
const schema = Yup.object().shape({
  category_id: Yup.string().required("This field is required"),
  //specializations: Yup.string().required("This field is required"),
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
  zinc_code1: Yup.string().required("Required field"),
  zinc_code2: Yup.string().required("Required field"),
  zinc_code3: Yup.string().required("Required field")
});

const { TabPane } = Tabs;

const UpdateProductForm = ({
  auth,
  notifs,
  postManagement,
  fetchCategories,
  fetchSpecializations,
  fetchCurrentProduct,
  currentProduct,
  updateProduct,
  history,
  match,
  data,
  fetchCurrentProductArticlesByCategoryId,
  changeProductStatus,
  ...props
}) => {
  const [currentProductId, setCurrentProductId] = useState(match.params.id);
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [statusOptions, setStatusOptions] = useState([]);
  const [isProductNew, setIsProductNew] = useState(true);

  // form data state values
  const [categories, setCategories] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [otherTags, setOtherTags] = useState([]);
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [pageTitle, setPageTitle] = useState("");
  const [productName, setProductName] = useState("");
  //const [zincCode, setZincCode] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState("");
  const [zincode1, setZinCode1] = useState("");
  const [zincode2, setZincCode2] = useState("");
  const [zincode3, setZincCode3] = useState("");

  const [imageGalleryFiles, setImageGalleryFiles] = useState([]);
  const [defaultList, setDefaultList] = useState([]); // image list shape per antd docu

  // clinical trials data
  const [clinicalTrialsData, setClinicalTrialsData] = useState([]);

  // prescription info data
  const [prescriptionInfoData, setPrescriptionInfoData] = useState([]);

  // resources data
  const [resourcesData, setResourcesData] = useState([]);

  // Tabs state
  const [isClinalTrialsTabDisabled, setIsClinalTrialsTabDisabled] = useState(
    false
  );
  const [isOtherReferencesDisabled, setOtherReferencesTabDisabled] = useState(
    false
  );

  useEffect(() => {
    setLoading(true);
    fetchCurrentProduct(currentProductId);
    fetchCategories();
    fetchSpecializations();

    setStatusOptions([
      { id: "unpublished", name: "unpublished" },
      { id: "published", name: "published" },
      { id: "archived", name: "archived" }
    ]);
    //eslint-disable-next-line
  }, []);

  const setComponentState = currentProduct => {
    console.log(currentProduct);
    // let formatTags = currentProduct.other_tags
    //   ? currentProduct.other_tags.split(",")
    //   : [];
    // let formatSpecialization = currentProduct.specializations
    //   ? currentProduct.specializations.split(",").map(item => {
    //       return parseInt(item, 10);
    //     })
    //   : [];
    setOtherTags(currentProduct.other_tags);
    setSelectedSpecializations(currentProduct.specializations);
    setCategoryId(currentProduct.category_id);
    setPageTitle(currentProduct.page_title);
    setProductName(currentProduct.product_name);
    //setZincCode(currentProduct.zinc_code);
    setShortDescription(currentProduct.short_description);
    setSlug(currentProduct.slug);
    setMetaDescription(currentProduct.meta_description);
    setMetaKeywords(currentProduct.meta_keywords);
    setBody(currentProduct.body);
    setStatus(currentProduct.status);
    setImageGalleryFiles(currentProduct.product_images);
    setIsProductNew(currentProduct.is_new);
  };

  useEffect(() => {
    setLoading(true);

    // check if our fetched request from api is available
    if (currentProduct) {
      console.log(currentProduct);
      setCategoryId(currentProduct.category_id);
      setOtherTags(
        currentProduct.other_tags ? currentProduct.other_tags.split(",") : []
      );
      setSelectedSpecializations(
        currentProduct.specializations
          ? currentProduct.specializations.split(",").map(item => {
              return parseInt(item, 10);
            })
          : []
      );
      setPageTitle(currentProduct.page_title);
      setProductName(currentProduct.product_name);
      //setZincCode(currentProduct.zinc_code);
      setShortDescription(currentProduct.short_description);
      setSlug(currentProduct.slug);
      setMetaDescription(currentProduct.meta_description);
      setMetaKeywords(currentProduct.meta_keywords);
      setBody(currentProduct.body);
      setStatus(currentProduct.status);

      // work on our zinc code
      const str = currentProduct.zinc_code.split("|");
      setZinCode1(str[0].trim());
      setZincCode2(str[1].trim());
      setZincCode3(str[2].trim());

      // work on our gallery images
      setImageGalleryFiles(currentProduct.product_images);
      if (currentProduct.product_images) {
        const modifiedData = currentProduct.product_images.map(item => {
          item.uid = item.id;
          item.status = "done";
          item.name = item.filename;
          return item;
        });
        console.log(modifiedData, "Modified");
        setDefaultList(modifiedData);
      }

      // if product has been fetched, fetch our articles by the category id provided
      fetchCurrentProductArticlesByCategoryId(currentProduct.category_id);

      // Set clinical trials data
      setClinicalTrialsData(currentProduct.clinical_trials);

      if (currentProduct.prescription_info) {
        const modifiedData = currentProduct.prescription_info.map(item => {
          item.uid = item.id;
          item.status = "done";
          item.name = item.filename;
          return item;
        });
        console.log(modifiedData, "Modified");
        setPrescriptionInfoData(modifiedData);
      }

      setResourcesData(currentProduct.other_resources);
      setIsProductNew(currentProduct.is_new);

      setLoading(false);
    }
  }, [
    currentProduct,
    setLoading,
    setSelectedSpecializations,
    setOtherTags,
    setImageGalleryFiles,
    fetchCurrentProductArticlesByCategoryId
  ]);

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
      case "FETCH_SPECIALIZATIONS_SUCCESS":
        setSpecializations(postManagement.specializations);
        setLoading(false);
        break;
      case "FETCH_CATEGORIES_SUCCESS":
        setCategories(postManagement.categories.results);
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
      default:
        return;
    }

    setLoading(false);
    //eslint-disable-next-line
  }, [notifs.id, notifs.notifications]);

  // get the file
  const getImage = (name, file) => {
    console.log(file);
    console.log(name);

    if (name === "image_gallery") {
      setImageGalleryFiles([...imageGalleryFiles, file]);
    }
  };

  // Submit form action
  const submitForm = (values, action) => {
    clearNotifications(); // clear our notifs
    action.setSubmitting(true);
    let formData = new FormData();

    formData.append("category_id", values.category_id);
    formData.append("other_tags", values.other_tags);
    values.specializations.length === 0
      ? formData.append("specializations", null)
      : formData.append("specializations", values.specializations);
    formData.append("product_name", values.product_name);
    formData.append("short_description", values.short_description);
    formData.append(
      "zinc_code",
      `${values.zinc_code1} | ${values.zinc_code2} | ${values.zinc_code3}`
    );
    formData.append("page_title", values.page_title);
    formData.append("meta_description", values.meta_description);
    formData.append("slug", values.slug.replace(/\s+/g, "-").toLowerCase());
    formData.append("meta_keywords", values.meta_keywords);
    formData.append("body", values.body);
    formData.append("_method", "PUT");

    updateProduct(currentProduct.id, formData); // redux action
    action.setSubmitting(false);

    // const formatTags = currentProduct.other_tags
    //     ? currentProduct.other_tags.split(",")
    //     : [];
    // const formatSelectedSpecialization = currentProduct.specializations
    //     ? currentProduct.specializations.split(",").map(item => {
    //           return parseInt(item, 10);
    //       })
    //     : [];

    //if theres an uploaded image include these field on our form data
    if (values.image_gallery) {
      for (let i = 0; i < imageGalleryFiles.length; i++) {
        formData.append("image_gallery", imageGalleryFiles[i]);
      }
    }

    // Set the state
    setComponentState(values);
  };

  // Save status update
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

  const enableClinicalTrialsTab = val => {
    console.log(val);
    setIsClinalTrialsTabDisabled(val);
  };

  const enableOtherReferencesTab = val => {
    setOtherReferencesTabDisabled(val);
  };

  // handle set to featured switch
  function handleSwitchChange(checked) {
    console.log(checked);
  }

  return (
    <Spin spinning={loading}>
      <Row gutter={24} className="change-status-row">
        <Col xs={24} md={12}>
          <Formik
            enableReinitialize={true}
            initialValues={{
              status: status
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
        <Col xs={24} md={12}>
          <h3 style={{ float: "left", marginRight: 10 }}>New</h3>
          <Tooltip
            placement="top"
            title={
              isProductNew && isProductNew === "Yes"
                ? "Untag as new product"
                : "Tag as new product?"
            }
          >
            <Switch
              className="switch-new-trigger"
              defaultChecked={isProductNew && isProductNew === "Yes"}
              onChange={handleSwitchChange}
            />
          </Tooltip>
        </Col>
      </Row>
      <Tabs onChange={callback} type="card" style={{ marginTop: 30 }}>
        <TabPane tab="Main Product Info" key="1">
          <Formik
            enableReinitialize={true}
            initialValues={{
              category_id: categoryId,
              other_tags: otherTags,
              specializations: selectedSpecializations,
              product_name: productName,
              short_description: shortDescription,
              //zinc_code: zincCode,
              page_title: pageTitle,
              meta_description: metaDescription,
              slug: slug,
              meta_keywords: metaKeywords ? metaKeywords : "",
              body: body,
              zinc_code1: zincode1,
              zinc_code2: zincode2,
              zinc_code3: zincode3,
              image_gallery: imageGalleryFiles
            }}
            onSubmit={submitForm}
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
                    />
                  </Col>
                  <Col xs={24} md={7}>
                    <SelectTagsFormField
                      options={specializations}
                      label="Specializations"
                      name="specializations"
                      onChange={props.setFieldValue}
                      placeholder="Please select a specialization"
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
                      maskValidation="AAAA.AAA.11.11.11"
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
                    <h3>Gallery Images</h3>
                    <ImageUploader getImage={getImage} data={defaultList} />
                  </Col>
                  <Col xs={24} md={16}>
                    <h3>Product Description</h3>
                    <Field name="body">
                      {({ field, form: { touched, errors }, meta }) => (
                        <div
                          className={
                            meta.touched && meta.error
                              ? "has-feedback has-error ant-form-item-control"
                              : "ant-form-item-control"
                          }
                        >
                          <ReactQuill
                            theme="snow"
                            placeholder="Write something..."
                            modules={UpdateProductForm.modules}
                            formats={UpdateProductForm.formats}
                            value={field.value}
                            onChange={field.onChange(field.name)}
                          />
                          {meta.touched && meta.error ? (
                            <div className="ant-form-explain">{meta.error}</div>
                          ) : null}
                        </div>
                      )}
                    </Field>
                  </Col>
                </Row>

                {/* <Row>
                                    <DisplayFormikState {...props} />
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
                  navigate={path => history.push(path)}
                  shouldBlockNavigation={location =>
                    props.dirty ? true : false
                  }
                />
              </Form>
            )}
          </Formik>
        </TabPane>
        <TabPane tab="Prescription Info" key="2">
          {/*<Row>
                        <h3 style={{ marginBottom: 20 }}>Upload file/s</h3>
                        <Col>
                            <FileUploader
                                productId={currentProductId}
                                //updateAction={updateProduct}
                                auth={auth}
                                prescriptionInfoData={prescriptionInfoData}
                                enableClinicalTrialsTab={
                                    enableClinicalTrialsTab
                                }
                            />
                        </Col>
                    </Row>*/}
          <PrescriptionInfo auth={auth} id={currentProductId} />
        </TabPane>
        <TabPane
          tab="Clinical Trials"
          key="3"
          disabled={isClinalTrialsTabDisabled}
        >
          <Row>
            <h3 style={{ marginBottom: 20 }}>Select article link</h3>
            <Col>
              <ClinicalTrialsForm
                productId={currentProductId}
                auth={auth}
                clinicalTrialsData={clinicalTrialsData}
                enableOtherReferencesTab={enableOtherReferencesTab}
              />
            </Col>
          </Row>
        </TabPane>

        {/* Doms:Start */}
        <TabPane
          tab="Other Resources"
          key="4"
          disabled={isOtherReferencesDisabled}
        >
          {/* <Row><Col>
                    <ResourcesForm
                        productId={currentProductId}
                        auth={auth}
                        resourcesData={resourcesData}/>
                    </Col></Row> */}

          <OtherReferencesComponent auth={auth} id={currentProductId} />
        </TabPane>
        {/* Doms:End */}
      </Tabs>
    </Spin>
  );
};

UpdateProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" }
    ],
    ["link", "image", "video"],
    ["clean"]
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
};

UpdateProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video"
];

const mapStateToProps = state => {
  return {
    auth: state.authReducer,
    postManagement: state.postManagementReducer,
    notifs: state.notificationReducer,
    currentProduct: state.productManagementReducer.currentProduct
  };
};

export default connect(
  mapStateToProps,
  {
    updateProduct,
    fetchSpecializations,
    fetchCategories,
    fetchCurrentProduct,
    fetchCurrentProductArticlesByCategoryId,
    changeProductStatus
  }
)(UpdateProductForm);
