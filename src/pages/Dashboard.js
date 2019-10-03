import React from "react";
import DashboardLayout from "Pages/Layout/DashboardLayout";

import TherapyArticles from "Components/TherapyArticles/TherapyArticles";

const Dashboard = props => {
  return <DashboardLayout contentArea={<TherapyArticles />} />;
};

export default Dashboard;
