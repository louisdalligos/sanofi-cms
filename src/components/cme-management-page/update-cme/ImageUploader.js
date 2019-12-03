import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Upload, Icon, message, Button, Spin } from "antd";
import { useFormikContext } from "formik";

import axios from "axios";
import { API } from "../../../utils/api";

// library
import Resizer from "../../library/ImageResizer";

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

const ImageUploader = ({ auth, ...props }) => {
    const [uploadedFileList, setUploadedFileList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [featuredImage, setFeaturedmage] = useState("");
    const [thumbnailImage, setThumbnailImage] = useState("");
    const [showThumbnails, setShowThumbnails] = useState(false);
    const [isSpinning, setIsSpinning] = useState(true);
    const [isDisabled, setIsDisabled] = useState(true);

    const { setFieldValue, values } = useFormikContext();

    useEffect(() => {
        if (values.featured) {
            setShowThumbnails(true);
            setFeaturedmage(values.thumbnail);
            setThumbnailImage(values.thumbnail);
            setIsDisabled(false);
        } else {
            setIsSpinning(false);
            setIsDisabled(true);
        }
    }, [values.featured]);

    useEffect(() => {
        if (uploadedFileList.length > 1) {
            uploadedFileList.shift();
        }

        console.log("in effect", uploadedFileList);
    }, [uploadedFileList, setUploadedFileList]);

    const handleRemove = file => {
        console.log(file);
        const index = uploadedFileList.indexOf(file);
        const newFileList = uploadedFileList.slice();
        newFileList.splice(index, 1);
        setUploadedFileList(newFileList);
        setImageFormFieldStatus("featured", "");
        setImageFormFieldStatus("thumbnail", "");
        setIsSpinning(false);
    };

    const handleBeforeUpload = file => {
        console.log(file, "BEFORE UPLOAD");
        setUploadedFileList([...uploadedFileList, file]);
        console.log(uploadedFileList, "UPDATED AFTER UPLOAD");
        return false;
    };

    const handleChange = ({ file, fileList }) => {
        console.log(file, "on change");
        // let files = [...uploadedFileList];
        // console.log(files);
        // if (files.length > 1) {
        //   files = files.slice(-1);
        //   // set our state
        //   setUploadedFileList({ files });
        //   console.log("updated", fileList);
        // }
    };

    // Set current value unto formik values - used to trigger isDirty boolean
    const setImageFormFieldStatus = (name, output) => {
        return setFieldValue(name, output);
    };

    // Handle clearing of images
    const handleClearImages = () => {
        setUploadedFileList([]);
        console.log("clear", uploadedFileList);
        setImageFormFieldStatus("featured", "");
        setImageFormFieldStatus("thumbnail", "");
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

                // Generate featured - blob
                Resizer.imageFileResizer(
                    file,
                    1000,
                    600,
                    "JPEG",
                    100,
                    0,
                    uri => {
                        console.log(uri);

                        setImageFormFieldStatus("featured", uri);
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
                        console.log(uri);
                        setThumbnailImage(uri);
                    },
                    "base64"
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
                        console.log(uri);
                        setImageFormFieldStatus("thumbnail", uri);
                    },
                    "blob"
                );

                setUploading(false);
                message.success("upload successfully.");
                setShowThumbnails(true);
            })
            .catch(err => {
                console.log(err.response);
                setIsSpinning(false);
                setUploading(false);
                message.error(
                    err.response
                        ? err.response.data.error
                        : "Oops! Something went wrong!"
                );
            });
    };

    return (
        <Fragment>
            <Upload
                onRemove={handleRemove}
                beforeUpload={handleBeforeUpload}
                onChange={handleChange}
                fileList={uploadedFileList}
                accept="image/*"
            >
                <Button>
                    <Icon type="upload" /> Select File
                </Button>
            </Upload>

            {description}

            <Button
                type="primary"
                onClick={handleUpload}
                disabled={isDisabled}
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
                        <Button
                            type="link"
                            onClick={handleClearImages}
                            disabled={isDisabled}
                        >
                            Clear images
                        </Button>
                    </div>
                    <small style={{ marginBottom: 20, display: "block" }}>
                        Images are optimized and cropped automatically
                    </small>

                    {values.featured ? (
                        <div>
                            <h4>Featured</h4>
                            <img
                                alt=""
                                style={{ width: "300px" }}
                                src={featuredImage}
                            />
                            <h4>Thumbnail</h4>
                            <img
                                alt=""
                                style={{ width: "180px" }}
                                src={thumbnailImage}
                            />
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
        auth: state.authReducer
    };
};

export default connect(
    mapStateToProps,
    null
)(ImageUploader);
