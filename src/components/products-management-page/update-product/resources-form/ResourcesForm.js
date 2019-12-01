import React, { useState } from "react";
import { Select } from "antd";

import VideoEmbedForm from "./VideoEmbedForm";
import FileUploadForm from "./FileUploadForm";
import LinkForm from "./LinkForm";
import OtherResourcesTable from "./OtherResourcesTable";

const { Option } = Select;

const ResourcesForm = ({ auth, productId, resourcesData }) => {
  const [currentForm, setCurrentForm] = useState("video");

  const handleChange = value => {
    console.log(`selected ${value}`);
    setCurrentForm(value);
  };

  return (
    <div>
      <h3 style={{ marginBottom: 20 }}>Select the type of resource</h3>

      <Select
        defaultValue="video"
        style={{ width: 250, marginBottom: 30 }}
        onChange={handleChange}
      >
        <Option value="video">Video</Option>
        <Option value="file">File</Option>
        <Option value="link">Link</Option>
      </Select>

      {currentForm === "video" ? (
        <VideoEmbedForm productId={productId} auth={auth} />
      ) : currentForm === "file" ? (
        <FileUploadForm productId={productId} auth={auth} />
      ) : currentForm === "link" ? (
        <LinkForm productId={productId} auth={auth} />
      ) : null}

      {/* Table List */}
      <OtherResourcesTable resourcesData={resourcesData} auth={auth} />
    </div>
  );
};

export default ResourcesForm;
