import axios from "axios";
import { HideLoader, ShowLoader } from "../redux/slice/settings-slice";
import ReduxStore from "../redux/store/ReduxStore";
import { BaseUrl, reqHeaders } from "../utility/Config";
import { ErrorToast, SuccessToast } from "../utility/FormHelper";
import {
  setBrandItem,
  setFormValues,
  setTotalBrand,
} from "../redux/slice/brand-slice";

export const AddBrand = (data) => {
  ReduxStore.dispatch(ShowLoader());
  let URL = BaseUrl + "brand/create";
  return axios
    .post(URL, data, {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
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
      UnAuthorizeRequest(error);
      return false;
    });
};

export const BrandListRequest = async (page, perPage, key) => {
  ReduxStore.dispatch(ShowLoader());
  const url = BaseUrl + "brand/tableList/" + page + "/" + perPage + "/" + key;
  try {
    const data = await axios.get(url, reqHeaders);
    ReduxStore.dispatch(HideLoader());
    if (data.data.status == "success" && !data.data.data[0].Total[0] == []) {
      ReduxStore.dispatch(setBrandItem(data.data.data[0].Rows));
      ReduxStore.dispatch(setTotalBrand(data.data.data[0].Total[0].count));
    }
  } catch (error) {
    ReduxStore.dispatch(HideLoader());
    console.log(error);
    ReduxStore.dispatch(setBrandItem([]));
    ReduxStore.dispatch(setTotalBrand(0));
  }
};

export const BrandDetail = async (id) => {
  ReduxStore.dispatch(ShowLoader());
  const url = BaseUrl + "brand/detail/" + id;
  try {
    const data = await axios.get(url, reqHeaders);
    ReduxStore.dispatch(HideLoader());
    if (data.data.status == "success") {
      console.log(data.data.response);
      ReduxStore.dispatch(
        setFormValues({ name: "name", value: data.data.response.name })
      );
    }
  } catch (error) {
    ReduxStore.dispatch(HideLoader());
    console.log(error);
    ReduxStore.dispatch(setBrandItem([]));
    ReduxStore.dispatch(setTotalBrand(0));
  }
};

// BrandRoutes.post("/create", AuthVerified, BrandCreate);
// BrandRoutes.put("/update/:id", AuthVerified, BrandUpdate);
// BrandRoutes.get("/dropdownlist", AuthVerified, BrandDropDown);
// BrandRoutes.get(
//   "/tableList/:pageNo/:perPage/:searchKeyword",
//   AuthVerified,
//   BrandList
// );
// BrandRoutes.delete("/delete/:id", AuthVerified, BrandDelete);
// BrandRoutes.put("/statusUpdate/:id", AuthVerified, BrandStatus);
