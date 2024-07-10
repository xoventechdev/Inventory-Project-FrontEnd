import React, { Suspense } from "react";
import MasterLayout from "../../components/masterLayout/MasterLayout";
import LazyLoader from "../../components/masterLayout/LazyLoader";
const CustomerForm = React.lazy(() =>
  import("../../components/customer/CustomerForm")
);

const CustomerFormPage = () => {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoader />}>
        <CustomerForm />
      </Suspense>
    </MasterLayout>
  );
};

export default CustomerFormPage;
