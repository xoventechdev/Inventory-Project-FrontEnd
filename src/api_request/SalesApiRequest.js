import axios from "axios";
import { HideLoader, ShowLoader } from "../redux/slice/settings-slice";
import ReduxStore from "../redux/store/ReduxStore";
import { BaseUrl, reqHeaders } from "../utility/Config";
import { ErrorToast, SuccessToast } from "../utility/FormHelper";

import { removeSessions } from "../utility/SessionHelper";
import {
  emptySalesItemList,
  resetFormValues,
  saveSalesItemList,
  saveSalesItemListFromAPI,
  setFormValues,
  setItemFormValues,
  setProductDropDown,
  setSalesList,
  setSalesTotal,
  setCustomerDropDown,
} from "../redux/slice/sales-slice";

export const AddSales = (data, id) => {
  ReduxStore.dispatch(ShowLoader());

  let URL = BaseUrl + "sales/create";
  if (id) {
    URL = BaseUrl + "sales/update/" + id;
  }
  return axios
    .post(URL, data, reqHeaders)
    .then((res) => {
      ReduxStore.dispatch(HideLoader());
      if (res.status === 200 && res.data.status === "success") {
        SuccessToast(res.data.response);
        ReduxStore.dispatch(resetFormValues());
        ReduxStore.dispatch(emptySalesItemList());
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

export const SalesListRequest = async (page, perPage, key) => {
  ReduxStore.dispatch(ShowLoader());
  const url = BaseUrl + "sales/tableList/" + page + "/" + perPage + "/" + key;

  try {
    const data = await axios.get(url, reqHeaders);

    ReduxStore.dispatch(HideLoader());
    if (data.data.status == "success" && !data.data.data[0].Total[0] == []) {
      ReduxStore.dispatch(setSalesList(data.data.data[0].Rows));
      ReduxStore.dispatch(setSalesTotal(data.data.data[0].Total[0].count));
    } else {
      ReduxStore.dispatch(setSalesList([]));
      ReduxStore.dispatch(setSalesTotal(0));
    }
  } catch (error) {
    ReduxStore.dispatch(HideLoader());
    ReduxStore.dispatch(setSalesList([]));
    ReduxStore.dispatch(setSalesTotal(0));
    if (error.response && error.response.status === 401) {
      ErrorToast("Unauthorized. Please log in again.");
      removeSessions();
    } else {
      ErrorToast(error.response?.data?.response || "An error occurred");
    }
  }
};

export const SalesDetailById = async (id) => {
  ReduxStore.dispatch(ShowLoader());
  const url = BaseUrl + "sales/detail/" + id;

  try {
    const data = await axios.get(url, reqHeaders);
    ReduxStore.dispatch(HideLoader());
    if (data.data.status == "success") {
      const { items, ...salesWithoutItems } = data.data.response[0];

      ReduxStore.dispatch(setFormValues(salesWithoutItems));
      ReduxStore.dispatch(saveSalesItemListFromAPI(items));
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

export const SalesDeleteRequest = async (id) => {
  ReduxStore.dispatch(ShowLoader());
  const url = BaseUrl + "sales/delete/" + id;

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

export const CustomerDropDownList = async () => {
  ReduxStore.dispatch(ShowLoader());
  const url = BaseUrl + "customer/dropdownlist";

  try {
    const data = await axios.get(url, reqHeaders);
    ReduxStore.dispatch(HideLoader());
    if (data.data.status == "success") {
      ReduxStore.dispatch(setCustomerDropDown(data.data.response));
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

export const ProductDropDownList = async () => {
  ReduxStore.dispatch(ShowLoader());
  const url = BaseUrl + "product/dropdownlist";

  try {
    const data = await axios.get(url, reqHeaders);
    ReduxStore.dispatch(HideLoader());
    if (data.data.status == "success") {
      ReduxStore.dispatch(setProductDropDown(data.data.response));
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
