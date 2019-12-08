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

      isTooLong: false,

      MANUAL_CHECK_NO_FILE: false,
      MANUAL_CHECK_NO_FILENAME: false
    };
    this.runtime = {
      action: "save"
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
            renderHTML = (
              <Input
                value={this.state.editFilename}
                onChange={evt => {
                  const value = evt.target.value;
                  this.setState({
                    editFilename: value
                  });
                }}
              />
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
        width: 150,
        render: (text, { path, title, id, product_id }, index) => (
          <div className="generic-btn-wrapper" style={{ margin: "0" }}>
            <Fragment>
              {/* save/edit dynamic */}
              {this.state.editCursor !== id ? (
                <Button
                  type="primary"
                  onClick={() => {
                    this.setState(
                      {
                        editCursor: id,
                        editFilename: title
                      },
                      () => {
                        this.props.setProductDirty({
                          dirty: true
                        });
                      }
                    );
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
                  <Icon type={"save"} />
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
    this.handleSaveEditedDocument = this.handleSaveEditedDocument.bind(this);
    this.handleSubmitPrescriptionInfo = this.handleSubmitPrescriptionInfo.bind(
      this
    );
  }

  handleSaveEditedDocument() {
    if (!this.state.editFilename.length) return;

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
    if (this.state.local_filename.length === 0) {
      this.setState({
        MANUAL_CHECK_NO_FILENAME: true
      });
    }
    if (this.state.local_fileList.length === 0) {
      this.setState({
        MANUAL_CHECK_NO_FILE: true
      });
    }
    if (this.state.local_filename.length >= 150) {
      this.setState({
        isTooLong: true
      });
      return;
    }

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
      MANUAL_CHECK_NO_FILENAME: false,
      MANUAL_CHECK_NO_FILE: false,
      isTooLong: false
    });
  }

  render() {
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
                <div
                  className={
                    "ant-form-item-control " +
                    (this.state.MANUAL_CHECK_NO_FILE === true
                      ? "has-error"
                      : "")
                  }
                >
                  <Upload
                    customRequest={() => {}}
                    accept="application/pdf"
                    fileList={this.state.local_fileList}
                    beforeUpload={(file, fileList) => {
                      const newList = [file];
                      this.setState(
                        {
                          local_fileList: newList,
                          MANUAL_CHECK_NO_FILE: false
                        },
                        () => {
                          this.props.setProductDirty({
                            dirty: true
                          });
                        }
                      );
                    }}
                    onRemove={removedFile => {
                      const excluded = this.state.local_fileList.filter(
                        file => file.uid !== removedFile.uid
                      );
                      this.setState({
                        local_fileList: excluded,
                        MANUAL_CHECK_NO_FILE: false
                      });
                    }}
                  >
                    <Button>
                      <Icon type="upload" />
                      SelectFile
                    </Button>
                  </Upload>

                  {/* Errors */}

                  {this.state.MANUAL_CHECK_NO_FILE && (
                    <div className="ant-form-explain">
                      {"This field is required."}
                    </div>
                  )}
                </div>
              </div>

              <br />

              <div>
                <div className="ant-form-item-required">Document Name</div>
                <div
                  className={
                    "ant-form-item-control " +
                    (this.state.MANUAL_CHECK_NO_FILENAME || this.state.isTooLong
                      ? "has-error"
                      : "")
                  }
                >
                  <Input
                    name="document_name"
                    value={this.state.local_filename}
                    onBlur={() => {
                      if (this.state.local_filename.length === 0) {
                        this.setState({
                          MANUAL_CHECK_NO_FILENAME: true
                        });
                        //
                        this.props.setProductDirty({
                          dirty: true
                        });
                      }
                    }}
                    onChange={evt => {
                      const value = evt.target.value;
                      this.setState(
                        {
                          local_filename: value,
                          MANUAL_CHECK_NO_FILENAME: false,
                          isTooLong: false
                        },
                        () => {
                          //
                          this.props.setProductDirty({
                            dirty: true
                          });
                        }
                      );
                    }}
                  />

                  {/* Errors */}
                  {this.state.MANUAL_CHECK_NO_FILENAME && (
                    <div className="ant-form-explain">
                      {"This field is required."}
                    </div>
                  )}

                  {this.state.isTooLong && (
                    <div className="ant-form-explain">
                      {"Document Name is too long."}
                    </div>
                  )}
                </div>
              </div>
              <br />
              <div className="generic-btn-wrapper">
                <Button
                  loading={(() => {
                    const isOnlySave = this.runtime.action === "save" && loader;
                    console.log("isOnlySave", isOnlySave);
                    return isOnlySave;
                  })()}
                  type="primary"
                  onClick={this.handleSubmitPrescriptionInfo}
                >
                  Save File Details
                </Button>
                <Button
                  loading={false}
                  type="default"
                  onClick={() => {
                    this.setState({
                      local_fileList: [],
                      local_filename: "",
                      MANUAL_CHECK_NO_FILE: false,
                      MANUAL_CHECK_NO_FILENAME: false,
                      isTooLong: false
                    });
                  }}
                >
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
