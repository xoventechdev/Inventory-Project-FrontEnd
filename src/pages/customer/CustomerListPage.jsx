import React, { Suspense } from "react";
import MasterLayout from "../../components/masterLayout/MasterLayout";
import LazyLoader from "../../components/masterLayout/LazyLoader";
const CustomerList = React.lazy(() =>
  import("../../components/customer/CustomerList")
);

const CustomerListPage = () => {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoader />}>
        <CustomerList />
      </Suspense>
    </MasterLayout>
  );
};

export default CustomerListPage;
