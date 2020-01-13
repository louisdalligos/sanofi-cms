import React from "react";
import { Breadcrumb, Button } from "antd";
import { Link } from "react-router-dom";

const PageBreadcrumb = () => {
  return (
    <div className="page-breadcrumb">
      <div>
        <Breadcrumb>
          <Breadcrumb.Item key="users">Users</Breadcrumb.Item>
          <Breadcrumb.Item key="admins">
            <Link to="/admins">CMS admins</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div>
        <Button type="primary">
          <Link to="/admins/create">New Profile</Link>
        </Button>
      </div>
    </div>
  );
};

export default PageBreadcrumb;
