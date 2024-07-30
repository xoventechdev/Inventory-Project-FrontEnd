import axios from "axios";
import { HideLoader, ShowLoader } from "../redux/slice/settings-slice";
import ReduxStore from "../redux/store/ReduxStore";
import { BaseUrl, reqHeaders } from "../utility/Config";
import { ErrorToast, SuccessToast } from "../utility/FormHelper";

import { removeSessions } from "../utility/SessionHelper";
import {
  setExpenseSummary,
  setPurchaseSummary,
  setReturnSummary,
  setSalesSummary,
} from "../redux/slice/summary-slice";

export const ExpenseSummaryRequest = async () => {
  ReduxStore.dispatch(ShowLoader());
  const url = BaseUrl + "expense/summary";

  try {
    const data = await axios.get(url, reqHeaders);
    ReduxStore.dispatch(HideLoader());
    if (
      data.data.status == "success" &&
      data.data.response[0].last30days.length > 0
    ) {
      ReduxStore.dispatch(setExpenseSummary(data.data.response[0]));
    } else {
      ErrorToast("Expense Report data is not available");
    }
  } catch (error) {
    ReduxStore.dispatch(HideLoader());
    ReduxStore.dispatch(setExpenseSummary([]));
    if (error.response && error.response.status === 401) {
      ErrorToast("Unauthorized. Please log in again.");
      removeSessions();
    } else {
      ErrorToast(error.response?.data?.response || "An error occurred");
    }
  }
};

export const PurchaseSummaryRequest = async () => {
  ReduxStore.dispatch(ShowLoader());
  const url = BaseUrl + "purchase/summary";

  try {
    const data = await axios.get(url, reqHeaders);
    ReduxStore.dispatch(HideLoader());
    if (
      data.data.status == "success" &&
      data.data.response[0].last30days.length > 0
    ) {
      ReduxStore.dispatch(setPurchaseSummary(data.data.response[0]));
    } else {
      ErrorToast("Purchase Report data is not available");
    }
  } catch (error) {
    ReduxStore.dispatch(HideLoader());
    ReduxStore.dispatch(setPurchaseSummary([]));
    if (error.response && error.response.status === 401) {
      ErrorToast("Unauthorized. Please log in again.");
      removeSessions();
    } else {
      ErrorToast(error.response?.data?.response || "An error occurred");
    }
  }
};

export const ReturnSummaryRequest = async () => {
  ReduxStore.dispatch(ShowLoader());
  const url = BaseUrl + "return/summary";

  try {
    const data = await axios.get(url, reqHeaders);
    ReduxStore.dispatch(HideLoader());
    if (
      data.data.status == "success" &&
      data.data.response[0].last30days.length > 0
    ) {
      ReduxStore.dispatch(setReturnSummary(data.data.response[0]));
    } else {
      ErrorToast("Return Report data is not available");
    }
  } catch (error) {
    ReduxStore.dispatch(HideLoader());
    ReduxStore.dispatch(setReturnSummary([]));
    if (error.response && error.response.status === 401) {
      ErrorToast("Unauthorized. Please log in again.");
      removeSessions();
    } else {
      ErrorToast(error.response?.data?.response || "An error occurred");
    }
  }
};

export const SalesSummaryRequest = async () => {
  ReduxStore.dispatch(ShowLoader());
  const url = BaseUrl + "sales/summary";

  try {
    const data = await axios.get(url, reqHeaders);
    ReduxStore.dispatch(HideLoader());
    if (
      data.data.status == "success" &&
      data.data.response[0].last30days.length > 0
    ) {
      ReduxStore.dispatch(setSalesSummary(data.data.response[0]));
    } else {
      ErrorToast("Sales Report data is not available");
    }
  } catch (error) {
    ReduxStore.dispatch(HideLoader());
    ReduxStore.dispatch(setSalesSummary([]));
    if (error.response && error.response.status === 401) {
      ErrorToast("Unauthorized. Please log in again.");
      removeSessions();
    } else {
      ErrorToast(error.response?.data?.response || "An error occurred");
    }
  }
};
