import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  fetchPrescriptionInfo,
  savePrescriptionInfo,
  deleletPrescriptionInfo,
  saveEditedDocumentInPrescriptionInfo
} from "../../../../redux/actions/product-management-actions/prescription-info.actions";

import { setProductDirty } from "../../../../redux/actions/centralize-functionality-actions/centralize-functionality.actions";

import { Button, Icon, Input, Upload, Row, Col, Table, Spin } from "antd";

// TODO: preloader

class PrescriptionInfoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      local_fileList: [],
      local_filename: "",
      editCursor: -1,
      editFilename: "",
      editFilenameTooLong: false,
      isTooLong: false,
      MANUAL_CHECK_INVALID_FILE: false,
      MANUAL_CHECK_NO_FILE: false,
      MANUAL_CHECK_NO_FILENAME: false,
      docNameCtr: 0,
      docNameListingCtr: 0,

      tabKeyPrev: null,
      // new implem use 1 message placeholder
      filenameErrorMessage: null,
      fileErrorMessage: null,

      filenameListingErrorMessage: null
    };
    this.runtime = {
      action: "save",
      charLimit: 100
    };

    this.columns = [
      {
        title: "Attachment",
        dataIndex: "filename",
        rowKey: "id",
        width: 300,
        render: text => {
          return (
            <div className="custom-document-name-title-wrapper">{text}</div>
          );
        }
      },
      {
        title: "Document Name",
        dataIndex: "title",
        rowKey: "id",
        width: 768,
        render: (text, { title, id }) => {
          const curTitle = title;
          let renderHTML = <span>Loading...</span>;
          if (this.state.editCursor === id) {
            // xxxxxx
            renderHTML = (
              <Fragment>
                <div
                  className={
                    "ant-form-item-control " +
                    (this.state.filenameListingErrorMessage ? "has-error" : "")
                  }
                >
                  <Input
                    value={this.state.editFilename}
                    onChange={evt => {
                      const value = evt.target.value;
                      if (value.length <= this.runtime.charLimit) {
                        this.setState({
                          editFilename: value,
                          docNameListingCtr: value.length,
                          filenameListingErrorMessage: null
                        });
                      }
                    }}
                  />

                  <div className="character-counter">{`${this.state.docNameListingCtr} of remaining ${this.runtime.charLimit} allowed`}</div>

                  {this.state.filenameListingErrorMessage && (
                    <div className="ant-form-explain">
                      {this.state.filenameListingErrorMessage}
                    </div>
                  )}
                </div>
              </Fragment>
            );
          } else {
            renderHTML = <span>{curTitle}</span>;
          }
          return <div className="custom-attachment-wrapper"> {renderHTML}</div>;
        }
      },
      {
        title: "View",
        dataIndex: "product_id",
        rowKey: "id",
        width: 100,
        render: (text, { path }, index) => (
          <a href={path} target="_blank">
            View
          </a>
        )
      },
      {
        title: "Actions",
        dataIndex: "section",
        rowKey: "id",
        width: 200,
        render: (text, { path, title, id, product_id }, index) => (
          <div className="generic-btn-wrapper" style={{ margin: "0" }}>
            <Fragment>
              {/* save/edit dynamic */}
              {this.state.editCursor !== id ? (
                <Button
                  type="primary"
                  onClick={() => {
                    this.setState({
                      editCursor: id,
                      editFilename: title,
                      filenameListingErrorMessage: null,
                      docNameListingCtr: title.length
                    });
                  }}
                >
                  <Icon type={"edit"} />
                </Button>
              ) : (
                <Button
                  type="primary"
                  onClick={() => {
                    this.runtime.action = "save_edit";
                    this.handleSaveEditedDocument();
                  }}
                >
                  <Icon type={"check"} />
                </Button>
              )}
            </Fragment>

            <Fragment>
              {/* delete constant */}
              <Button
                type="danger"
                onClick={() => {
                  this.runtime.action = "delete";
                  this.props.deleletPrescriptionInfo(this.props.id, id);
                }}
              >
                <Icon type={"delete"} />
              </Button>
            </Fragment>
          </div>
        )
      }
    ];
    // handlers
    this.handleSaveEditedDocument = this.handleSaveEditedDocument.bind(this);
    this.handleSubmitPrescriptionInfo = this.handleSubmitPrescriptionInfo.bind(
      this
    );
    this.docNameListingOnBlurChange = this.docNameListingOnBlurChange.bind(
      this
    );
    this.docNameListingOnChange = this.docNameListingOnChange.bind(this);
    this.resets = this.resets.bind(this);

    this.addDirtyClassesToFileName = this.addDirtyClassesToFileName.bind(this);
    this.addDirtyClassesToFile = this.addDirtyClassesToFile.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.tabKey !== state.tabKeyPrev) {
      if (props.tabKey.toString().indexOf("prescribing") !== -1) {
        // resets
        state.editCursor = -1;
        state.editFilename = "";
        state.local_fileList = [];
        state.local_filename = "";
        state.editFilenameTooLong = false;
        state.MANUAL_CHECK_NO_FILENAME = false;
        state.MANUAL_CHECK_NO_FILE = false;
        state.MANUAL_CHECK_INVALID_FILE = false;
        state.isTooLong = false;
        // new implem
        state.fileErrorMessage = null;
        state.filenameErrorMessage = null;
        state.filenameListingErrorMessage = null;
        state.docNameCtr = 0;
        state.docNameListingCtr = 0;
      }
      return {
        tabKeyPrev: props.tabKey
      };
    }
    return null;
  }

  handleSaveEditedDocument() {
    const offset = 50;
    if (this.state.editFilename.length === 0) {
      this.setState({
        filenameListingErrorMessage: "This field is required."
      });
      return;
    }
    if (this.state.editFilename.length >= this.runtime.charLimit + offset) {
      // not applied
      return;
    }
    this.props.saveEditedDocumentInPrescriptionInfo(
      this.props.id,
      this.state.editCursor,
      this.state.editFilename
    );
    this.resets();
  }

  componentDidMount() {
    this.props.fetchPrescriptionInfo(this.props.id);
    this.runtime.action = "save";
  }

  handleSubmitPrescriptionInfo() {
    // validation
    if (this.state.local_fileList.length === 0) {
      this.setState({ fileErrorMessage: "This field is required." });
    } else this.setState({ fileErrorMessage: null });

    if (this.state.local_filename.length === 0)
      this.setState({ filenameErrorMessage: "This field is required." });
    else this.setState({ filenameErrorMessage: null });

    if (this.state.local_filename.length && this.state.local_fileList.length) {
      let formData = new FormData();
      let fileList = this.state.local_fileList[0];
      let filename = this.state.local_filename;

      formData.append("prescription_info_title", filename);
      formData.append("prescription_files", fileList);
      formData.append("_method", "PUT");

      this.props.savePrescriptionInfo(this.props.id, formData);

      this.resets();
    }

    this.runtime.action = "save";
    this.props.setProductDirty({ dirty: true });
  }

  resets() {
    this.setState({
      editCursor: -1,
      editFilename: "",
      local_fileList: [],
      local_filename: "",
      editFilenameTooLong: false,
      MANUAL_CHECK_NO_FILENAME: false,
      MANUAL_CHECK_NO_FILE: false,
      MANUAL_CHECK_INVALID_FILE: false,
      isTooLong: false,
      // new implem
      filenameErrorMessage: null,
      fileErrorMessage: null,
      filenameListingErrorMessage: null,
      docNameCtr: 0,
      docNameListingCtr: 0
    });
  }

  docNameListingOnBlurChange() {
    if (this.state.local_filename.length === 0) {
      this.setState({ filenameErrorMessage: "This field is Required" });
    }
  }

  docNameListingOnChange(evt) {
    const value = evt.target.value;
    if (value.length <= this.runtime.charLimit) {
      this.setState({
        local_filename: value,
        docNameCtr: value.length,
        filenameErrorMessage: null
      });
    }
  }

  addDirtyClassesToFile() {
    let classes = "ant-form-item-control ";
    classes = classes.concat(this.state.fileErrorMessage ? "has-error" : "");
    return classes;
  }
  addDirtyClassesToFileName() {
    let classes = "ant-form-item-control ";
    classes = classes.concat(
      this.state.filenameErrorMessage ? "has-error" : ""
    );
    return classes;
  }

  render() {
    const manageDisableActions = () => {
      return this.props.files.length === 3;
    };

    const manageBeforeUpload = (file, fileList) => {
      const newList = [file];
      if (newList[0].type.indexOf("pdf") !== -1) {
        this.setState({
          local_fileList: newList,
          MANUAL_CHECK_NO_FILE: false,
          MANUAL_CHECK_INVALID_FILE: false,
          fileErrorMessage: null
        });
      } else {
        this.setState({
          local_fileList: [],
          MANUAL_CHECK_INVALID_FILE: true,
          fileErrorMessage: "Invalid attachment, only pdf format is allowed"
        });
      }
    };

    const manageOnRemoveFile = removedFile => {
      const excluded = this.state.local_fileList.filter(
        file => file.uid !== removedFile.uid
      );
      this.setState({
        local_fileList: excluded,
        MANUAL_CHECK_NO_FILE: false
      });
    };

    const { loader } = this.props;
    return (
      <div>
        <h3>Upload file/s</h3>
        <br />
        <br />

        <Fragment>
          <Row>
            <Col span={12}>
              <div>
                <p>
                  <strong>File Upload Information</strong>
                </p>
              </div>

              <div>
                <div className={this.addDirtyClassesToFile()}>
                  <Upload
                    customRequest={() => {}}
                    accept="application/pdf"
                    fileList={this.state.local_fileList}
                    beforeUpload={manageBeforeUpload}
                    onRemove={manageOnRemoveFile}
                  >
                    <Button disabled={manageDisableActions()}>
                      <Icon type="upload" />
                      <span>Select File</span>
                    </Button>
                  </Upload>

                  {this.state.fileErrorMessage && (
                    <div className="ant-form-explain">
                      <p>{this.state.fileErrorMessage}</p>
                    </div>
                  )}
                </div>
              </div>

              <br />

              <div>
                <div className="ant-form-item-required">Document Name</div>
                <div className={this.addDirtyClassesToFileName()}>
                  <Input
                    name="document_name"
                    value={this.state.local_filename}
                    disabled={manageDisableActions()}
                    onBlur={this.docNameListingOnBlurChange}
                    onChange={this.docNameListingOnChange}
                  />

                  <div className="character-counter">{`${this.state.docNameCtr} of remaining ${this.runtime.charLimit} allowed`}</div>

                  {this.state.filenameErrorMessage && (
                    <div className="ant-form-explain">
                      <p>{this.state.filenameErrorMessage}</p>
                    </div>
                  )}
                </div>
              </div>
              <br />
              <div className="generic-btn-wrapper">
                <Button
                  disabled={manageDisableActions()}
                  loading={(() => {
                    return this.runtime.action === "save" && loader;
                  })()}
                  type="primary"
                  onClick={this.handleSubmitPrescriptionInfo}
                >
                  Save File Details
                </Button>
                <Button loading={false} type="default" onClick={this.resets}>
                  Cancel
                </Button>
              </div>
            </Col>
          </Row>
        </Fragment>

        {/* Listing */}

        <br />
        <br />
        <br />

        <Fragment>
          {/* <div style={{ overflowX: "auto" }}> */}
          <Table
            // tableLayout={"fixed"}
            loading={loader}
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

const mapStateToProps = state => ({
  files: state.prescriptionInfoProductManagementReducers.files,
  loader: state.prescriptionInfoProductManagementReducers.loader
});

const mapDispatchToProps = {
  fetchPrescriptionInfo,
  savePrescriptionInfo,
  deleletPrescriptionInfo,
  saveEditedDocumentInPrescriptionInfo,
  setProductDirty
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrescriptionInfoComponent);
