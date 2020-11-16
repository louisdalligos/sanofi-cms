import React, { useEffect, useState, Fragment } from "react";
import uuidv4 from "uuid";
import { FilePond, registerPlugin } from "react-filepond";

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

import { useFormikContext } from "formik";
import ImagePreview from "./ImagePreview";

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

    const { setFieldValue } = useFormikContext();

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
        featured: transforms => {
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
        //console.log(err, fileItem.getMetadata("resize"));
    };

    const setPreviewFile = (name, output) => {
        return setFieldValue(
            name,
            blobToFile(output.file, `name-${uuidv4()}.jpg`)
        );
    };

    const prepareFile = (fileItem, outputFiles) => {
        outputFiles.forEach(output => {
            console.log(output);
            // // Generate the file to be submitted on the form
            // let item = blobToFile(output.file, `${output.name}-${uuidv4()}.jpg`);
            // setGeneratedFiles(generatedFiles => generatedFiles.concat(item));

            // // update our form state
            // if (output.name !== null) {
            //   setPreviewFile(output.name, output);
            // }
        });
    };

    return (
        <Fragment>
            <FilePond
                files={files}
                acceptedFileTypes={["image/png", "image/jpeg"]}
                allowImageValidateSize={true}
                allowMultiple={false}
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

            <ImagePreview data={generatedFiles} />
        </Fragment>
    );
};

export default ThumbnailGenerator;
