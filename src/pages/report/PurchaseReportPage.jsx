import React, { Suspense } from "react";
import MasterLayout from "../../components/masterLayout/MasterLayout";
import LazyLoader from "../../components/masterLayout/LazyLoader";
const PurchaseReport = React.lazy(() =>
  import("../../components/report/PurchaseReport")
);

const PurchaseReportPage = () => {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoader />}>
        <PurchaseReport />
      </Suspense>
    </MasterLayout>
  );
};

export default PurchaseReportPage;
