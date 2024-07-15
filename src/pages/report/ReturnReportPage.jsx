import React, { Suspense } from "react";
import MasterLayout from "../../components/masterLayout/MasterLayout";
import LazyLoader from "../../components/masterLayout/LazyLoader";
const ReturnReport = React.lazy(() =>
  import("../../components/report/ReturnReport")
);

const ReturnReportPage = () => {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoader />}>
        <ReturnReport />
      </Suspense>
    </MasterLayout>
  );
};

export default ReturnReportPage;
