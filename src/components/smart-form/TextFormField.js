import React, { Fragment } from "react";

const TextFormField = ({ field, form, ...props }) => {
  return (
    <div>{console.log("test", field)}</div>
    // <Fragment>
    //   <div
    //     className={
    //       form.touched && form.error
    //         ? "has-feedback has-error ant-form-item-control"
    //         : "ant-form-item-control"
    //     }
    //   >
    //     <label>Label</label>
    //     <input className="ant-input" {...field} {...props} />

    //     {form.touched && form.error ? (
    //       <div className="ant-form-explain">{form.error}</div>
    //     ) : null}
    //   </div>
    // </Fragment>
  );
};

export default TextFormField;
