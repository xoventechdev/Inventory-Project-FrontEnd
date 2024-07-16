import React, { Suspense } from "react";
import MasterLayout from "../../components/masterLayout/MasterLayout";
import LazyLoader from "../../components/masterLayout/LazyLoader";
const CategoryForm = React.lazy(() =>
  import("../../components/category/CategoryForm")
);

const CategoryFormPage = () => {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoader />}>
        <CategoryForm />
      </Suspense>
    </MasterLayout>
  );
};

export default CategoryFormPage;
