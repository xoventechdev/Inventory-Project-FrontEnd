import React, { Suspense } from "react";
import MasterLayout from "../../components/masterLayout/MasterLayout";
import LazyLoader from "../../components/masterLayout/LazyLoader";
import Dashboard from "../../components/dashboard/Dashboard";

const DashboardPage = () => {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoader />}>
        <Dashboard />
      </Suspense>
    </MasterLayout>
  );
};

export default DashboardPage;
