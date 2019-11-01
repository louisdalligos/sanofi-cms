import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { PageHeader } from "antd";

import Navbar from "../main-navigation/Navbar";
import SubCategory from "./SubCategory";

const SubCategoriesManagement = props => {
  const pageTitle = "Subcategories/Sections";

  return (
    <>
      <Navbar {...props} />
      <div className="box-layout-custom">
        <PageHeader title={pageTitle} />
        <DndProvider backend={HTML5Backend}>
          <SubCategory />
        </DndProvider>
      </div>
    </>
  );
};

export default SubCategoriesManagement;
