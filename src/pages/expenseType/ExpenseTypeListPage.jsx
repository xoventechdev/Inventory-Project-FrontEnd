import React, { Suspense } from "react";
import MasterLayout from "../../components/masterLayout/MasterLayout";
import LazyLoader from "../../components/masterLayout/LazyLoader";
const ExpenseTypeList = React.lazy(() =>
  import("../../components/expenseType/ExpenseTypeList")
);

const ExpenseTypeListPage = () => {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoader />}>
        <ExpenseTypeList />
      </Suspense>
    </MasterLayout>
  );
};

export default ExpenseTypeListPage;
