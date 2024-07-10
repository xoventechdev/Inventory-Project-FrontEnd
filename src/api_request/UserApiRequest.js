import axios from "axios";
import { HideLoader, ShowLoader } from "../redux/slice/settings-slice";
import ReduxStore from "../redux/store/ReduxStore";
import { BaseUrl } from "../utility/Config";
import { ErrorToast, SuccessToast } from "../utility/FormHelper";
import { setToken, setUserDetails } from "../utility/SessionHelper";

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
        console.log(res.data.response);
        console.log(res.data.token);
        setToken(res.data.token);
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
