import React, { Suspense } from "react";
import MasterLayout from "../../components/masterLayout/MasterLayout";
import LazyLoader from "../../components/masterLayout/LazyLoader";
const SalesReport = React.lazy(() =>
  import("../../components/report/SalesReport")
);

const SalesReportPage = () => {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoader />}>
        <SalesReport />
      </Suspense>
    </MasterLayout>
  );
};

export default SalesReportPage;
