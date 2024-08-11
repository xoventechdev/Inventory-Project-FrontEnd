import axios from "axios";
import { HideLoader, ShowLoader } from "../redux/slice/settings-slice";
import ReduxStore from "../redux/store/ReduxStore";
import { BaseUrl, reqHeaders } from "../utility/Config";
import { ErrorToast } from "../utility/FormHelper";

import { removeSessions } from "../utility/SessionHelper";
import {
  setExpenseReport,
  setPurchaseReport,
  setReturnReport,
  setSalesReport,
} from "../redux/slice/report-slice";

export const ExpenseReportRequest = async (from, to) => {
  ReduxStore.dispatch(ShowLoader());
  const url = BaseUrl + "expense/report";
  const postBody = {
    fromDate: from + "T00:00:00.000Z",
    toDate: to + "T23:59:59.999Z",
  };

  try {
    const data = await axios.post(url, postBody, reqHeaders);
    ReduxStore.dispatch(HideLoader());
    if (
      data.data.status == "success" &&
      data.data.response[0].data.length > 0
    ) {
      ReduxStore.dispatch(setExpenseReport(data.data.response[0]));
    } else {
      ReduxStore.dispatch(setExpenseReport([]));
      ErrorToast("Expense Report data is not available");
    }
  } catch (error) {
    ReduxStore.dispatch(HideLoader());
    ReduxStore.dispatch(setExpenseReport([]));
    if (error.response && error.response.status === 401) {
      ErrorToast("Unauthorized. Please log in again.");
      removeSessions();
    } else {
      ErrorToast(error.response?.data?.response || "An error occurred");
    }
  }
};

export const PurchaseReportRequest = async (from, to) => {
  ReduxStore.dispatch(ShowLoader());
  const url = BaseUrl + "purchase/report";
  const postBody = {
    fromDate: from + "T00:00:00.000Z",
    toDate: to + "T23:59:59.999Z",
  };

  try {
    const data = await axios.post(url, postBody, reqHeaders);
    ReduxStore.dispatch(HideLoader());
    if (
      data.data.status == "success" &&
      data.data.response[0].data.length > 0
    ) {
      ReduxStore.dispatch(setPurchaseReport(data.data.response[0]));
    } else {
      ReduxStore.dispatch(setPurchaseReport([]));
      ErrorToast("Expense Report data is not available");
    }
  } catch (error) {
    ReduxStore.dispatch(HideLoader());
    ReduxStore.dispatch(setPurchaseReport([]));
    if (error.response && error.response.status === 401) {
      ErrorToast("Unauthorized. Please log in again.");
      removeSessions();
    } else {
      ErrorToast(error.response?.data?.response || "An error occurred");
    }
  }
};

export const SalesReportRequest = async (from, to) => {
  ReduxStore.dispatch(ShowLoader());
  const url = BaseUrl + "sales/report";
  const postBody = {
    fromDate: from + "T00:00:00.000Z",
    toDate: to + "T23:59:59.999Z",
  };

  try {
    const data = await axios.post(url, postBody, reqHeaders);
    ReduxStore.dispatch(HideLoader());
    if (
      data.data.status == "success" &&
      data.data.response[0].data.length > 0
    ) {
      ReduxStore.dispatch(setSalesReport(data.data.response[0]));
    } else {
      ReduxStore.dispatch(setSalesReport([]));
      ErrorToast("Expense Report data is not available");
    }
  } catch (error) {
    ReduxStore.dispatch(HideLoader());
    ReduxStore.dispatch(setSalesReport([]));
    if (error.response && error.response.status === 401) {
      ErrorToast("Unauthorized. Please log in again.");
      removeSessions();
    } else {
      ErrorToast(error.response?.data?.response || "An error occurred");
    }
  }
};

export const ReturnReportRequest = async (from, to) => {
  ReduxStore.dispatch(ShowLoader());
  const url = BaseUrl + "return/report";
  const postBody = {
    fromDate: from + "T00:00:00.000Z",
    toDate: to + "T23:59:59.999Z",
  };

  try {
    const data = await axios.post(url, postBody, reqHeaders);
    ReduxStore.dispatch(HideLoader());
    if (
      data.data.status == "success" &&
      data.data.response[0].data.length > 0
    ) {
      ReduxStore.dispatch(setReturnReport(data.data.response[0]));
    } else {
      ReduxStore.dispatch(setReturnReport([]));
      ErrorToast("Expense Report data is not available");
    }
  } catch (error) {
    ReduxStore.dispatch(HideLoader());
    ReduxStore.dispatch(setReturnReport([]));
    if (error.response && error.response.status === 401) {
      ErrorToast("Unauthorized. Please log in again.");
      removeSessions();
    } else {
      ErrorToast(error.response?.data?.response || "An error occurred");
    }
  }
};
