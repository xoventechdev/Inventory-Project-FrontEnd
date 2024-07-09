import React, { Suspense } from "react";
import LazyLoader from "../../components/masterLayout/LazyLoader";
const NotFound_404 = React.lazy(() =>
  import("../../components/notFound/NotFound_404")
);
const NotFoundPage = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <NotFound_404 />
    </Suspense>
  );
};

export default NotFoundPage;
