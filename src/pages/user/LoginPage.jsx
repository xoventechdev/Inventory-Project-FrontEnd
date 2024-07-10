import React, { Suspense } from "react";
import LazyLoader from "../../components/masterLayout/LazyLoader";
const LoginForm = React.lazy(() => import("../../components/user/LoginForm"));

const LoginPage = () => {
  return (
    <>
      <Suspense fallback={<LazyLoader />}>
        <LoginForm />
      </Suspense>
    </>
  );
};

export default LoginPage;
