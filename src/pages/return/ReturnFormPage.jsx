import React, { Suspense } from "react";
import MasterLayout from "../../components/masterLayout/MasterLayout";
import LazyLoader from "../../components/masterLayout/LazyLoader";
const ReturnForm = React.lazy(() =>
  import("../../components/return/ReturnForm")
);

const ReturnFormPage = () => {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoader />}>
        <ReturnForm />
      </Suspense>
    </MasterLayout>
  );
};

export default ReturnFormPage;
