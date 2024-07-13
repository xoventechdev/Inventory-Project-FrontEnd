import React, { Suspense } from "react";
import MasterLayout from "../../components/masterLayout/MasterLayout";
import LazyLoader from "../../components/masterLayout/LazyLoader";
const SupplierList = React.lazy(() =>
  import("../../components/supplier/SupplierList")
);

const SupplierListPage = () => {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoader />}>
        <SupplierList />
      </Suspense>
    </MasterLayout>
  );
};

export default SupplierListPage;
