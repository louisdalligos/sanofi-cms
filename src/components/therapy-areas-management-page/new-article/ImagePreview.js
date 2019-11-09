import React, { Fragment } from "react";

const ImagePreview = props => {
  return (
    <Fragment>
      <h3>Preview:</h3>
      <small>Images are optimized and cropped automatically</small>
      <div id="preview"></div>
    </Fragment>
  );
};

export default ImagePreview;
