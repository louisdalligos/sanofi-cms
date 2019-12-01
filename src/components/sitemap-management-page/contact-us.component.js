import React, { Component, Fragment } from "react";
import { Button, Input, Spin, Alert } from "antd";
import { connect } from "react-redux";
import {
  createMiscContent,
  updateMiscContent
} from "../../redux/actions/miscellaneous-actions/miscellaneousAction";

class ContactUsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prevValue: null,
      prevIsExist: false,
      curValue: "",
      isValidURL: true
    };
    this.handleRequests = this.handleRequests.bind(this);
  }

  // NEW: componentWillReceiveprops()
  static getDerivedStateFromProps(props, state) {
    if (
      props.value !== state.prevValue ||
      props.isExist !== state.prevIsExist
    ) {
      return {
        prevValue: props.value,
        prevIsExist: props.isExist,
        curValue: props.value
      };
    }
    return null;
  }

  componentDidMount() {
    this.state.curValue.length &&
      this.setState({
        isValidURL: this.isUrlValid(this.state.curValue)
      });
  }

  handleRequests() {
    if (!this.state.isValidURL) return;

    const { prevIsExist, curValue } = this.state;
    const payload = {
      type: "contact_us_url",
      content: curValue
    };
    if (prevIsExist) this.props.updateMiscContent(payload);
    else this.props.createMiscContent(payload);
  }

  isUrlValid(userInput) {
    var res = userInput.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    if (res == null) return false;
    else return true;
  }

  render() {
    const { isLoading } = this.props;
    const { isValidURL } = this.state;
    const borderStyle = {
      border: !isValidURL ? "1px solid red" : "1px solid rgb(217, 217, 217)"
    };

    return (
      <Spin spinning={isLoading}>
        <div className="generic-wrapper">
          {(this.props.errorMessage.length &&
            (() => (
              // Manual prompt validation
              <Alert
                className="alert-custom-style"
                message={this.props.errorMessage}
                type="error"
              />
            ))()) || <span></span>}

          <Input
            style={borderStyle}
            type="text"
            onChange={evt => {
              const isValidURL = this.isUrlValid(evt.target.value);
              this.setState({
                curValue: evt.target.value,
                isValidURL
              });
            }}
            value={this.state.curValue}
          />

          {(this.state.curValue &&
            this.state.curValue.length &&
            !isValidURL &&
            (() => (
              // Manual prompt validation
              <p style={{ color: "red", margin: "10px 0 20px" }}>
                Invalid format, kindly provide a valid url address.
              </p>
            ))()) || <span></span>}

          <div className="generic-btn-wrapper">
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
)(ContactUsComponent);
