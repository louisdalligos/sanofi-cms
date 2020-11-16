import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Upload, Icon, message, Button, Spin } from "antd";
import { useFormikContext } from "formik";

import axios from "axios";
import { API } from "../../../utils/api";

import { renameKeys } from "../../../utils/helper";

// library
import Resizer from "../../library/ImageResizer";

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const description = [
  <ul style={{ marginTop: 20 }}>
    <li>
      <small>PNG/JPG</small>
    </li>
    <li>
      <small>Maximum file size of 25mb</small>
    </li>
  </ul>
];

const ImageUploader = ({ auth, data, ...props }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadedFileList, setUploadedFileList] = useState([]);
  const [isSpinning, setIsSpinning] = useState(true);

  const { setFieldValue, values } = useFormikContext();

  useEffect(() => {
    console.log("in effect", uploadedFileList);
  }, [uploadedFileList, setUploadedFileList]);

  useEffect(() => {
    console.log(data);
    // temp data
    setUploadedFileList(data);
    setIsSpinning(false);
    console.log(uploadedFileList);
    //eslint-disable-next-line
  }, [data]);

  const handleRemove = file => {
    setUploading(true);

    axios({
      url: `${API}/products/file/delete/${file.id}`,
      method: "delete",
      headers: {
        Authorization: `Bearer ${auth.access_token}`
      }
    })
      .then(() => {
        setUploading(false);
        message.success("Successfully deleted file");

        const index = uploadedFileList.indexOf(file);
        const newFileList = uploadedFileList.slice();
        newFileList.splice(index, 1);
        setUploadedFileList(newFileList);
        setImageFormFieldStatus("image_gallery", newFileList);
      })
      .catch(err => {
        console.log(err);
        setUploading(false);
        message.error("Oops! Something went wrong!");
      });
  };

  const handleBeforeUpload = file => {
    setUploadedFileList([...uploadedFileList, file]);

    return false;
  };

  const handleChange = ({ file, fileList }) => {
    setImageFormFieldStatus("image_gallery", [...uploadedFileList, file]);
  };

  // Set current value unto formik values - used to trigger isDirty boolean
  const setImageFormFieldStatus = (name, output) => {
    return setFieldValue(name, output);
  };

  const handleUpload = () => {
    const formData = new FormData();

    uploadedFileList.forEach(file => {
      formData.append("image", file);
    });

    setUploading(true);

    axios({
      url: `${API}/gallery/check-image`,
      method: "post",
      headers: {
        Authorization: `Bearer ${auth.access_token}`
      },
      data: formData
    })
      .then(async () => {
        // set our file
        //const file = uploadedFileList[0];

        setUploading(false);
        message.success("upload successfully.");
      })
      .catch(err => {
        setUploading(false);
        message.error(
          err.response ? err.response.data.error : "Oops! Something went wrong!"
        );
      });
  };

  // were running out of time - do this @refactor
  let response = [];
  async function deleteImages() {
    try {
      await uploadedFileList.forEach(file => {
        response[file] = axios.delete(
          `${API}/products/file/delete/${file.id}`,
          {
            headers: {
              Authorization: `Bearer ${auth.access_token}`
            }
          }
        );
      });
      message.success("Product file successfully deleted!");
      setUploadedFileList([]);
      setImageFormFieldStatus("image_gallery", []);

      console.log(response);
    } catch (err) {
      message.error("Unable to process your request");
    }
  }

  return (
    <Fragment>
      <Spin indicator={antIcon} spinning={isSpinning}>
        <Upload
          onRemove={handleRemove}
          beforeUpload={handleBeforeUpload}
          onChange={handleChange}
          fileList={uploadedFileList}
          accept="image/*"
        >
          <Button disabled={uploadedFileList.length === 5}>
            <Icon type="upload" /> Select File
          </Button>
        </Upload>

        {description}

        <div className="upload-gallery-action">
          <Button
            type="primary"
            onClick={handleUpload}
            loading={uploading}
            style={{ marginTop: 16 }}
            disabled={uploadedFileList.length < 3}
          >
            {uploading ? "Uploading..." : "Upload"}
          </Button>

          <Button
            type="link"
            onClick={deleteImages}
            disabled={uploadedFileList.length === 0}
          >
            Clear images
          </Button>
        </div>
      </Spin>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.authReducer
  };
};

export default connect(
  mapStateToProps,
  null
)(ImageUploader);
