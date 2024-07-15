import React, { Suspense } from "react";
import MasterLayout from "../../components/masterLayout/MasterLayout";
import LazyLoader from "../../components/masterLayout/LazyLoader";
const ReturnList = React.lazy(() =>
  import("../../components/return/ReturnList")
);

const ReturnListPage = () => {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoader />}>
        <ReturnList />
      </Suspense>
    </MasterLayout>
  );
};

export default ReturnListPage;
