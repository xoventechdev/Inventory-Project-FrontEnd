import React, { Suspense } from "react";
import MasterLayout from "../../components/masterLayout/MasterLayout";
import LazyLoader from "../../components/masterLayout/LazyLoader";
const SupplierForm = React.lazy(() =>
  import("../../components/supplier/SupplierForm")
);

const SupplierFormPage = () => {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoader />}>
        <SupplierForm />
      </Suspense>
    </MasterLayout>
  );
};

export default SupplierFormPage;
