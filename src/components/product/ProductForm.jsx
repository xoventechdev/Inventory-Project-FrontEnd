import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ReduxStore from "../../redux/store/ReduxStore";
import {
  resetFormValues,
  setFormValues,
} from "../../redux/slice/product-slice";
import { ErrorToast, IsEmail, IsEmpty } from "../../utility/FormHelper";
import { ToastContainer } from "react-toastify";
import {
  AddProduct,
  ProductDetailById,
} from "../../api_request/ProductApiRequest";
import { useNavigate, useParams } from "react-router-dom";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      (async () => {
        await ProductDetailById(id);
      })();
    } else {
      (async () => {
        await ProductDetailById(id);
      })();
      ReduxStore.dispatch(resetFormValues());
    }
  }, [id]);

  const formData = useSelector((state) => state.product.formValues);
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
      ErrorToast("Please enter an address");
    } else {
      AddProduct(formData, id).then((res) => {
        if (res == 2) {
          navigate("/product");
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
                {id ? <h5>Update Product</h5> : <h5>Add Product</h5>}
                <ToastContainer />
                <hr className="bg-light" />

                <div className="col-md-6 col-lg-4 p-2">
                  <label className="form-label">Product Name</label>
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
                  <label className="form-label">Mobile No</label>
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
                <div className="col-md-6 col-lg-4 p-2">
                  <label className="form-label">Email </label>
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
                      value={formData.status === "" ? "1" : formData.status}
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
                    {id ? "Update Product" : "Add Product"}
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

export default ProductForm;
