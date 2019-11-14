import React from "react";
import { Breadcrumb, Button } from "antd";
import { Link } from "react-router-dom";

const PageBreadcrumb = () => {
  return (
    <div className="page-breadcrumb">
      <div>
        <Breadcrumb>
          <Breadcrumb.Item key="content">Content</Breadcrumb.Item>
          <Breadcrumb.Item key="therapy-areas">
            <Link to="/therapy-areas">Therapy Areas</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div>
        {/* <Button type="primary" style={{ marginRight: 10 }}>
                        <Link to="/">Order Features</Link>
                    </Button> */}
        <Button type="primary">
          <Link to="/therapy-areas/create">New Article</Link>
        </Button>
      </div>
    </div>
  );
};

export default PageBreadcrumb;
