import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { PageHeader } from "antd";

import Navbar from "../main-navigation/Navbar";
import Category from "./Category";

const CategoriesManagement = props => {
  const pageTitle = "Categories/Illnesses";

  return (
    <>
      <Navbar {...props} />
      <div className="box-layout-custom">
        <PageHeader title={pageTitle} />
        <DndProvider backend={HTML5Backend}>
          <Category />
        </DndProvider>
      </div>
    </>
  );
};

export default CategoriesManagement;
