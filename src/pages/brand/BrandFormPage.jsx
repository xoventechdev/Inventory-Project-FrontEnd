import React, { Suspense } from "react";
import MasterLayout from "../../components/masterLayout/MasterLayout";
import LazyLoader from "../../components/masterLayout/LazyLoader";
const BrandForm = React.lazy(() => import("../../components/brand/BrandForm"));

const BrandFormPage = () => {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoader />}>
        <BrandForm />
      </Suspense>
    </MasterLayout>
  );
};

export default BrandFormPage;
