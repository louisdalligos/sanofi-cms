import React, { Component, Fragment } from "react";
import { message } from "antd";
import { connect } from "react-redux";
import { centralizeToastClear } from "../CentralizeToastr/centralize-toastr.action";

class CentralizeToastr extends Component {
  componentDidMount() {
    message.config({
      maxCount: 3
      // duration: 3
    });
  }
  cleanupOnRender() {
    // hackish
    const d = setTimeout(() => {
      clearTimeout(d);
      this.props.centralizeToastClear();
    }, 300);
  }
  render() {
    const { toastr } = this.props;
    return (
      <Fragment>
        {toastr !== null &&
          (() => {
            toastr.type === "error"
              ? message.error(toastr.message)
              : message.success(toastr.message);

            this.cleanupOnRender();
            return "";
          })()}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  toastr: state.centralizeToastrReducers.toastr
});

export default connect(
  mapStateToProps,
  { centralizeToastClear }
)(CentralizeToastr);
