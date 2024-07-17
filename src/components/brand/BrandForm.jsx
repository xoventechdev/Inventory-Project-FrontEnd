import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ReduxStore from "../../redux/store/ReduxStore";
import { resetFormValues, setFormValues } from "../../redux/slice/brand-slice";
import { ErrorToast, IsEmpty } from "../../utility/FormHelper";
import { ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { AddBrand, BrandDetailById } from "../../api_request/BrandApiRequest";

const BrandForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      (async () => {
        await BrandDetailById(id);
      })();
    } else {
      ReduxStore.dispatch(resetFormValues());
    }
  }, [id]);

  const formData = useSelector((state) => state.brand.formValues);
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    ReduxStore.dispatch(setFormValues({ [name]: value }));
  };

  const saveTo = () => {
    const { name } = formData;
    if (IsEmpty(name)) {
      ErrorToast("Please enter a name");
    } else {
      AddBrand(formData, id).then((res) => {
        if (res == 2) {
          navigate("/brand");
        }
      });
    }
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-12">
                  <h5>{id ? "Update Brand" : "Add Brand"}</h5>
                  <ToastContainer />
                  <hr className="bg-light" />
                </div>
                <div className="col-md-6 col-lg-4 p-2">
                  <label className="form-label">Brand Name</label>
                  <input
                    value={formData.name}
                    name="name"
                    placeholder="Type name"
                    onChange={onChangeHandler}
                    className="form-control form-control-sm"
                    type="text"
                  />
                </div>

                <div className="col-md-6 col-lg-4 p-2">
                  <label className="form-label">Photo</label>
                  <input
                    placeholder="Type photo url"
                    value={formData.photo}
                    name="photo"
                    onChange={onChangeHandler}
                    className="form-control form-control-sm"
                    type="text"
                  />
                </div>
                <div className="col-md-6 col-lg-4 p-2">
                  <label className="form-label">Status</label>
                  <select
                    value={formData.status === "" ? "1" : formData.status}
                    name="status"
                    onChange={onChangeHandler}
                    className="form-control form-control-sm"
                  >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>

                <div className="col-12 p-2">
                  <button
                    onClick={saveTo}
                    className="btn btn-sm my-3 btn-success"
                  >
                    {id ? "Update Brand" : "Add Brand"}
                  </button>
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
