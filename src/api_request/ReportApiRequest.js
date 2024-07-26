import axios from "axios";
import { HideLoader, ShowLoader } from "../redux/slice/settings-slice";
import ReduxStore from "../redux/store/ReduxStore";
import { BaseUrl, reqHeaders } from "../utility/Config";
import { ErrorToast, SuccessToast } from "../utility/FormHelper";

import { removeSessions } from "../utility/SessionHelper";
import { setExpenseReport } from "../redux/slice/report-slice";

export const ExpenseReportRequest = async (from, to) => {
  ReduxStore.dispatch(ShowLoader());
  const url = BaseUrl + "expense/report";
  const postBody = {
    fromDate: from + "T00:00:00.000+00:00",
    toDate: to + "T00:00:00.000+00:00",
  };

  try {
    const data = await axios.post(url, postBody, reqHeaders);
    // console.log(data);
    ReduxStore.dispatch(HideLoader());
    if (
      data.data.status == "success" &&
      data.data.response[0].data.length > 0
    ) {
      ReduxStore.dispatch(setExpenseReport(data.data.response[0]));
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
