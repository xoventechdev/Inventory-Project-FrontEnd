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
  BrandDropDownList,
  CategoryDropDownList,
  ProductDetailById,
} from "../../api_request/ProductApiRequest";
import { useNavigate, useParams } from "react-router-dom";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      (async () => {
        await BrandDropDownList();
        await CategoryDropDownList();
        await ProductDetailById(id);
      })();
    } else {
      (async () => {
        await BrandDropDownList();
        await CategoryDropDownList();
      })();
      ReduxStore.dispatch(resetFormValues());
    }
  }, [id]);

  const formData = useSelector((state) => state.product.formValues);
  const brandList = useSelector((state) => state.product.brandList);
  const categoryList = useSelector((state) => state.product.categoryList);
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    ReduxStore.dispatch(setFormValues({ [name]: value }));
  };

  const saveTo = () => {
    const { name, brandId, categoryId, unit, details } = formData;
    if (IsEmpty(name)) {
      ErrorToast("Please enter a name");
    } else if (IsEmpty(brandId)) {
      ErrorToast("Please Select a brand");
    } else if (IsEmpty(categoryId)) {
      ErrorToast("Please select a category");
    } else if (IsEmpty(unit)) {
      ErrorToast("Please put a unit number");
    } else if (IsEmpty(details)) {
      ErrorToast("Please write product detail");
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
                  <label className="form-label">Brand</label>
                  <select
                    value={formData.brandId === "" ? "" : formData.brandId}
                    name="brandId"
                    onChange={onChangeHandler}
                    className="form-control form-control-sm"
                  >
                    <option value="">Select Brand</option>
                    {brandList.map((type, i) => {
                      return (
                        <option key={i + 1} value={type._id}>
                          {type.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-md-6 col-lg-4 p-2">
                  <label className="form-label">Category</label>
                  <select
                    value={
                      formData.categoryId === "" ? "" : formData.categoryId
                    }
                    name="categoryId"
                    onChange={onChangeHandler}
                    className="form-control form-control-sm"
                  >
                    <option value="">Select Category</option>
                    {categoryList.map((type, i) => {
                      return (
                        <option key={i + 1} value={type._id}>
                          {type.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-md-6 col-lg-6 p-2">
                  <label className="form-label">Product Detail </label>
                  <textarea
                    placeholder="Type Product Detail"
                    value={formData.details}
                    name="details"
                    onChange={onChangeHandler}
                    className="form-control form-control-sm"
                    rows={4}
                  />
                </div>
                <div className="col-md-6 col-lg-6 d-flex">
                  <div className="col-6 p-2">
                    <label className="form-label">Unit </label>
                    <input
                      placeholder="Type Product Unit"
                      value={formData.unit}
                      name="unit"
                      onChange={onChangeHandler}
                      className="form-control form-control-sm"
                      type="number"
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
