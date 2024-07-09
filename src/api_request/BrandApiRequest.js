import axios from "axios";
import { HideLoader, ShowLoader } from "../redux/slice/settings-slice";
import ReduxStore from "../redux/store/ReduxStore";
import { BaseUrl } from "../utility/Config";
import { ErrorToast, SuccessToast } from "../utility/FormHelper";

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
