import React, { Suspense } from "react";
import MasterLayout from "../../components/masterLayout/MasterLayout";
import LazyLoader from "../../components/masterLayout/LazyLoader";
const ProductList = React.lazy(() =>
  import("../../components/product/ProductList")
);

const ProductListPage = () => {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoader />}>
        <ProductList />
      </Suspense>
    </MasterLayout>
  );
};

export default ProductListPage;
