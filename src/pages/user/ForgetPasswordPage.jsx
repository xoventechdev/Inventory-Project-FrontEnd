import React, { Suspense } from "react";
import LazyLoader from "../../components/masterLayout/LazyLoader";
const ForgetPasswordRequest = React.lazy(() =>
  import("../../components/user/ForgetPasswordRequest")
);

const ForgetPasswordPage = () => {
  return (
    <>
      <Suspense fallback={<LazyLoader />}>
        <ForgetPasswordRequest />
      </Suspense>
    </>
  );
};

export default ForgetPasswordPage;
