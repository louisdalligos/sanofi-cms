import React from "react";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { PageHeader } from "antd";

import SubCategory from "./SubCategory";

const SubCategoriesManagement = props => {
  const pageTitle = "Subcategories/Sections";

  return (
    <>
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
