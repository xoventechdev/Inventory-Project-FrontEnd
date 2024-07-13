import axios from "axios";
import { HideLoader, ShowLoader } from "../redux/slice/settings-slice";
import ReduxStore from "../redux/store/ReduxStore";
import { BaseUrl, reqHeaders } from "../utility/Config";
import { ErrorToast, SuccessToast } from "../utility/FormHelper";
import {
  resetFormValues,
  setSupplierItem,
  setFormValues,
  setTotalSupplier,
} from "../redux/slice/supplier-slice";
import { removeSessions } from "../utility/SessionHelper";

export const AddSupplier = (data, id) => {
  ReduxStore.dispatch(ShowLoader());

  let URL = BaseUrl + "supplier/create";
  if (id) {
    URL = BaseUrl + "supplier/update/" + id;
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
      } else if (res.data.response.keyPattern.mobile === 1) {
        ErrorToast("This mobile number registered with another supplier.");
        return 0;
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

export const SupplierListRequest = async (page, perPage, key) => {
  ReduxStore.dispatch(ShowLoader());
  const url =
    BaseUrl + "supplier/tableList/" + page + "/" + perPage + "/" + key;

  try {
    const data = await axios.get(url, reqHeaders);

    ReduxStore.dispatch(HideLoader());
    if (data.data.status == "success" && !data.data.data[0].Total[0] == []) {
      ReduxStore.dispatch(setSupplierItem(data.data.data[0].Rows));
      ReduxStore.dispatch(setTotalSupplier(data.data.data[0].Total[0].count));
    } else {
      ReduxStore.dispatch(setSupplierItem([]));
      ReduxStore.dispatch(setTotalSupplier(0));
    }
  } catch (error) {
    ReduxStore.dispatch(HideLoader());
    ReduxStore.dispatch(setSupplierItem([]));
    ReduxStore.dispatch(setTotalSupplier(0));
    if (error.response && error.response.status === 401) {
      ErrorToast("Unauthorized. Please log in again.");
      removeSessions();
    } else {
      ErrorToast(error.response?.data?.response || "An error occurred");
    }
  }
};

export const SupplierDeleteRequest = async (id) => {
  ReduxStore.dispatch(ShowLoader());
  const url = BaseUrl + "supplier/delete/" + id;

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

export const SupplierDetailById = async (id) => {
  ReduxStore.dispatch(ShowLoader());
  const url = BaseUrl + "supplier/detail/" + id;

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
