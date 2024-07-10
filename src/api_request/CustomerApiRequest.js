import axios from "axios";
import { HideLoader, ShowLoader } from "../redux/slice/settings-slice";
import ReduxStore from "../redux/store/ReduxStore";
import { BaseUrl, reqHeaders } from "../utility/Config";
import { ErrorToast, SuccessToast } from "../utility/FormHelper";
import { removeSessions } from "../utility/SessionHelper";
import {
  setCustomerItem,
  setTotalCustomer,
} from "../redux/slice/customer-slice";

export const AddCustomer = (data) => {
  ReduxStore.dispatch(ShowLoader());
  let URL = BaseUrl + "customer/create";
  return axios
    .post(URL, data, reqHeaders)
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
      removeSessions();
      ReduxStore.dispatch(HideLoader());
      ErrorToast(error.message);
      return false;
    });
};

export const CustomerListRequest = async (page, perPage, key) => {
  ReduxStore.dispatch(ShowLoader());
  const url =
    BaseUrl + "customer/tableList/" + page + "/" + perPage + "/" + key;

  try {
    const data = await axios.get(url, reqHeaders);

    ReduxStore.dispatch(HideLoader());
    if (data.data.status == "success" && !data.data.data[0].Total[0] == []) {
      ReduxStore.dispatch(setCustomerItem(data.data.data[0].Rows));
      ReduxStore.dispatch(setTotalCustomer(data.data.data[0].Total[0].count));
    }
  } catch (error) {
    ReduxStore.dispatch(HideLoader());
    ReduxStore.dispatch(setCustomerItem([]));
    ReduxStore.dispatch(setTotalCustomer(0));
  }
};
