import axios from "axios";
import { HideLoader, ShowLoader } from "../redux/slice/settings-slice";
import ReduxStore from "../redux/store/ReduxStore";
import { BaseUrl, reqHeaders } from "../utility/Config";
import { ErrorToast, SuccessToast } from "../utility/FormHelper";
import {
  resetFormValues,
  setBrandItem,
  setFormValues,
  setTotalBrand,
} from "../redux/slice/brand-slice";
import { removeSessions } from "../utility/SessionHelper";

export const AddBrand = (data, id) => {
  ReduxStore.dispatch(ShowLoader());

  let URL = BaseUrl + "brand/create";
  if (id) {
    URL = BaseUrl + "brand/update/" + id;
  }
  return axios
    .post(URL, data, reqHeaders)
    .then((res) => {
      ReduxStore.dispatch(HideLoader());
      if (res.status === 200 && res.data.status === "success") {
        SuccessToast(res.data.response);
        ReduxStore.dispatch(resetFormValues());
        if (id) {
          return 2;
        } else {
          return 1;
        }
      } else {
        ErrorToast(res.data.response);
        return 0;
      }
    })
    .catch((error) => {
      ReduxStore.dispatch(HideLoader());
      if (error.response && error.response.status === 401) {
        ErrorToast("Unauthorized. Please log in again.");
        removeSessions();
      } else {
        ErrorToast(error.response?.data?.response || "An error occurred");
      }
      return 0;
    });
};

export const BrandListRequest = async (page, perPage, key) => {
  ReduxStore.dispatch(ShowLoader());
  const url = BaseUrl + "brand/tableList/" + page + "/" + perPage + "/" + key;

  try {
    const data = await axios.get(url, reqHeaders);
    console.log(page + " 8 " + perPage + " 8 " + key);

    ReduxStore.dispatch(HideLoader());
    if (data.data.status == "success" && !data.data.data[0].Total[0] == []) {
      ReduxStore.dispatch(setBrandItem(data.data.data[0].Rows));
      ReduxStore.dispatch(setTotalBrand(data.data.data[0].Total[0].count));
    } else {
      ReduxStore.dispatch(setBrandItem([]));
      ReduxStore.dispatch(setTotalBrand(0));
    }
  } catch (error) {
    ReduxStore.dispatch(HideLoader());
    ReduxStore.dispatch(setBrandItem([]));
    ReduxStore.dispatch(setTotalBrand(0));
    if (error.response && error.response.status === 401) {
      ErrorToast("Unauthorized. Please log in again.");
      removeSessions();
    } else {
      ErrorToast(error.response?.data?.response || "An error occurred");
    }
  }
};

export const BrandDeleteRequest = async (id) => {
  ReduxStore.dispatch(ShowLoader());
  const url = BaseUrl + "brand/delete/" + id;

  try {
    const data = await axios.delete(url, reqHeaders);

    ReduxStore.dispatch(HideLoader());
    if (data.data.status == "success") {
      SuccessToast(data.data.response);
      return true;
    } else {
      ErrorToast(data.data.response);
      return false;
    }
  } catch (error) {
    ReduxStore.dispatch(HideLoader());
    if (error.response && error.response.status === 401) {
      ErrorToast("Unauthorized. Please log in again.");
      removeSessions();
    } else {
      ErrorToast(error.response?.data?.response || "An error occurred");
    }
  }
};

export const BrandDetailById = async (id) => {
  ReduxStore.dispatch(ShowLoader());
  const url = BaseUrl + "brand/detail/" + id;

  try {
    const data = await axios.get(url, reqHeaders);
    ReduxStore.dispatch(HideLoader());
    if (data.data.status == "success") {
      ReduxStore.dispatch(setFormValues(data.data.response));
      return true;
    } else {
      ErrorToast(data.data.response);
      return false;
    }
  } catch (error) {
    ReduxStore.dispatch(HideLoader());
    if (error.response && error.response.status === 401) {
      ErrorToast("Unauthorized. Please log in again.");
      removeSessions();
    } else {
      ErrorToast(error.response?.data?.response || "An error occurred");
    }
    return false;
  }
};

export const BrandStatusChange = async (id) => {
  ReduxStore.dispatch(ShowLoader());
  const url = BaseUrl + "brand/statusUpdate/" + id;

  try {
    const data = await axios.get(url, reqHeaders);
    ReduxStore.dispatch(HideLoader());
    if (data.data.status == "success") {
      SuccessToast(data.data.response);
      return true;
    } else {
      ErrorToast(data.data.response);
      return false;
    }
  } catch (error) {
    ReduxStore.dispatch(HideLoader());
    if (error.response && error.response.status === 401) {
      ErrorToast("Unauthorized. Please log in again.");
      removeSessions();
    } else {
      ErrorToast(error.response?.data?.response || "An error occurred");
    }
  }
};
