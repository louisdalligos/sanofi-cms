import React from "react";
import DashboardLayout from "Pages/Layout/DashboardLayout";

import TherapyArticles from "Components/TherapyArticles/TherapyArticles";

const TherapyAreas = props => {
  return (
    <DashboardLayout
      contentArea={<TherapyArticles />}
      pageTitle={"Therapy Areas"}
    />
  );
};

export default TherapyAreas;
