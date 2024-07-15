import React, { Suspense } from "react";
import MasterLayout from "../../components/masterLayout/MasterLayout";
import LazyLoader from "../../components/masterLayout/LazyLoader";
const PurchaseList = React.lazy(() =>
  import("../../components/purchase/PurchaseList")
);

const PurchaseListPage = () => {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoader />}>
        <PurchaseList />
      </Suspense>
    </MasterLayout>
  );
};

export default PurchaseListPage;
