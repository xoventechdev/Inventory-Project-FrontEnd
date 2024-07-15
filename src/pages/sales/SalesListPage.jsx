import React, { Suspense } from "react";
import MasterLayout from "../../components/masterLayout/MasterLayout";
import LazyLoader from "../../components/masterLayout/LazyLoader";
const SalesList = React.lazy(() => import("../../components/sales/SalesList"));

const SalesListPage = () => {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoader />}>
        <SalesList />
      </Suspense>
    </MasterLayout>
  );
};

export default SalesListPage;
