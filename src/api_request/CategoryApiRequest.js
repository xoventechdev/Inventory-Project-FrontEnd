import axios from "axios";
import { HideLoader, ShowLoader } from "../redux/slice/settings-slice";
import ReduxStore from "../redux/store/ReduxStore";
import { BaseUrl, reqHeaders } from "../utility/Config";
import { ErrorToast, SuccessToast } from "../utility/FormHelper";
import {
  resetFormValues,
  setCategoryItem,
  setFormValues,
  setTotalCategory,
} from "../redux/slice/category-slice";
import { removeSessions } from "../utility/SessionHelper";

export const AddCategory = (data, id) => {
  ReduxStore.dispatch(ShowLoader());

  let URL = BaseUrl + "category/create";
  if (id) {
    URL = BaseUrl + "category/update/" + id;
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

export const CategoryListRequest = async (page, perPage, key) => {
  ReduxStore.dispatch(ShowLoader());
  const url =
    BaseUrl + "category/tableList/" + page + "/" + perPage + "/" + key;

  try {
    const data = await axios.get(url, reqHeaders);

    ReduxStore.dispatch(HideLoader());
    if (data.data.status == "success" && !data.data.data[0].Total[0] == []) {
      ReduxStore.dispatch(setCategoryItem(data.data.data[0].Rows));
      ReduxStore.dispatch(setTotalCategory(data.data.data[0].Total[0].count));
    } else {
      ReduxStore.dispatch(setCategoryItem([]));
      ReduxStore.dispatch(setTotalCategory(0));
    }
  } catch (error) {
    ReduxStore.dispatch(HideLoader());
    ReduxStore.dispatch(setCategoryItem([]));
    ReduxStore.dispatch(setTotalCategory(0));
    if (error.response && error.response.status === 401) {
      ErrorToast("Unauthorized. Please log in again.");
      removeSessions();
    } else {
      ErrorToast(error.response?.data?.response || "An error occurred");
    }
  }
};

export const CategoryDeleteRequest = async (id) => {
  ReduxStore.dispatch(ShowLoader());
  const url = BaseUrl + "category/delete/" + id;

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

export const CategoryDetailById = async (id) => {
  ReduxStore.dispatch(ShowLoader());
  const url = BaseUrl + "category/detail/" + id;

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

export const CategoryStatusChange = async (id) => {
  ReduxStore.dispatch(ShowLoader());
  const url = BaseUrl + "category/statusUpdate/" + id;

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

export const CategoryDropDownList = async () => {
  ReduxStore.dispatch(ShowLoader());
  const url = BaseUrl + "category/dropdownlist/";

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
