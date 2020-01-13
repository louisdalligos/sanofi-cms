/*  [Doms]
    Planned Components that will use centralize
    when have time to refactor. 
*/

import React, { Component, Fragment } from "react";
import ZincCodeFormField from "../smart-form/ZincCodeFormField";

class ZincCodeInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zincCode1: null,
      zincCode2: null,
      zincCode3: null
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.prevValue) {
      const format = props.value.split("|") || "";
      return {
        prevValue: props.value,
        // read-only
        zincCode1: format[0] || "",
        zincCode2: format[1] || "",
        zincCode3: format[2] || ""
      };
    }
    return null;
  }
  render() {
    return (
      <Fragment>
        <ZincCodeFormField
          className="zinc-code-field1"
          name="zinc_code1"
          type="text"
          onChange={() => {}}
          maskValidation="AAAA.AAA.11.11.11"
        />
        <ZincCodeFormField
          className="zinc-code-field2"
          name="zinc_code2"
          type="text"
          onChange={() => {}}
          maskValidation="Version 1.1"
        />
        <ZincCodeFormField
          className="zinc-code-field3"
          name="zinc_code3"
          type="text"
          onChange={() => {}}
          maskValidation="11 A** 1111"
        />
      </Fragment>
    );
  }
}

export default ZincCodeInput;
