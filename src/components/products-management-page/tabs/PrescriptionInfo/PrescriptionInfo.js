import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  fetchPrescriptionInfo,
  savePrescriptionInfo,
  deleletPrescriptionInfo,
  saveEditedDocumentInPrescriptionInfo
} from "../../../../redux/actions/product-management-actions/prescription-info.actions";

import { Button, Icon, Input, Upload, Row, Col, Table } from "antd";

import CentralizeToastr from "../../../utility-components/CentralizeToastr/CentralizeToastr";

class PrescriptionInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      local_fileList: [],
      local_filename: "",
      editCursor: -1,
      editFilename: ""
    };
    this.columns = [
      {
        title: "Attachment",
        dataIndex: "filename",
        rowKey: "id"
      },
      {
        title: "Document Name",
        dataIndex: "title",
        rowKey: "id",
        render: (text, { title, id }) => {
          const curTitle = title;
          if (this.state.editCursor === id) {
            return (
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
            return curTitle;
          }
        }
      },
      {
        title: "View",
        dataIndex: "product_id",
        rowKey: "id",
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
                      editFilename: title
                    });
                  }}
                >
                  <Icon type={"edit"} />
                </Button>
              ) : (
                <Button
                  type="primary"
                  onClick={() => {
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
    this.handleSavePrescriptionInfo = this.handleSavePrescriptionInfo.bind(
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
  }

  handleSavePrescriptionInfo() {
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
  }

  resets() {
    this.setState({
      editCursor: -1,
      editFilename: ""
    });
  }

  render() {
    return (
      <div>
        <CentralizeToastr />

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
                <div className={"ant-form-item-control"}>
                  <Upload
                    customRequest={() => {}}
                    accept="application/pdf"
                    fileList={this.state.local_fileList}
                    beforeUpload={(file, fileList) => {
                      const newList = [file];
                      this.setState({
                        local_fileList: newList
                      });
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
                      SelectFile
                    </Button>
                  </Upload>

                  {/* Errors */}
                  <div className="ant-form-explain">
                    {"This field is required."}
                  </div>
                </div>
              </div>

              <br />

              <div>
                <div className="ant-form-item-required">Document Name</div>
                <div className={"ant-form-item-control"}>
                  <Input
                    name="document_name"
                    value={this.state.local_filename}
                    onBlur={() => {
                      console.log("On----Blur");
                    }}
                    onChange={evt => {
                      const value = evt.target.value;
                      this.setState({
                        local_filename: value
                      });
                    }}
                  />

                  {/* Errors */}
                  <div className="ant-form-explain">
                    {"This field is required."}
                  </div>
                </div>
              </div>
              <br />
              <div className="generic-btn-wrapper">
                <Button
                  loading={false}
                  type="primary"
                  onClick={this.handleSavePrescriptionInfo}
                >
                  Save File Details
                </Button>
                <Button loading={false} type="default" onClick={() => {}}>
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
          <Table
            loading={false}
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

const mapStateToProps = state => ({
  files: state.prescriptionInfoProductManagementReducers.files
});

const mapDispatchToProps = {
  fetchPrescriptionInfo,
  savePrescriptionInfo,
  deleletPrescriptionInfo,
  saveEditedDocumentInPrescriptionInfo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrescriptionInfo);
