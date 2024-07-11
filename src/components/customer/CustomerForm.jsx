import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ReduxStore from "../../redux/store/ReduxStore";
import {
  resetFormValues,
  setFormValues,
} from "../../redux/slice/customer-slice";
import { ErrorToast, IsEmail, IsEmpty } from "../../utility/FormHelper";
import { ToastContainer } from "react-toastify";
import {
  AddCustomer,
  CustomerDetailById,
} from "../../api_request/CustomerApiRequest";
import { useParams } from "react-router-dom";

const CustomerForm = () => {
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      (async () => {
        await CustomerDetailById(id);
      })();
    } else {
      ReduxStore.dispatch(resetFormValues());
    }
  }, [id]);

  const formData = useSelector((state) => state.customer.formValues);
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    ReduxStore.dispatch(setFormValues({ [name]: value }));
  };

  const saveTo = () => {
    const { name, mobile, email, address } = formData;
    if (IsEmpty(name)) {
      ErrorToast("Please enter a name");
    } else if (IsEmpty(mobile)) {
      ErrorToast("Please enter a mobile");
    } else if (IsEmail(email)) {
      ErrorToast("Please enter a email");
    } else if (IsEmpty(address)) {
      ErrorToast("Please enter a address");
    } else {
      AddCustomer(formData, id);
    }
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                {id ? <h5>Update Customer</h5> : <h5>Add Customer</h5>}
                <ToastContainer />
                <hr className="bg-light" />

                <div className="col-3 p-2">
                  <label className="form-label">Customer Name</label>
                  <input
                    value={formData.name}
                    name="name"
                    placeholder="Type name"
                    onChange={onChangeHandler}
                    className="form-control form-control-sm"
                    type="text"
                  />
                </div>
                <div className="col-3 p-2">
                  <label className="form-label">Mobile No</label>
                  <input
                    placeholder="Type mobile number"
                    value={formData.mobile}
                    name="mobile"
                    onChange={onChangeHandler}
                    className="form-control form-control-sm"
                    type="text"
                  />
                </div>
                <div className="col-3 p-2">
                  <label className="form-label">Email </label>
                  <input
                    placeholder="Type email address"
                    value={formData.email}
                    name="email"
                    onChange={onChangeHandler}
                    className="form-control form-control-sm"
                    type="text"
                  />
                </div>
                <div className="col-3 d-flex">
                  <div className="col-6 p-2">
                    <label className="form-label">Photo </label>
                    <input
                      placeholder="Type photo url"
                      value={formData.photo}
                      name="photo"
                      onChange={onChangeHandler}
                      className="form-control form-control-sm"
                      type="text"
                    />
                  </div>
                  <div className="col-6 p-2">
                    <label className="form-label">Status </label>
                    <select
                      value={formData.status}
                      name="status"
                      onChange={onChangeHandler}
                      className="form-control form-control-sm"
                    >
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="col-12 p-2">
                  <label className="form-label">Address</label>
                  <textarea
                    placeholder="Type address"
                    value={formData.address}
                    name="address"
                    onChange={onChangeHandler}
                    className="form-control form-control-sm"
                    rows={4}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-4 p-2">
                  <button
                    onClick={saveTo}
                    className="btn btn-sm my-3 btn-success"
                  >
                    {id ? "Update Customer" : "Add Customer"}
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

export default CustomerForm;
