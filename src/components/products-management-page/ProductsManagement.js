import React, { Fragment } from "react";
import { PageHeader } from "antd";
import ProductsTable from "./ProductsTable";

const ProductsManagement = () => {
  const pageTitle = "Products";

  return (
    <Fragment>
      <div className="box-layout-custom">
        <PageHeader title={pageTitle} />
        <ProductsTable />
      </div>
    </Fragment>
  );
};

export default ProductsManagement;
