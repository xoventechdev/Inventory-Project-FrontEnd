import React, { Suspense } from "react";
import MasterLayout from "../../components/masterLayout/MasterLayout";
import LazyLoader from "../../components/masterLayout/LazyLoader";
const ProductForm = React.lazy(() =>
  import("../../components/product/ProductForm")
);

const ProductFormPage = () => {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoader />}>
        <ProductForm />
      </Suspense>
    </MasterLayout>
  );
};

export default ProductFormPage;
