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
    .required("This field is required.")
    .max(150, "Video title is too long."),
  video_embed: Yup.string().required("This field is required.")
});

const LinkSchema = Yup.object().shape({
  link_title: Yup.string()
    .required("This field is required.")
    .max(150, "Link title is too long."),
  link_url: Yup.string().required("This field is required.")
});

class OtherReferencesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // videos
      videoTitle: "",
      videoEmded: "",
      // links
      linkUrl: "",
      linkTitle: "",
      // Files
      local_fileList: [],
      local_filename: "",
      MANUAL_CHECK_NO_FILE: false,
      MANUAL_CHECK_NO_FILENAME: false,
      isMoreThan25Mb: false
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
              ? "Embed Videos"
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
        rowKey: "id"
      },
      {
        title: "Attachment",
        dataIndex: "section",
        rowKey: "id",
        render: (text, { type, filename, path, video_embed, link }, index) => {
          let caption = "default";
          switch (type) {
            case "1":
              caption = video_embed;
              break;
            case "2":
            case "4":
              caption = path;
              break;
            case "3":
              caption = link;
              break;
          }
          return <span>{caption}</span>;
        }
      },
      {
        title: "Action",
        rowKey: "id",
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
    });
  }

  handleVideoEntrySubmit(values, { resetForm }) {
    const payload = {
      other_resources: [
        {
          video_embed: values.video_embed,
          title: values.video_title,
          type: "1"
        }
      ]
    };
    this.props.saveOtherReferences(this.props.id, payload);
    resetForm({});
    // this runtime to differ loader actions
    this.runtime.action = "save";
  }

  handleLinkEntrySubmit(values, { resetForm }) {
    const payload = {
      other_resources: [
        {
          link: values.link_url,
          title: values.link_title,
          type: "3"
        }
      ]
    };
    this.props.saveOtherReferences(this.props.id, payload);
    resetForm({});
    // this runtime to differ loader actions
    this.runtime.action = "save";
  }

  handleFileEntrySubmit() {
    this.setState(
      {
        MANUAL_CHECK_NO_FILE: this.state.local_fileList.length === 0,
        MANUAL_CHECK_NO_FILENAME: this.state.local_filename.length === 0
      },
      () => {
        if (
          !this.state.MANUAL_CHECK_NO_FILE &&
          !this.state.MANUAL_CHECK_NO_FILENAME &&
          !this.state.isMoreThan25Mb
        ) {
          let formData = new FormData();
          let fileList = this.state.local_fileList[0];
          let filename = this.state.local_filename;

          formData.append("document_name", filename);
          formData.append("other_resources_file", fileList);
          formData.append("_method", "PUT");
          this.props.saveFilePostOtherReferences(this.props.id, formData);
        }
      }
    );

    this.runtime.action = "save";
  }

  bytesToMegabytes(bytes) {
    return bytes / 1000 / 1000;
  }

  render() {
    const { type, toastr } = this.props;
    const { videoTitle, videoEmded, linkUrl, linkTitle } = this.state;

    return (
      <div>
        {toastr &&
          (() => {
            toastr.type === "error"
              ? message.error(toastr.message)
              : message.success(toastr.message);
            return "";
          })()}

        <h3>Select the type of Resource</h3>
        <br />

        <div className="type-wrapper">
          <Select
            onChange={this.handleSelectType}
            value={type}
            style={{ width: "200px" }}
          >
            <Select.Option value="video">Video</Select.Option>
            <Select.Option value="file">File</Select.Option>
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
                      video_embed: videoEmded
                    }}
                    onSubmit={this.handleVideoEntrySubmit}
                    validationSchema={VideoSchema}
                    validateOnChange={true}
                    validateOnBlur={true}
                  >
                    {({ errors, touched, setFieldValue, field, resetForm }) => (
                      <Form>
                        <CustomTextField
                          name="video_embed"
                          label={"Video Embed Code"}
                          setFieldValue={setFieldValue}
                        />
                        <CustomField
                          name="video_title"
                          label={"Video Title"}
                          setFieldValue={setFieldValue}
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

                        if (this.bytesToMegabytes(file.size) > 24) {
                          this.setState({
                            isMoreThan25Mb: true,
                            local_fileList: []
                          });
                          // false
                        } else {
                          this.setState({
                            local_fileList: newList,
                            isMoreThan25Mb: false,
                            MANUAL_CHECK_NO_FILE: false
                          });
                          // true
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
                        <Icon type="upload" /> SelectFile
                      </Button>

                      {this.state.MANUAL_CHECK_NO_FILE && (
                        <div className="ant-form-explain">
                          {"This field is required."}
                        </div>
                      )}

                      {this.state.isMoreThan25Mb && (
                        <div className="font-red ant-form-explain">
                          {"File is more than 25mb."}
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
                        }
                      }}
                      onChange={evt => {
                        this.setState({
                          local_filename: evt.target.value,
                          MANUAL_CHECK_NO_FILENAME: false
                        });
                      }}
                    />

                    {this.state.MANUAL_CHECK_NO_FILENAME && (
                      <div className="ant-form-explain">
                        {"This field is required."}
                      </div>
                    )}

                    <div className="generic-btn-wrapper">
                      <Button
                        loading={
                          this.props.loader && this.runtime.action === "save"
                        }
                        htmlType="submit"
                        type="primary"
                        onClick={this.handleFileEntrySubmit}
                      >
                        Save File Details
                      </Button>
                      <Button
                        type="default"
                        onClick={() => {
                          this.setState({
                            local_fileList: [],
                            local_filename: ""
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
                      link_title: linkTitle
                    }}
                    onSubmit={this.handleLinkEntrySubmit}
                    validationSchema={LinkSchema}
                    validateOnChange={true}
                    validateOnBlur={true}
                  >
                    {({ errors, touched, setFieldValue, field, resetForm }) => (
                      <Form>
                        <CustomField
                          name="link_url"
                          label={"Link"}
                          setFieldValue={setFieldValue}
                        />
                        <CustomField
                          name="link_title"
                          label={"Link Title"}
                          setFieldValue={setFieldValue}
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
          <Table
            loading={this.props.loader}
            dataSource={this.props.files}
            columns={this.columns}
            size="small"
            locale={{ emptyText: "No data found" }}
          />
        </Fragment>
      </div>
    );
  }
}

const formGroupStyle = {
  margin: "3px 0 15px"
};

const CustomField = function({ name, label, setFieldValue }) {
  return (
    <Field
      name={name}
      onChange={evt => {
        const { name, value } = evt.target;
        setFieldValue(name, value);
      }}
    >
      {({ field, meta }) => {
        const dirty = meta.touched && meta.error;
        const classnames = "ant-form-item-control " + (dirty && "has-error");
        return (
          <div style={formGroupStyle} className={classnames}>
            <div className="ant-form-item-required">{label}</div>
            <Input {...field} className={classnames} />
            {dirty && <div className="ant-form-explain">{meta.error}</div>}
          </div>
        );
      }}
    </Field>
  );
};

const CustomTextField = function({ name, label, setFieldValue }) {
  const { TextArea } = Input;
  return (
    <Field
      name={name}
      onChange={evt => {
        const { name, value } = evt.target;
        setFieldValue(name, value);
      }}
    >
      {({ field, meta }) => {
        const dirty = meta.touched && meta.error;
        const classnames = "ant-form-item-control " + (dirty && "has-error");
        return (
          <div style={formGroupStyle} className={classnames}>
            <div className="ant-form-item-required">{label}</div>
            <TextArea {...field} className={classnames} />
            {dirty && <div className="ant-form-explain">{meta.error}</div>}
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
  loader: state.otherReferencesProductManagementReducers.loader,
  toastr: state.otherReferencesProductManagementReducers.toastr
});

const mapDispatchToProps = {
  selectType,
  fetchOtherReferences,
  saveOtherReferences,
  deleteOtherReferences,
  saveFilePostOtherReferences
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OtherReferencesComponent);
