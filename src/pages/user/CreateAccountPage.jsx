import React, { Suspense } from "react";
import LazyLoader from "../../components/masterLayout/LazyLoader";
const CreateAccountFrom = React.lazy(() =>
  import("../../components/user/CreateAccountFrom")
);

const CreateAccountPage = () => {
  return (
    <>
      <Suspense fallback={<LazyLoader />}>
        <CreateAccountFrom />
      </Suspense>
    </>
  );
};

export default CreateAccountPage;
