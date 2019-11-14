import React, { Fragment } from "react";
import { connect } from "react-redux";
import { PageHeader, Card } from "antd";

const Dashboard = ({ ...props }) => {
  const pageTitle = "Dashboard";

  return (
    <Fragment>
      <div className="box-layout-custom">
        <PageHeader title={pageTitle} />

        <div>
          <Card size="small" title="Small size card" style={{ width: 300 }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(Dashboard);
