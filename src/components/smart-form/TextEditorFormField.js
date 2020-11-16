import React, { useEffect } from "react";
import { useField } from "formik";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

import copyrightSymbol from "../../assets/copyright-symbol.svg";
import registeredSymbol from "../../assets/registered.svg";
import trademarkSymbol from "../../assets/trademark.svg";

import { setFormDirty } from "../../redux/actions/form-actions/formActions";

// Implement and register module
Quill.register("modules/counter", function(quill, options) {
  var container = document.querySelector("#counter");
  quill.on("text-change", function() {
    var text = quill.getText();
    // There are a couple issues with counting words
    // this way but we'll fix these later
    container.innerText = text.split(/\s+/).length;
  });
});

const TextEditorFormField = ({ className, values, setFormDirty, ...props }) => {
  const [field, meta] = useField(props);

  useEffect(() => {
    console.log("Mounting");

    document.querySelector(
      ".ql-copyright"
    ).innerHTML = `<img src='${copyrightSymbol}' />`;

    document.querySelector(
      ".ql-trademark"
    ).innerHTML = `<img src='${trademarkSymbol}' />`;

    document.querySelector(
      ".ql-registered"
    ).innerHTML = `<img src='${registeredSymbol}' />`;
  }, []);

  const handleSelectChange = value => {
    props.onChange(field.name, value);
    //setFormDirty(true);
  };

  const handleSelectBlur = value => {
    //console.log(value);
  };

  return (
    <div
      className={
        meta.touched && meta.error
          ? `${className} has-feedback has-error ant-form-item-control`
          : `${className} ant-form-item-control`
      }
    >
      <ReactQuill
        theme="snow"
        placeholder="Write something..."
        modules={TextEditorFormField.modules}
        formats={TextEditorFormField.formats}
        onChange={handleSelectChange}
        onBlur={handleSelectBlur}
        value={values}
      />
      {meta.touched && meta.error ? (
        <div className="ant-form-explain">{meta.error}</div>
      ) : null}
    </div>
  );
};

function copyright() {
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, "©");
  this.quill.setSelection(cursorPosition + 1);
}

function trademark() {
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, "™");
  this.quill.setSelection(cursorPosition + 1);
}

function registered() {
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, "®");
  this.quill.setSelection(cursorPosition + 1);
}

TextEditorFormField.modules = {
  toolbar: {
    container: [
      [{ header: "1" }, { header: "2" }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" }
      ],
      ["link", "image", "video"],
      ["clean"],
      [{ script: "sub" }, { script: "super" }],
      ["copyright", "trademark", "registered"]
    ],
    handlers: {
      copyright: copyright,
      trademark: trademark,
      registered: registered
    }
  },
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
};

TextEditorFormField.formats = [
  "header",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "script",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "copyright",
  "trademark",
  "registered"
];

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setFormDirty: setFormDirty
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(TextEditorFormField);
