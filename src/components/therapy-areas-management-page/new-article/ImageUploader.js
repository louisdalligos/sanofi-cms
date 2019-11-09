import React, { Fragment, useState, useEffect } from "react";
import { Upload, Icon, message, Button } from "antd";

const ImageUploader = props => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {};
  }, []);

  // Upload image manipulation
  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  // Validate our file type and size
  function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
      return;
    }
    const isLt100M = file.size / 1024 / 1024 < 100;
    if (!isLt100M) {
      message.error("Image must smaller than 100MB!");
      return;
    }
    return isJpgOrPng && isLt100M;
  }

  // on upload image
  const dummyRequest = ({ file, onSuccess }) => {
    console.log(file);
    props.setGeneratedImages(file);
    //setfeaturedImageInfo(file); // set the file to state - to be used on append
    //setmastheadImageInfo(file);
    //setthumbnailImageInfo(file);
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const handleImageUploadChange = info => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, imageUrl => {
        setImageUrl(imageUrl);
        setLoading(false);
      });
    }
  };

  const handleTransform = file => {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const canvas = document.createElement("canvas");
        const img = document.createElement("img");
        img.src = reader.result;
        img.onload = () => {
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          ctx.fillStyle = "red";
          ctx.textBaseline = "middle";
          ctx.fillText("Ant Design", 20, 20);
          canvas.toBlob(resolve);
        };
      };
    });
  };

  return (
    <>
      <Upload
        name="avatar"
        showUploadList={true}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        transformFile={handleTransform}
        //beforeUpload={beforeUpload}
        onChange={handleImageUploadChange}
        customRequest={dummyRequest}
      >
        <Button type="primary">
          <Icon type="upload" /> Upload
        </Button>
      </Upload>

      {/* handle our thumbnails */}
      <div className="preview-image">
        <h3>
          Preview:
          <small>(Images are optimized and cropped automatically)</small>
        </h3>

        {imageUrl ? (
          <div>
            <img
              src={imageUrl}
              id="imageToCrop"
              alt=""
              style={{
                maxWidth: "100%",
                marginBottom: 20
              }}
            />

            {/* <canvas
                            ref="featuredCanvas"
                            width={300}
                            height={300}
                        ></canvas> */}
            {/* <ThumbnailGenerator /> */}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ImageUploader;
