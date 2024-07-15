import React, { Suspense } from "react";
import MasterLayout from "../../components/masterLayout/MasterLayout";
import LazyLoader from "../../components/masterLayout/LazyLoader";
const ExpenseReport = React.lazy(() =>
  import("../../components/report/ExpenseReport")
);

const ExpenseReportPage = () => {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoader />}>
        <ExpenseReport />
      </Suspense>
    </MasterLayout>
  );
};

export default ExpenseReportPage;
