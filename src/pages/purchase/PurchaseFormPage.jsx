import React, { Suspense } from "react";
import MasterLayout from "../../components/masterLayout/MasterLayout";
import LazyLoader from "../../components/masterLayout/LazyLoader";
const PurchaseForm = React.lazy(() =>
  import("../../components/purchase/PurchaseForm")
);

const PurchaseFormPage = () => {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoader />}>
        <PurchaseForm />
      </Suspense>
    </MasterLayout>
  );
};

export default PurchaseFormPage;
