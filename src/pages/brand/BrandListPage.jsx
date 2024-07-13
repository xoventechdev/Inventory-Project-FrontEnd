import React, { Suspense, useEffect } from "react";
import MasterLayout from "../../components/masterLayout/MasterLayout";
import LazyLoader from "../../components/masterLayout/LazyLoader";
import { BrandListRequest } from "../../api_request/BrandApiRequest";
import { useSelector } from "react-redux";
const BrandList = React.lazy(() => import("../../components/brand/BrandList"));

const BrandListPage = () => {
  const perPage = useSelector((state) => state.brand.perPage);
  const searchKey = useSelector((state) => state.brand.searchKeyword);

  useEffect(() => {
    BrandListRequest(1, perPage, searchKey);
  }, [perPage, searchKey]);
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoader />}>
        <BrandList />
      </Suspense>
    </MasterLayout>
  );
};

export default BrandListPage;
