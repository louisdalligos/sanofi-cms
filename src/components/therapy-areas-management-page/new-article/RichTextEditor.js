import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = ({ getEditorContentCallback, ...props }) => {
  const [editorHtml, setEditorHTML] = useState("");

  const handleTextEditorChange = html => {
    setEditorHTML(html);
    getEditorContentCallback(html);
  };

  return (
    <>
      <div
        className={
          props.error && props.touched
            ? "has-feedback has-error ant-form-item-control"
            : "ant-form-item-control"
        }
      >
        <ReactQuill
          theme="snow"
          onChange={handleTextEditorChange}
          // onBlur={handleBlur}
          value={editorHtml}
          modules={RichTextEditor.modules}
          formats={RichTextEditor.formats}
          placeholder={props.placeholder}
        />
      </div>
    </>
  );
};

RichTextEditor.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
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

RichTextEditor.formats = [
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

RichTextEditor.propTypes = {
  placeholder: PropTypes.string
};

export default RichTextEditor;
