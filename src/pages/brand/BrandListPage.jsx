import React, { Suspense } from "react";
import MasterLayout from "../../components/masterLayout/MasterLayout";
import LazyLoader from "../../components/masterLayout/LazyLoader";
const BrandList = React.lazy(() => import("../../components/brand/BrandList"));

const BrandListPage = () => {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoader />}>
        <BrandList />
      </Suspense>
    </MasterLayout>
  );
};

export default BrandListPage;
