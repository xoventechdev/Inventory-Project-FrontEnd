import React, { Suspense } from "react";
import MasterLayout from "../../components/masterLayout/MasterLayout";
import LazyLoader from "../../components/masterLayout/LazyLoader";
const ExpenseList = React.lazy(() =>
  import("../../components/expense/ExpenseList")
);

const ExpenseListPage = () => {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoader />}>
        <ExpenseList />
      </Suspense>
    </MasterLayout>
  );
};

export default ExpenseListPage;
