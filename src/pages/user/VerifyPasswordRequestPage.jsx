import React, { Suspense } from "react";
import LazyLoader from "../../components/masterLayout/LazyLoader";
const VerifyPasswordRequest = React.lazy(() =>
  import("../../components/user/VerifyPasswordRequest")
);

const VerifyPasswordRequestPage = () => {
  return (
    <>
      <Suspense fallback={<LazyLoader />}>
        <VerifyPasswordRequest />
      </Suspense>
    </>
  );
};

export default VerifyPasswordRequestPage;
