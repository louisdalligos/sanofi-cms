import React from "react";
import { useField } from "formik";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditorFormField = ({ className, values, ...props }) => {
  const [field, meta] = useField(props);

  const handleSelectChange = value => {
    props.onChange(field.name, value);
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

TextEditorFormField.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: "3" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" }
    ],
    ["link", "image", "video"],
    ["clean"]
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
};

TextEditorFormField.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video"
];

export default TextEditorFormField;
