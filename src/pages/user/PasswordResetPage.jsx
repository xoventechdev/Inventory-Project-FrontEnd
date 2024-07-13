import React, { Suspense } from "react";
import LazyLoader from "../../components/masterLayout/LazyLoader";
const PasswordResetForm = React.lazy(() =>
  import("../../components/user/PasswordResetForm")
);

const PasswordResetPage = () => {
  return (
    <>
      <Suspense fallback={<LazyLoader />}>
        <PasswordResetForm />
      </Suspense>
    </>
  );
};

export default PasswordResetPage;
