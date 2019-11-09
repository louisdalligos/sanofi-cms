import React, { Fragment, useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Upload, Icon, message, Button } from "antd";
import axios from "axios";
import { API } from "../../../utils/api";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const ImageUploader = ({ auth, ...props }) => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [showThumbnails, setShowThumbnails] = useState(false);
  const canvasRef = useRef(null);

  // const generateCanvas = () => {
  //   const canvas = canvasRef.current;
  //   const ctx = canvas.getContext("2d");
  //   const image = new Image();
  //   image.onload = function() {
  //     ctx.drawImage(image, 0, 0);
  //   };
  //   image.src = previewImage;
  // };

  useEffect(() => {
    //generateCanvas();
  }, []);

  const handleChange = info => {
    let list = [...info.fileList];
    console.log(list);
    console.log(fileList);
    // Only to show the recent uploaded file
    //list = fileList.slice(-1);
    //setFileList({ list });
  };

  const handleUpload = () => {
    const formData = new FormData();

    fileList.forEach(file => {
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
      .then(async res => {
        console.log(res);
        console.log(fileList[0]);
        setUploading(false);
        const imgString = await getBase64(fileList[0]);
        setPreviewImage(imgString);
        console.log(previewImage);
        message.success("upload successfully.");
        setShowThumbnails(true);
      })
      .catch(err => {
        console.log(err);
        setUploading(false);
        // message.error(
        //   err.response.data.error ? err.response.data.error : "Oops error"
        // );
      });
  };

  const properties = {
    onRemove: file => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      return {
        fileList: newFileList
      };
    },
    beforeUpload: file => {
      setFileList([...fileList, file]);
      return false;
    },
    onChange: handleChange
  };

  return (
    <Fragment>
      <Upload {...properties} fileList={fileList}>
        <Button>
          <Icon type="upload" /> Select File
        </Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? "Generating thumbnails" : "Generate thumbnails"}
      </Button>

      {showThumbnails ? (
        <div>
          <img alt="example" style={{ width: "300px" }} src={previewImage} />
          show
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
