import React, { Fragment, useEffect } from "react";

import { blobToBase64 } from "../../../utils/helper";

const ImagePreview = ({ data, ...props }) => {
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <Fragment>
      <ul style={{ marginTop: 30 }}>
        <li>
          <small>PNG/JPG</small>
        </li>
        <li>
          <small>Maximum file size of 25mb</small>
        </li>
        <li>
          <small>Minimum width of 940px and height of 400px</small>
        </li>
      </ul>

      <h3>Preview:</h3>
      <small>Images are optimized and cropped automatically</small>

      {/* {data.map(i => {
        blobToBase64(i, null);
      })} */}
    </Fragment>
  );
};

export default ImagePreview;
