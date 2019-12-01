import React, { Component, Fragment } from "react";
import { message } from "antd";
import { connect } from "react-redux";

class CentralizeToastr extends Component {
  render() {
    const { toastr } = this.props;
    return (
      <Fragment>
        {toastr &&
          (() => {
            toastr.type === "error"
              ? message.error(toastr.message)
              : message.success(toastr.message);
            return "";
          })()}

        <h1>Kargado</h1>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  toastr: state.centralizeToastrReducers.toastr
});

export default connect(
  mapStateToProps,
  null
)(CentralizeToastr);
