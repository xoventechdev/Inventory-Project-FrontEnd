import React, { Suspense } from "react";
import LazyLoader from "../../components/masterLayout/LazyLoader";
import MasterLayout from "../../components/masterLayout/MasterLayout";
const Profile = React.lazy(() => import("../../components/user/Profile"));

const ProfilePage = () => {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoader />}>
        <Profile />
      </Suspense>
    </MasterLayout>
  );
};

export default ProfilePage;
