import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Upload, Icon, message, Button } from "antd";
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
    </ul>
];

const ImageUploader = ({ auth, getImage, ...props }) => {
    const [uploading, setUploading] = useState(false);
    const [uploadedFileList, setUploadedFileList] = useState([]);

    const { setFieldValue, values } = useFormikContext();

    useEffect(() => {
        console.log("in effect", uploadedFileList);
        // if no images set formik status
        // uploadedFileList.length === 0
        //     ? setImageFormFieldStatus("image_gallery", "")
        //     : null;
    }, [uploadedFileList, setUploadedFileList]);

    const handleRemove = file => {
        console.log(file);
        const index = uploadedFileList.indexOf(file);
        const newFileList = uploadedFileList.slice();
        newFileList.splice(index, 1);
        setUploadedFileList(newFileList);

        console.log(uploadedFileList);
    };

    const handleBeforeUpload = file => {
        console.log(file, "BEFORE UPLOAD");
        setUploadedFileList([...uploadedFileList, file]);
        console.log(uploadedFileList, "UPDATED AFTER UPLOAD");
        return false;
    };

    const handleChange = ({ file, fileList }) => {
        console.log(file, "on change");

        // Generate a file image blob
        Resizer.imageFileResizer(
            file,
            1000,
            600,
            "JPEG",
            100,
            0,
            uri => {
                console.log(uri);
                getImage("image_gallery", uri);
            },
            "blob"
        );
        setImageFormFieldStatus("image_gallery", "1");
    };

    // Set current value unto formik values - used to trigger isDirty boolean
    const setImageFormFieldStatus = (name, output) => {
        return setFieldValue(name, output);
    };

    const handleUpload = () => {
        console.log(uploadedFileList, "UPLOADED LIST");
        const formData = new FormData();

        uploadedFileList.forEach(file => {
            console.log("File uploaded", file);
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
                const file = uploadedFileList[0];
                console.log(file);

                setUploading(false);
                message.success("upload successfully.");
            })
            .catch(err => {
                console.log(err.response);
                setUploading(false);
                message.error(
                    err.response
                        ? err.response.data.error
                        : "Oops! Something went wrong!"
                );
            });
    };

    // Handle clearing of images
    const handleClearImages = () => {
        setUploadedFileList([]);
        setImageFormFieldStatus("image_gallery", "");
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
                    onClick={handleClearImages}
                    disabled={uploadedFileList.length === 0}
                >
                    Clear images
                </Button>
            </div>
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
