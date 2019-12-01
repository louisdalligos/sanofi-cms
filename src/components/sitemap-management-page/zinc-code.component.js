// TODO: Add validation on "_ _ _ _" should be empty

import React, { Component, Fragment } from "react";
import { Input, Button, Spin, Row, Col, Icon, Tooltip, Alert } from "antd";
import { sampleZincFormat } from "../../utils/constant";

import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import ZincCodeFormField from "../smart-form/ZincCodeFormField";

import { connect } from "react-redux";
import {
  createMiscContent,
  updateMiscContent,
  addSpecialMessage
} from "../../redux/actions/miscellaneous-actions/miscellaneousAction";

const schema = Yup.object().shape({
  zinc_code1: Yup.string().required("Required field"),
  zinc_code2: Yup.string().required("Required field"),
  zinc_code3: Yup.string().required("Required field")
});

class ZincCodeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zincCode1: "",
      zincCode2: "",
      zincCode3: "",

      prevValue: null,
      prevIsExist: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // NEW: componentWillReceiveprops()
  static getDerivedStateFromProps(props, state) {
    if (
      props.value !== state.prevValue ||
      props.isExist !== state.prevIsExist
    ) {
      const format = props.value.split(",") || "";
      return {
        prevValue: props.value,
        prevIsExist: props.isExist,
        // read-only
        zincCode1: format[0] || "",
        zincCode2: format[1] || "",
        zincCode3: format[2] || ""
      };
    }
    return null;
  }

  handleSubmit(values, action) {
    if (
      values.zinc_code1.indexOf("_") !== -1 ||
      values.zinc_code2.indexOf("_") !== -1 ||
      values.zinc_code3.indexOf("_") !== -1
    ) {
      // return alert(JSON.stringify(values));
      return this.props.addSpecialMessage("Invalid or Incomplete inputs.");
    }

    const finalValue = `${values.zinc_code1},${values.zinc_code2},${values.zinc_code3}`;

    const { prevIsExist } = this.state;
    const payload = {
      type: "zinc_code",
      content: finalValue
    };

    if (prevIsExist) this.props.updateMiscContent(payload);
    else this.props.createMiscContent(payload);
  }

  render() {
    const description = sampleZincFormat;
    const { zincCode1, zincCode2, zincCode3 } = this.state;
    const { isLoading } = this.props;

    return (
      <Spin spinning={isLoading}>
        <div className="generic-wrapper">
          {(this.props.errorMessage.length && (
            <Alert
              className="alert-custom-style"
              message={this.props.errorMessage}
              type="error"
            />
          )) ||
            ""}

          <Formik
            initialValues={{
              zinc_code1: zincCode1,
              zinc_code2: zincCode2,
              zinc_code3: zincCode3
            }}
            onSubmit={this.handleSubmit}
            validationSchema={schema}
            validateOnChange={true}
            validateOnBlur={true}
          >
            {props => (
              <Form className="therapy-article-form">
                <Row gutter={24}>
                  <Col xs={24} md={4}>
                    <span>Zinc Code Format </span>
                    <Tooltip placement="top" title={description}>
                      <Icon type="info-circle" style={{ color: "#1890ff" }} />
                    </Tooltip>
                  </Col>

                  <Col xs={24} md={20}>
                    <ZincCodeFormField
                      className="zinc-code-field1"
                      name="zinc_code1"
                      type="text"
                      onChange={props.setFieldValue}
                      maskValidation="AAAA.AAA.11.11.11"
                    />
                    <ZincCodeFormField
                      className="zinc-code-field2"
                      name="zinc_code2"
                      type="text"
                      onChange={props.setFieldValue}
                      maskValidation="Version 1.1"
                    />
                    <ZincCodeFormField
                      className="zinc-code-field3"
                      name="zinc_code3"
                      type="text"
                      onChange={props.setFieldValue}
                      maskValidation="11 A** 1111"
                    />
                  </Col>
                </Row>

                <div className="generic-btn-wrapper">
                  <Button type="primary" htmlType="submit">
                    {" "}
                    Apply Changes
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
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
  updateMiscContent,
  addSpecialMessage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ZincCodeComponent);
