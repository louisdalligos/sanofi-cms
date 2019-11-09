import React, { useEffect, useState } from "react";
import { Button } from "antd";
import uuidv4 from "uuid";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginImageValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import { blobToFile } from "../../../utils/helper";

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageCrop,
  FilePondPluginImageResize,
  FilePondPluginImageTransform,
  FilePondPluginImageValidateSize,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize
);

const ThumbnailGenerator = props => {
  const [files, setFiles] = useState([]);
  const [generatedFiles, setGeneratedFiles] = useState([]);

  useEffect(() => {
    console.log(generatedFiles);
    props.getImages(generatedFiles);
  }, [generatedFiles, setGeneratedFiles]);

  const variants = {
    masthead: transforms => {
      transforms.resize.size.width = 960;
      //transforms.resize.size.height = 400;
      //transforms.crop.aspectRatio = 2.39;
      return transforms;
    },
    feature: transforms => {
      transforms.resize.size.width = 300;
      transforms.resize.size.height = 300;
      transforms.crop.aspectRatio = 1.0;
      return transforms;
    },
    thumbnail: transforms => {
      //transforms.resize.size.width = 300;
      transforms.resize.size.height = 280;
      transforms.crop.aspectRatio = 1.333;
      return transforms;
    }
  };

  const onAddFile = (err, fileItem) => {
    console.log(err, fileItem.getMetadata("resize"));
  };

  const prepareFile = (fileItem, outputFiles) => {
    outputFiles.forEach(output => {
      // Generate the file
      let item = blobToFile(output.file, `${output.name}-${uuidv4()}.jpg`);
      setGeneratedFiles(generatedFiles => generatedFiles.concat(item));

      // Generate the image
      const img = new Image();
      img.src = URL.createObjectURL(output.file);
      const div = document.createElement("div");
      div.setAttribute("class", output.name);
      const previewEl = document.getElementById("preview");
      div.appendChild(img); // apend image to class div
      previewEl.appendChild(div); // append to container
    });
  };

  return (
    <div>
      <FilePond
        disabled={props.disabled}
        files={files}
        acceptedFileTypes={["image/png", "image/jpeg"]}
        labelFileTypeNotAllowed={"Only accept jpeg/png file"}
        allowImageValidateSize={true}
        allowMultiple={true}
        imageResizeTargetWidth={300}
        onupdatefiles={setFiles}
        labelIdle='Drag & Drop your image files or <span class="filepond--label-action">Browse</span>'
        allowImageResize={true}
        allowImageCrop={true}
        allowImageTransform={true}
        imageResizeMode="contain"
        imageTransformVariants={variants}
        onaddfile={onAddFile}
        onpreparefile={prepareFile}
        maxFileSize={"25MB"}
      />
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
      <div id="preview">
        <Button
          type="primary"
          size="small"
          onClick={props.clearImages}
          style={{ marginBottom: 20 }}
        >
          Clear images
        </Button>
        <div id="images-preview-list">
          <img src={props.values.masthead} alt="Masthead" />
          <img src={props.values.masthead} alt="Featured" />
          <img src={props.values.thumbnail} alt="Thumbnail" />
        </div>
      </div>

      {/* <h5>Masthead (960x400)</h5>
            <h5>Featured (300x300)</h5>
            <h5>Thumbnail (300x280)</h5>
            */}
    </div>
  );
};

export default ThumbnailGenerator;
