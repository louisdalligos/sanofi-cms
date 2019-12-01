import React, { Component, Fragment } from "react";
import ReactQuill from "react-quill";
import ReactQuillSetup from "./ReactQuill.setup";
import { Button, Spin, Alert } from "antd";
import { connect } from "react-redux";
import {
  createMiscContent,
  updateMiscContent
} from "../../redux/actions/miscellaneous-actions/miscellaneousAction";
import { stripHtmlTags } from "./helpers/html";

class LegalDisclaimerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prevValue: null,
      prevIsExist: false
    };
    this.runtime = {
      value: ""
    };
    this.handleRequests = this.handleRequests.bind(this);
    this.fixedViewWhileLoading = this.fixedViewWhileLoading.bind(this);
  }

  // NEW: componentWillReceiveprops()
  static getDerivedStateFromProps(props, state) {
    if (
      props.value !== state.prevValue ||
      props.isExist !== state.prevIsExist
    ) {
      return {
        prevValue: props.value,
        prevIsExist: props.isExist
      };
    }
    return null;
  }

  componentDidMount() {
    this.runtime.value = this.props.value || "";
  }

  handleRequests() {
    const { prevIsExist } = this.state;
    let withoutSpace,
      value = "";
    const payload = {
      type: "legal_disclaimer",
      content: ""
    };
    if (this.runtime.value.length === 0) {
      value = "";
      payload.content = value;
    } else {
      // remove tags
      value = stripHtmlTags(this.runtime.value);
      // verify if removed tags and trim spaces has value
      withoutSpace = value.replace(/\s/g, "");

      if (withoutSpace.length === 0) payload.content = "";
      else payload.content = this.runtime.value;
    }

    if (prevIsExist) this.props.updateMiscContent(payload);
    else this.props.createMiscContent(payload);
  }

  fixedViewWhileLoading() {
    const { value, isLoading } = this.props;
    return isLoading ? this.runtime.value : value;
  }

  render() {
    const { value, isLoading } = this.props;

    return (
      <Spin spinning={isLoading}>
        <div className="rtc-wrapper">
          {(this.props.errorMessage.length && (
            <Alert
              className="alert-custom-style"
              message={this.props.errorMessage}
              type="error"
            />
          )) ||
            ""}

          <ReactQuill
            theme="snow"
            placeholder="Write something..."
            modules={ReactQuillSetup.modules()}
            formats={ReactQuillSetup.formats()}
            value={this.fixedViewWhileLoading()}
            onChange={value => {
              this.runtime.value = value;
            }}
          />
          <div className="rtc-btn-wrapper">
            <Button type="primary" onClick={this.handleRequests}>
              <span>Apply Changes</span>
            </Button>
          </div>
        </div>
      </Spin>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.miscellaneousReducer.isLoading,
  errorMessage: state.miscellaneousReducer.errorMessage
});
const mapDispatchToProps = {
  createMiscContent,
  updateMiscContent
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LegalDisclaimerComponent);
