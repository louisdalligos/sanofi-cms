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
import TextFormField from "../smart-form/TextFormField";

const schema = Yup.object().shape({
  zinc_code: Yup.string().required("Required field")
});

class ZincCodeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prevValue: null,
      prevIsExist: false,
      zincCode: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
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
        zincCode: props.value
      };
    }
    return null;
  }

  handleSubmit(values, action) {
    if (!values.zinc_code) {
      // return alert(JSON.stringify(values));
      return this.props.addSpecialMessage("Should provide a valid Zinc Code.");
    }
    const { prevIsExist } = this.state;
    const payload = {
      type: "zinc_code",
      content: values.zinc_code
    };

    if (prevIsExist) this.props.updateMiscContent(payload);
    else this.props.createMiscContent(payload);
  }

  render() {
    const description = sampleZincFormat;
    const { zincCode } = this.state;
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
              zinc_code: zincCode
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
                    {/* <ZincCodeFormField
                                            className="zinc-code-field1"
                                            name="zinc_code1"
                                            type="text"
                                            onChange={props.setFieldValue}
                                            maskValidation="AAAA.AAA.11.11.11"
                                        />
                                        <div className="zinc-code-field2 zinc-code-version">
                                            <span className="version">
                                                Version
                                            </span>
                                            <ZincCodeFormField
                                                className="number"
                                                name="zinc_code2"
                                                type="text"
                                                onChange={props.setFieldValue}
                                                // maskValidation="Version 1.1"
                                                maskValidation="1.1"
                                            />
                                        </div>
                                        <ZincCodeFormField
                                            className="zinc-code-field3"
                                            name="zinc_code3"
                                            type="text"
                                            onChange={props.setFieldValue}
                                            maskValidation="11 A** 1111"
                                        /> */}
                    <TextFormField
                      name="zinc_code"
                      type="text"
                      size="small"
                      placeholder="Enter the zinc code"
                      onChange={props.setFieldValue}
                      maxCountAllowed={150}
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
