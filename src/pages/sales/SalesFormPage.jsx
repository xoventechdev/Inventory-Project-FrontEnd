import React, { Suspense } from "react";
import MasterLayout from "../../components/masterLayout/MasterLayout";
import LazyLoader from "../../components/masterLayout/LazyLoader";
const SalesForm = React.lazy(() => import("../../components/sales/SalesForm"));

const SalesFormPage = () => {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoader />}>
        <SalesForm />
      </Suspense>
    </MasterLayout>
  );
};

export default SalesFormPage;
