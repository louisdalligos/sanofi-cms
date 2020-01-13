import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Upload, Icon, message, Button, Spin } from "antd";
import { useFormikContext, useField } from "formik";

// library
import Resizer from "../library/ImageResizer";

// redux actions
import { checkImage } from "../../redux/actions/post-management-actions/postManagementActions";

const description = [
  <ul style={{ marginTop: 20 }}>
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
];

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const ImageUploader = ({
  isOnEditMode,
  checkImage,
  notifs,
  mastHeadLabel,
  featuredLabel,
  thumbnailLabel,
  hideImage,
  ...props
}) => {
  const [uploadedFileList, setUploadedFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [featuredImage, setFeaturedmage] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState("");
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [isSpinning, setIsSpinning] = useState(true);
  const [disabledGenerateButton, setDisabledGenerateButton] = useState(true);
  const [inlineErrorMsg, setInlineErrorMsg] = useState(null);

  // formik
  const { setFieldValue, values } = useFormikContext();
  const [field, meta] = useField(props);
  const name = field.name;

  useEffect(() => {
    if (isOnEditMode) {
      if (
        (values.masthead && typeof values.masthead === "string") ||
        (values.featured && typeof values.featured === "string")
      ) {
        setShowThumbnails(true);
        setFeaturedmage(values.featured);
        setThumbnailImage(values.thumbnail);
        setDisabledGenerateButton(false);
      } else {
        setIsSpinning(false);
        setDisabledGenerateButton(true);
      }
    }

    setDisabledGenerateButton(false);

    return () => {
      console.log("Unmounting");
    };
  }, [values.masthead, values.featured]);

  useEffect(() => {
    switch (notifs.id) {
      case "CHECK_IMAGE_SUCCESS":
        const file = uploadedFileList[0];

        // Generate featured image
        Resizer.imageFileResizer(
          file,
          1000,
          600,
          "JPEG",
          100,
          0,
          uri => {
            console.log(uri);
            setFeaturedmage(uri);
          },
          "base64"
        );

        // Generate masthead image - blob
        Resizer.imageFileResizer(
          file,
          1000,
          600,
          "JPEG",
          100,
          0,
          uri => {
            //@todo - for refactor - use React memo
            setImageFormFieldStatus("masthead", uri); // set form value status
          },
          "blob"
        );

        // Generate featured image - blob
        Resizer.imageFileResizer(
          file,
          300,
          300,
          "JPEG",
          100,
          0,
          uri => {
            setImageFormFieldStatus("featured", uri); // set form value status
          },
          "blob"
        );

        // Generate thumbnail image - blob
        Resizer.imageFileResizer(
          file,
          300,
          280,
          "JPEG",
          100,
          0,
          uri => {
            setImageFormFieldStatus("thumbnail", uri); // set form value status
          },
          "blob"
        );

        // Generate thumbnail image
        Resizer.imageFileResizer(
          file,
          300,
          280,
          "JPEG",
          100,
          0,
          uri => {
            setThumbnailImage(uri);
          },
          "base64"
        );

        setUploading(false);
        message.success(
          notifs.notifications ? notifs.notifications : "upload successfully."
        );
        setShowThumbnails(true);
        break;
      case "CHECK_IMAGE_FAILED":
        setIsSpinning(false);
        setUploading(false);
        message.error(
          notifs.notifications.error
            ? notifs.notifications.error
            : "Oops! Something went wrong!"
        );
        break;
      default:
        return;
    }
    //eslint-disable-next-line
  }, [notifs.id, notifs.notifications]);

  useEffect(() => {
    if (uploadedFileList.length > 1) {
      uploadedFileList.shift();
    }

    // uploadedFileList.forEach(item => {
    //     if (item.size > 25000000) {
    //         message.error("Please upload an image not exceeding to 25mb");
    //         setDisabledGenerateButton(true);
    //     } else {
    //         setDisabledGenerateButton(false);
    //     }
    //     console.log(item);
    // });
  }, [uploadedFileList, setUploadedFileList]);

  const handleRemove = file => {
    console.log(file);
    const index = uploadedFileList.indexOf(file);
    const newFileList = uploadedFileList.slice();
    newFileList.splice(index, 1);
    setUploadedFileList(newFileList);
    setImageFormFieldStatus("masthead", "");
    setImageFormFieldStatus("featured", "");
    setImageFormFieldStatus("thumbnail", "");
    setIsSpinning(false);
  };

  const handleBeforeUpload = file => {
    const { size } = file;

    if (size > 25000000) {
      setInlineErrorMsg(
        "Invalid attachment, image should not be more than 25mb."
      );
      setDisabledGenerateButton(true);
    } else {
      setUploadedFileList([...uploadedFileList, file]);
      setInlineErrorMsg(null);
      setDisabledGenerateButton(false);
    }
    return false;
  };

  const handleChange = ({ file, fileList }) => {
    //props.onChange(name, file);
    // if (fileList.length > 0 && isOnEditMode) {
    //     setDisabledGenerateButton(false);
    // }
    // setDisabledGenerateButton(true);
  };

  // Set current value unto formik values - used to trigger isDirty boolean
  const setImageFormFieldStatus = (name, output) => {
    return setFieldValue(name, output);
  };

  // Handle clearing of images
  const handleClearImages = () => {
    setUploadedFileList([]);
    console.log("clear", uploadedFileList);
    setImageFormFieldStatus("masthead", "");
    setImageFormFieldStatus("featured", "");
    setImageFormFieldStatus("thumbnail", "");
    setFeaturedmage("");
    setThumbnailImage("");
    setIsSpinning(false);
  };

  const handleUpload = () => {
    console.log(uploadedFileList, "UPLOADED LIST");
    const formData = new FormData();

    uploadedFileList.forEach(file => {
      console.log("File uploaded", file);
      formData.append("image", file);
    });

    setUploading(true);
    setIsSpinning(true);

    checkImage(formData); // redux action
  };

  return (
    <Fragment>
      <div
        className={
          meta.touched && meta.error
            ? "has-feedback has-error ant-form-item-control"
            : "ant-form-item-control"
        }
      >
        <Upload
          onRemove={handleRemove}
          beforeUpload={handleBeforeUpload}
          onChange={handleChange}
          fileList={uploadedFileList}
          accept="image/*"
          name={name}
        >
          <Button disabled={values.featured || uploadedFileList.length > 0}>
            <Icon type="upload" /> Select File
          </Button>
        </Upload>

        {meta.touched && meta.error ? (
          <div className="ant-form-explain">{meta.error}</div>
        ) : null}

        <div className="inline-error-msg">{inlineErrorMsg}</div>
      </div>
      {description}

      <Button
        type="primary"
        onClick={handleUpload}
        disabled={disabledGenerateButton}
        loading={uploading}
        style={{ marginTop: 16, marginBottom: 20 }}
      >
        {uploading ? "Generating thumbnails" : "Generate thumbnails"}
      </Button>

      {showThumbnails ? (
        <div id="preview">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <h3>Preview:</h3>
            <Button type="link" onClick={handleClearImages}>
              Clear images
            </Button>
          </div>
          <small style={{ marginBottom: 20, display: "block" }}>
            Images are optimized and cropped automatically
          </small>

          {values.featured ? (
            <div>
              <h4>{mastHeadLabel ? mastHeadLabel : "Masthead"}</h4>
              <img alt="" style={{ width: "300px" }} src={featuredImage} />

              <h4
                style={{
                  display: hideImage ? "none" : "block"
                }}
              >
                {featuredLabel ? featuredLabel : "Featured"}
              </h4>
              <img
                alt=""
                style={{
                  width: "200px",
                  display: hideImage ? "none" : "block"
                }}
                src={featuredImage}
              />
              <h4>{thumbnailLabel ? thumbnailLabel : "Thumbnail"}</h4>
              <img alt="" style={{ width: "180px" }} src={thumbnailImage} />
            </div>
          ) : (
            <Spin indicator={antIcon} spinning={isSpinning} />
          )}
        </div>
      ) : null}
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    notifs: state.notificationReducer
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      checkImage: checkImage
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageUploader);
