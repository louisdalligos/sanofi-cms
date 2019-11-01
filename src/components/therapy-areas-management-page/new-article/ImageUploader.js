import React from "react";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";

const Preview = ({ meta }) => {
  const { name, percent, status } = meta;
  return (
    <span
      style={{
        alignSelf: "flex-start",
        margin: "10px 3%",
        fontFamily: "Helvetica"
      }}
    >
      {name}, {Math.round(percent)}%, {status}
    </span>
  );
};

const ImageUploader = () => {
  const getUploadParams = () => ({ url: "https://httpbin.org/post" });

  const handleChangeStatus = ({ meta }, status) => {
    console.log(status, meta);
  };

  const handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta));
    allFiles.forEach(f => f.remove());
  };

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onSubmit={handleSubmit}
      onChangeStatus={handleChangeStatus}
      PreviewComponent={Preview}
      inputContent="Drag files or browse"
      styles={{ dropzone: { minHeight: 200, maxHeight: 250 } }}
    />
  );
};

export default ImageUploader;
