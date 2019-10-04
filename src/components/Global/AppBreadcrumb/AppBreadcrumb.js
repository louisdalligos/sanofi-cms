import React from "react";

import { Breadcrumb } from "antd";

const AppBreadcrumb = () => {
  return (
    <Breadcrumb style={{ margin: "25px 0 40px" }}>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>Content</Breadcrumb.Item>
      <Breadcrumb.Item>Therapy Areas</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default AppBreadcrumb;
