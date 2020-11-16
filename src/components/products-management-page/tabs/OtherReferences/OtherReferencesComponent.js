import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  selectType,
  fetchOtherReferences,
  saveOtherReferences,
  deleteOtherReferences,
  saveFilePostOtherReferences
} from "../../../../redux/actions/product-management-actions/other-references-productmanagement.actions";
import {
  Select,
  Button,
  Input,
  message,
  Table,
  Icon,
  Upload,
  Row,
  Col
} from "antd";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { setProductDirty } from "../../../../redux/actions/centralize-functionality-actions/centralize-functionality.actions";

// import CentralizeToastr from "../../../utility-components/CentralizeToastr/CentralizeToastr";

const style = {
  contentProper: {
    margin: "20px 0 50px",
    padding: "20px 0",
    borderTop: "1px solid #e8e8e8",
    borderBottom: "1px solid #e8e8e8"
  }
};

const VideoSchema = Yup.object().shape({
  video_title: Yup.string()
    .max(100, "Maximum of 100 characters allowed only")
    .required("This field is required"),

  video_link: Yup.string()
    .max(100, "Maximum of 100 characters allowed only")
    .required("This field is required"),

  short_details: Yup.string().max(
    1000,
    "Maximum of 1000 characters allowed only"
  )
  // .required("This field is required")
});

const LinkSchema = Yup.object().shape({
  link_title: Yup.string()
    .max(100, "Maximum of 100 characters allowed only")
    .required("This field is required"),

  link_url: Yup.string()
    .max(100, "Maximum of 100 characters allowed only")
    .required("This field is required"),

  short_details: Yup.string().max(
    1000,
    "Maximum of 1000 characters allowed only"
  )
  // .required("This field is required")
});

const { TextArea } = Input;
class OtherReferencesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // videos
      videoTitle: "",
      videoEmded: "",
      videoDescription: "",
      // links
      linkUrl: "",
      linkTitle: "",
      linkDescription: "",
      // Files
      local_fileList: [],
      local_filename: "",
      local_fileDescription: "",
      MANUAL_CHECK_NO_FILE: false,
      MANUAL_CHECK_NO_FILENAME: false,
      // MANUAL_CHECK_NO_FILE_DESCRIPTION: false,
      isMoreThan25Mb: false,
      isTooLong: false,
      isTooLongDesc: false,
      errorMessage: null,

      tabKeyPrev: null,

      fileDocNameCtr: 0,
      fileDocDescCtr: 0
    };
    this.runtime = {
      action: "save"
    };
    this.columns = [
      {
        title: "Type",
        dataIndex: "type",
        rowKey: "id",
        render: (text, { type }) => {
          const toWord =
            type === "1"
              ? "Video Link"
              : type === "2" || type === "4"
              ? "File Attachment"
              : type === "3"
              ? "Links"
              : "Default";
          return toWord;
        }
      },
      {
        title: "Title",
        dataIndex: "title",
        rowKey: "id",
        width: 300,
        render: text => {
          return (
            <div className="text-truncate-300 custom-document-name-title-wrapper">
              {text}
            </div>
          );
        }
      },
      {
        title: "Attachment",
        dataIndex: "section",
        rowKey: "id",
        width: 300,
        render: (text, { type, filename, path, video_link, link }, index) => {
          let caption = "default";
          switch (type) {
            case "1":
              caption = video_link;
              break;
            case "2":
            case "4":
              caption = path;
              break;
            case "3":
              caption = link;
              break;
          }
          return (
            <div className="text-truncate-300 custom-attachment-wrapper">
              {caption}
            </div>
          );
        }
      },
      {
        title: "Description",
        dataIndex: "description",
        rowKey: "id",
        width: 300,
        render: (text, row, index) => {
          const description = text || "Not set";
          return <p className="text-truncate-300">{description}</p>;
        }
      },
      {
        title: "Action",
        rowKey: "id",
        width: 100,
        render: (text, row, index) => {
          return (
            <Button
              type="danger"
              onClick={() => {
                this.props.deleteOtherReferences(row.id, this.props.id);
                // this runtime to differ loader actions
                this.runtime.action = "delete";
              }}
            >
              <Icon type={"delete"} />
            </Button>
          );
        }
      }
    ];

    this.handleSelectType = this.handleSelectType.bind(this);
    this.handleVideoEntrySubmit = this.handleVideoEntrySubmit.bind(this);
    this.handleLinkEntrySubmit = this.handleLinkEntrySubmit.bind(this);
    this.handleFileEntrySubmit = this.handleFileEntrySubmit.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.tabKey !== state.tabKeyPrev) {
      if (props.tabKey.toString().indexOf("other") !== -1) {
        // resets
        state.videoTitle = "";
        state.videoEmded = "";
        state.videoDescription = "";
        state.linkUrl = "";
        state.linkTitle = "";
        state.linkDescription = "";

        state.local_fileList = [];
        state.local_filename = "";
        state.local_fileDescription = "";

        state.MANUAL_CHECK_NO_FILE = false;
        state.MANUAL_CHECK_NO_FILENAME = false;
        // state.MANUAL_CHECK_NO_FILE_DESCRIPTION = false;
        state.isMoreThan25Mb = false;
        state.isTooLong = false;
        state.isTooLongDesc = false;
        state.errorMessage = null;

        state.fileDocNameCtr = 0;
        state.fileDocDescCtr = 0;

        props.selectType("file");
      }
      return {
        tabKeyPrev: props.tabKey
      };
    }
    return null;
  }

  componentDidMount() {
    const id = this.props.id;
    this.props.fetchOtherReferences(id);
  }

  handleSelectType(type) {
    this.props.selectType(type);
    // TODO: too much isolated
    this.setState({
      MANUAL_CHECK_NO_FILE: false,
      MANUAL_CHECK_NO_FILENAME: false
      // MANUAL_CHECK_NO_FILE_DESCRIPTION: false
    });
  }

  handleVideoEntrySubmit(values, { resetForm }) {
    const payload = {
      other_resources: [
        {
          video_link: values.video_link,
          title: values.video_title,
          description: values.short_details,
          type: "1"
        }
      ]
    };
    this.props.saveOtherReferences(this.props.id, payload);
    resetForm({});
    // this runtime to differ loader actions
    this.runtime.action = "save";
    this.props.setProductDirty({ dirty: true });
  }

  handleLinkEntrySubmit(values, { resetForm }) {
    const payload = {
      other_resources: [
        {
          link: values.link_url,
          title: values.link_title,
          description: values.short_details,
          type: "3"
        }
      ]
    };
    this.props.saveOtherReferences(this.props.id, payload);
    resetForm({});
    // this runtime to differ loader actions
    this.runtime.action = "save";
    this.props.setProductDirty({ dirty: true });
  }

  handleFileEntrySubmit() {
    this.setState(
      {
        MANUAL_CHECK_NO_FILE: this.state.local_fileList.length === 0,
        MANUAL_CHECK_NO_FILENAME: this.state.local_filename.length === 0
        // MANUAL_CHECK_NO_FILE_DESCRIPTION: this.state.local_fileDescription.length === 0
      },
      () => {
        if (
          !this.state.MANUAL_CHECK_NO_FILE &&
          !this.state.MANUAL_CHECK_NO_FILENAME &&
          // !this.state.MANUAL_CHECK_NO_FILE_DESCRIPTION &&
          !this.state.isMoreThan25Mb &&
          !this.state.isTooLong &&
          !this.state.isTooLongDesc &&
          (this.state.local_fileList.length !== 0 ||
            this.state.local_filename.length !== 0 ||
            this.state.local_fileDescription.length !== 0)
        ) {
          let formData = new FormData();
          let fileList = this.state.local_fileList[0];
          let filename = this.state.local_filename;
          let fileDescription = this.state.local_fileDescription;

          formData.append("document_name", filename);
          formData.append("other_resources_file", fileList);
          formData.append("description", fileDescription);
          formData.append("_method", "PUT");
          this.props.saveFilePostOtherReferences(this.props.id, formData);
          // after
          this.resets();
        }
      }
    );
    this.runtime.action = "save";
    this.props.setProductDirty({ dirty: true });
  }
  resets() {
    this.setState({
      MANUAL_CHECK_NO_FILE: false,
      MANUAL_CHECK_NO_FILENAME: false,
      local_fileList: [],
      local_filename: "",
      local_fileDescription: "",

      // new implem
      fileDocDescCtr: 0,
      fileDocNameCtr: 0
    });
  }

  bytesToMegabytes(bytes) {
    return bytes / 1000 / 1000;
  }

  render() {
    const { type } = this.props;
    const {
      videoTitle,
      videoEmded,
      videoDescription,
      linkUrl,
      linkTitle,
      linkDescription
    } = this.state;

    return (
      <div>
        {/* <CentralizeToastr issuer={this} /> */}
        <h3>Select the type of Resource</h3>
        <br />

        <div className="type-wrapper">
          <Select
            onChange={this.handleSelectType}
            value={type}
            style={{ width: "200px" }}
          >
            <Select.Option value="file">File</Select.Option>
            <Select.Option value="video">Video</Select.Option>
            <Select.Option value="link">Link</Select.Option>
          </Select>
          <br />
          <br />
        </div>
        <Row>
          <Col span={12}>
            <div>
              {/* Video Information */}
              {type === "video" && (
                <Fragment>
                  <div>
                    <strong>Video Information</strong>
                  </div>
                  <Formik
                    initialValues={{
                      video_title: videoTitle,
                      video_link: videoEmded,
                      description: videoDescription
                    }}
                    onSubmit={this.handleVideoEntrySubmit}
                    validationSchema={VideoSchema}
                    validateOnChange={true}
                    validateOnBlur={true}
                  >
                    {({
                      errors,
                      touched,
                      // setFieldValue,
                      field,
                      resetForm
                    }) => (
                      <Form>
                        <CustomInputField
                          name="video_link"
                          label={"Video Link"}
                          rows={1}
                        />
                        <CustomInputField
                          name="video_title"
                          label={"Video Title"}
                        />
                        <CustomTextArea
                          name="short_details"
                          label={"Video Description (optional)"}
                          required={false}
                          rows={4}
                        />
                        <div className="generic-btn-wrapper">
                          <Button
                            loading={
                              this.props.loader &&
                              this.runtime.action === "save"
                            }
                            htmlType="submit"
                            type="primary"
                          >
                            Save Video Details
                          </Button>
                          <Button
                            type="default"
                            onClick={() => {
                              resetForm({});
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </Fragment>
              )}

              {/* File Upload Information, For now everything was manually checked and saved */}
              {type === "file" && (
                <Fragment>
                  <div
                    className={
                      "ant-form-item-control " +
                      (this.state.MANUAL_CHECK_NO_FILE ? "has-error" : "")
                    }
                  >
                    <div>
                      <strong>File Upload Information</strong>
                    </div>
                    {/* No formik muna yung file */}
                    <Upload
                      customRequest={() => {}}
                      accept="application/pdf"
                      fileList={this.state.local_fileList}
                      beforeUpload={(file, fileList) => {
                        const newList = [file];
                        // #1
                        if (this.bytesToMegabytes(file.size) > 24) {
                          this.setState({
                            isMoreThan25Mb: true,
                            local_fileList: []
                          });
                        } else {
                          this.setState({
                            local_fileList: newList,
                            isMoreThan25Mb: false,
                            MANUAL_CHECK_NO_FILE: false
                          });
                        }

                        if (
                          file.type.indexOf("png") !== -1 ||
                          file.type.indexOf("jpeg") !== -1 ||
                          file.type.indexOf("jpg") !== -1 ||
                          file.type.indexOf("pdf") !== -1
                        ) {
                          this.setState({
                            errorMessage: null
                          });
                        } else {
                          this.setState({
                            errorMessage:
                              "Invalid attachment, only (pdf,png,jpeg) format is allowed.",
                            local_fileList: []
                          });
                        }
                      }}
                      onRemove={removedFile => {
                        const excluded = this.state.local_fileList.filter(
                          file => file.uid !== removedFile.uid
                        );
                        this.setState({
                          local_fileList: excluded
                        });
                      }}
                    >
                      <Button>
                        <Icon type="upload" />
                        <span>Select File</span>
                      </Button>

                      {this.state.MANUAL_CHECK_NO_FILE && (
                        <div className="ant-form-explain">
                          {"This field is required."}
                        </div>
                      )}

                      {this.state.isMoreThan25Mb && (
                        <div className="font-red ant-form-explain">
                          {
                            "Invalid attachment, image should not more than 25mb."
                          }
                        </div>
                      )}

                      {this.state.errorMessage && (
                        <div className="font-red ant-form-explain">
                          {this.state.errorMessage}
                        </div>
                      )}
                    </Upload>
                  </div>

                  <div
                    className={
                      "ant-form-item-control " +
                      (this.state.MANUAL_CHECK_NO_FILENAME ? "has-error" : "")
                    }
                  >
                    <div className="ant-form-item-required">Document Name</div>
                    <Input
                      name="document_name"
                      value={this.state.local_filename}
                      onBlur={() => {
                        if (!this.state.local_filename.length) {
                          this.setState({
                            MANUAL_CHECK_NO_FILENAME: true
                          });
                          this.props.setProductDirty({
                            dirty: true
                          });
                        }
                      }}
                      onChange={evt => {
                        const value = evt.target.value;
                        if (value.length <= runtime.charLimitInput) {
                          this.setState({
                            local_filename: value,
                            MANUAL_CHECK_NO_FILENAME: false,
                            isTooLong: false,
                            fileDocNameCtr: value.length
                          });
                        }
                      }}
                    />

                    <div className="character-counter">
                      {`${this.state.fileDocNameCtr} of remaining ${runtime.charLimitInput} allowed`}
                    </div>

                    {this.state.MANUAL_CHECK_NO_FILENAME && (
                      <div className="ant-form-explain">
                        {"This field is required."}
                      </div>
                    )}

                    {this.state.isTooLong && (
                      <div className="font-red ant-form-explain">
                        {"Document Name is too long."}
                      </div>
                    )}

                    {/* Refactor to YUP/Formik - Temp fix for #SCSW2-406*/}
                    {/* <div className="ant-form-item-required"> */}
                    <div className="">Document Description (optional)</div>

                    <TextArea
                      className="optional-field"
                      name="short_details"
                      rows={4}
                      value={this.state.local_fileDescription}
                      onBlur={() => {
                        if (!this.state.local_fileDescription.length) {
                          /*this.setState({
                                                        MANUAL_CHECK_NO_FILE_DESCRIPTION: true
                                                    });*/
                          this.props.setProductDirty({
                            dirty: true
                          });
                        }
                      }}
                      onChange={evt => {
                        const value = evt.target.value;
                        if (value.length <= runtime.charLimitTextField) {
                          this.setState({
                            local_fileDescription: value,
                            // MANUAL_CHECK_NO_FILE_DESCRIPTION: false,
                            isTooLongDesc: false,
                            fileDocDescCtr: value.length
                          });
                        }
                      }}
                    />

                    {/*this.state.MANUAL_CHECK_NO_FILE_DESCRIPTION && (
                                            <div className="ant-form-explain">
                                                {"This field is required."}
                                            </div>
                                        )*/}

                    {this.state.isTooLong && (
                      <div className="font-red ant-form-explain">
                        {"Maximum of 1000 characters allowed only"}
                      </div>
                    )}

                    <div className="character-counter">
                      {`${this.state.fileDocDescCtr} of remaining ${runtime.charLimitTextField} allowed`}
                    </div>

                    <div className="generic-btn-wrapper">
                      <Button
                        loading={
                          this.props.loader && this.runtime.action === "save"
                        }
                        htmlType="submit"
                        type="primary"
                        onClick={() => {
                          if (this.state.local_filename.length > 100) {
                            this.setState({
                              isTooLong: true
                            });
                          } else if (
                            this.state.local_fileDescription.length > 1000
                          ) {
                            this.setState({
                              isTooLongDesc: true
                            });
                          } else {
                            this.handleFileEntrySubmit();
                          }
                        }}
                      >
                        Save File Details
                      </Button>
                      <Button
                        type="default"
                        onClick={() => {
                          this.setState({
                            local_fileList: [],
                            local_filename: "",
                            local_fileDescription: "",
                            isTooLong: false,
                            MANUAL_CHECK_NO_FILE: false,
                            MANUAL_CHECK_NO_FILENAME: false
                          });
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                  <br />
                </Fragment>
              )}

              {/* Link Information */}
              {type === "link" && (
                <Fragment>
                  <div>
                    <strong>Link Information</strong>
                  </div>
                  <Formik
                    initialValues={{
                      link_url: linkUrl,
                      link_title: linkTitle,
                      description: linkDescription
                    }}
                    onSubmit={this.handleLinkEntrySubmit}
                    validationSchema={LinkSchema}
                    validateOnChange={true}
                    validateOnBlur={true}
                  >
                    {({ errors, touched, setFieldValue, field, resetForm }) => (
                      <Form>
                        <CustomInputField name="link_url" label={"Link"} />
                        <CustomInputField
                          name="link_title"
                          label={"Link Title"}
                        />
                        <CustomTextArea
                          name="short_details"
                          rows={4}
                          label={"Link Description (optional)"}
                          required={false}
                        />
                        <div className="generic-btn-wrapper">
                          <Button
                            loading={
                              this.props.loader &&
                              this.runtime.action === "save"
                            }
                            htmlType="submit"
                            type="primary"
                          >
                            Save Link Details
                          </Button>
                          <Button
                            type="default"
                            onClick={() => {
                              resetForm({});
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </Fragment>
              )}
            </div>
          </Col>
        </Row>

        {/* Listing with Action */}

        <Fragment>
          {/* <div style={{ overflowX: "auto" }}> */}
          <Table
            // tableLayout={"fixed"}
            loading={this.props.loader}
            dataSource={this.props.files}
            columns={this.columns}
            size="small"
            locale={{ emptyText: "No data found" }}
            scroll={{ x: 1200 }}
          />
          {/* </div> */}
        </Fragment>
      </div>
    );
  }
}

const formGroupStyle = {
  margin: "3px 0 15px"
};
const runtime = {
  charLimitInput: 100,
  charLimitTextField: 1000
};

const CustomInputField = function({ name, label, setFieldValue }) {
  return (
    <Field name={name}>
      {props => {
        const { field, meta } = props;
        const dirty = meta.touched && meta.error;

        const classnames = "ant-form-item-control " + (dirty && "has-error");
        return (
          <div style={formGroupStyle} className={classnames}>
            <div className="ant-form-item-required">{label}</div>
            {/* <Input {...field} className={classnames} /> */}
            <Input
              name={field.name}
              value={field.value}
              className={classnames}
              onChange={evt => {
                const value = evt.target.value;
                if (value.length <= runtime.charLimitInput) field.onChange(evt);
              }}
            />
            {dirty && <div className="ant-form-explain">{meta.error}</div>}
            <div className="character-counter">
              <p>{`${field.value ? field.value.length : 0} of remaining ${
                runtime.charLimitInput
              } allowed`}</p>
            </div>
          </div>
        );
      }}
    </Field>
  );
};

const CustomTextArea = function({
  name,
  label,
  setFieldValue,
  rows,
  required = true
}) {
  const { TextArea } = Input;
  return (
    <Field name={name}>
      {props => {
        const { field, meta } = props;
        const dirty = meta.touched && meta.error;

        const classnames = "ant-form-item-control " + (dirty && "has-error");
        return (
          <div style={formGroupStyle} className={classnames}>
            <div className={(required && "ant-form-item-required") || ""}>
              {label}
            </div>
            <TextArea
              name={field.name}
              value={field.value}
              className={classnames}
              rows={rows}
              onChange={evt => {
                const value = evt.target.value;
                if (value.length <= runtime.charLimitTextField)
                  field.onChange(evt);
              }}
            />
            {dirty && <div className="ant-form-explain">{meta.error}</div>}
            <div className="character-counter">
              <div className="character-counter">
                <p>{`${field.value ? field.value.length : 0} of remaining ${
                  runtime.charLimitTextField
                } allowed`}</p>
              </div>
            </div>
          </div>
        );
      }}
    </Field>
  );
};

const mapStateToProps = state => ({
  /* state */
  type: state.otherReferencesProductManagementReducers.type,
  files: state.otherReferencesProductManagementReducers.files,
  loader: state.otherReferencesProductManagementReducers.loader
  // toastr: state.otherReferencesProductManagementReducers.toastr
});

const mapDispatchToProps = {
  selectType,
  fetchOtherReferences,
  saveOtherReferences,
  deleteOtherReferences,
  saveFilePostOtherReferences,
  setProductDirty
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OtherReferencesComponent);
