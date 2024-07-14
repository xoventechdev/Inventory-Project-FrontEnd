import React, { Suspense } from "react";
import MasterLayout from "../../components/masterLayout/MasterLayout";
import LazyLoader from "../../components/masterLayout/LazyLoader";
const ExpenseTypeForm = React.lazy(() =>
  import("../../components/expenseType/ExpenseTypeForm")
);

const ExpenseTypeFormPage = () => {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoader />}>
        <ExpenseTypeForm />
      </Suspense>
    </MasterLayout>
  );
};

export default ExpenseTypeFormPage;
