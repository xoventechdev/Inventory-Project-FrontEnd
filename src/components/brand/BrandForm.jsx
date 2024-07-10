import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReduxStore from "../../redux/store/ReduxStore";
import { resetFormValues, setFormValues } from "../../redux/slice/brand-slice";
import { ErrorToast, IsEmpty } from "../../utility/FormHelper";
import { AddBrand, BrandDetail } from "../../api_request/BrandApiRequest";
import { ToastContainer } from "react-toastify";

const BrandForm = () => {
  const { id } = useParams();
  const brandInfo = useSelector((state) => state.brand.formValues);

  if (id) {
    useEffect(() => {
      BrandDetail(id);
    }, []);
  }

  const SaveChange = () => {
    if (IsEmpty(brandInfo.name)) {
      ErrorToast("Brand name is required");
    } else {
      AddBrand(brandInfo).then((res) => {
        if (res) {
          ReduxStore.dispatch(resetFormValues());
        }
      });
    }
  };

  const onChangeHandler = (e) => {
    ReduxStore.dispatch(
      setFormValues({ name: e.target.name, value: e.target.value })
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <ToastContainer />
                {id ? <h5>Update Brand</h5> : <h5>Add Brand</h5>}
                <hr className="bg-light" />
                <div className="col-4 p-2">
                  <label className="form-label">Brand Name</label>
                  <input
                    value={brandInfo.name}
                    name="name"
                    onChange={onChangeHandler}
                    className="form-control form-control-sm"
                    type="text"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-4 p-2">
                  {id ? (
                    <button
                      onClick={SaveChange}
                      className="btn btn-sm my-3 btn-success"
                    >
                      Save Change
                    </button>
                  ) : (
                    <button
                      onClick={SaveChange}
                      className="btn btn-sm my-3 btn-success"
                    >
                      Add New
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandForm;
