import React, { Suspense } from "react";
import MasterLayout from "../../components/masterLayout/MasterLayout";
import LazyLoader from "../../components/masterLayout/LazyLoader";
const ExpenseForm = React.lazy(() =>
  import("../../components/expense/ExpenseForm")
);

const ExpenseFormPage = () => {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoader />}>
        <ExpenseForm />
      </Suspense>
    </MasterLayout>
  );
};

export default ExpenseFormPage;
