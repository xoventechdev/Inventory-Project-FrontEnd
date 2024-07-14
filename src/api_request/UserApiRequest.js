import axios from "axios";
import {
  HideLoader,
  offRecoverMode,
  onRecoverMode,
  ShowLoader,
} from "../redux/slice/settings-slice";
import ReduxStore from "../redux/store/ReduxStore";
import { BaseUrl, reqHeaders } from "../utility/Config";
import { ErrorToast, SuccessToast } from "../utility/FormHelper";
import {
  getEmail,
  getOTP,
  setEmail,
  setOtp,
  setToken,
  setUserDetails,
} from "../utility/SessionHelper";
import { setUserDetail } from "../redux/slice/user-slice";

export const RegistrationRequest = (data) => {
  ReduxStore.dispatch(ShowLoader());
  let URL = BaseUrl + "user/create";
  return axios
    .post(URL, data)
    .then((res) => {
      ReduxStore.dispatch(HideLoader());
      if (res.status === 200 && res.data.status === "success") {
        SuccessToast(res.data.response);
        return true;
      } else {
        ErrorToast(res.data.response);
        return false;
      }
    })
    .catch((error) => {
      ReduxStore.dispatch(HideLoader());
      ErrorToast(error.message);
      return false;
    });
};

export const LogInRequest = (email, password) => {
  ReduxStore.dispatch(ShowLoader());
  let URL = BaseUrl + "user/login";
  let postData = { email: email, password: password };
  return axios
    .post(URL, postData)
    .then((res) => {
      ReduxStore.dispatch(HideLoader());
      if (res.status === 200 && res.data.status === "success") {
        setToken(res.data.token);
        ReduxStore.dispatch(setUserDetail(res.data.response));
        setUserDetails(res.data.response);
        return true;
      } else {
        ErrorToast(res.data.response);
        return false;
      }
    })
    .catch((error) => {
      ReduxStore.dispatch(HideLoader());
      ErrorToast(error.message);
      return false;
    });
};

export const getUserData = () => {
  ReduxStore.dispatch(ShowLoader());
  let URL = BaseUrl + "user/details";
  return axios
    .get(URL, reqHeaders)
    .then((res) => {
      ReduxStore.dispatch(HideLoader());
      if (res.status === 200 && res.data.status === "success") {
        ReduxStore.dispatch(setUserDetail(res.data.response));
        return true;
      } else {
        ErrorToast(res.data.response);
        return false;
      }
    })
    .catch((error) => {
      ReduxStore.dispatch(HideLoader());
      ErrorToast(error.message);
      if (error.response && error.response.status === 401) {
        ErrorToast("Unauthorized. Please log in again.");
        removeSessions();
      } else {
        ErrorToast(error.response?.data?.response || "An error occurred");
      }
      return false;
    });
};

export const UserProfileUpdate = (
  email,
  firstName,
  lastName,
  mobile,
  password,
  photo
) => {
  let postData = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    mobile: mobile,
    password: password,
    photo: photo,
  };

  ReduxStore.dispatch(ShowLoader());
  let URL = BaseUrl + "user/update";
  return axios
    .post(URL, postData, reqHeaders)
    .then((res) => {
      ReduxStore.dispatch(HideLoader());
      if (res.status === 200 && res.data.status === "success") {
        const { password, ...dataForBrowser } = postData;
        ReduxStore.dispatch(setUserDetail(dataForBrowser));
        setUserDetails(dataForBrowser);
        SuccessToast(res.data.response);
        return true;
      } else {
        ErrorToast(res.data.response);
        return false;
      }
    })
    .catch((error) => {
      ReduxStore.dispatch(HideLoader());
      ErrorToast(error.message);
      if (error.response && error.response.status === 401) {
        ErrorToast("Unauthorized. Please log in again.");
        removeSessions();
      } else {
        ErrorToast(error.response?.data?.response || "An error occurred");
      }
      return false;
    });
};

export const RequestOTP = (email) => {
  ReduxStore.dispatch(ShowLoader());
  let URL = BaseUrl + "user/email-verify/" + email;
  return axios
    .get(URL)
    .then((res) => {
      ReduxStore.dispatch(HideLoader());
      if (res.status === 200 && res.data.status === "success") {
        setEmail(email);
        ReduxStore.dispatch(onRecoverMode());
        SuccessToast(res.data.response);
        return true;
      } else {
        ErrorToast(res.data.response);
        return false;
      }
    })
    .catch((error) => {
      ReduxStore.dispatch(HideLoader());
      ErrorToast(error.message);
      return false;
    });
};

export const OTPVerifyRequest = (otp) => {
  ReduxStore.dispatch(ShowLoader());
  let URL = BaseUrl + "user/otp-verify/" + getEmail() + "/" + otp;
  return axios
    .get(URL)
    .then((res) => {
      ReduxStore.dispatch(HideLoader());
      if (res.status === 200 && res.data.status === "success") {
        setOtp(otp);
        SuccessToast(res.data.response);
        return true;
      } else {
        ErrorToast(res.data.response);
        return false;
      }
    })
    .catch((error) => {
      ReduxStore.dispatch(HideLoader());
      ErrorToast(error.message);
      return false;
    });
};

export const PasswordRecoverRequest = (password) => {
  ReduxStore.dispatch(ShowLoader());
  let URL = BaseUrl + "user/pass-reset";
  let bodyData = { email: getEmail(), otp: getOTP(), password: password };
  return axios
    .post(URL, bodyData)
    .then((res) => {
      ReduxStore.dispatch(HideLoader());
      if (res.status === 200 && res.data.status === "success") {
        ReduxStore.dispatch(offRecoverMode());
        SuccessToast(res.data.response);
        return true;
      } else {
        ErrorToast(res.data.response);
        return false;
      }
    })
    .catch((error) => {
      ReduxStore.dispatch(HideLoader());
      ErrorToast(error.message);
      return false;
    });
};
