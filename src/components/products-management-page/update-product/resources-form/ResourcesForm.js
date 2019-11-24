import React from "react";
import { Button, message } from "antd";

import axios from "axios";
import { API } from "../../../../utils/api";

import VideoEmbedForm from "./VideoEmbedForm";

const ResourcesForm = ({ auth, productId }) => {
  return (
    <div>
      <VideoEmbedForm />
    </div>
  );
};

export default ResourcesForm;
