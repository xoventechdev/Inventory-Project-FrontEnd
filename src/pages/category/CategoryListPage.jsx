import React, { Suspense } from "react";
import MasterLayout from "../../components/masterLayout/MasterLayout";
import LazyLoader from "../../components/masterLayout/LazyLoader";
const CategoryList = React.lazy(() =>
  import("../../components/category/CategoryList")
);

const CategoryListPage = () => {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoader />}>
        <CategoryList />
      </Suspense>
    </MasterLayout>
  );
};

export default CategoryListPage;
