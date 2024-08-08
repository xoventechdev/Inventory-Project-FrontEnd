import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BsCartCheck, BsTrash } from "react-icons/bs";
import {
  AddReturn,
  ProductDropDownList,
  ReturnDetailById,
  CustomerDropDownList,
} from "../../api_request/ReturnApiRequest";
import {
  emptyReturnItemList,
  removeReturnItemList,
  resetFormValues,
  resetItemFormValues,
  saveReturnItemList,
  setFormValues,
  setItemFormValues,
} from "../../redux/slice/return-slice";
import ReduxStore from "../../redux/store/ReduxStore";
import { ErrorToast, IsEmpty, SuccessToast } from "../../utility/FormHelper";
import { ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const ReturnForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      (async () => {
        await ReturnDetailById(id);
        await CustomerDropDownList();
        await ProductDropDownList();
      })();
    } else {
      ReduxStore.dispatch(resetFormValues());
      ReduxStore.dispatch(emptyReturnItemList());
      (async () => {
        await CustomerDropDownList();
        await ProductDropDownList();
      })();
    }
  }, [id]);

  const formData = useSelector((state) => state.return.formValues);
  const itemFromValues = useSelector((state) => state.return.itemFromValues);
  const customerList = useSelector((state) => state.return.customerList);
  const productList = useSelector((state) => state.return.productList);
  const returnItemList = useSelector((state) => state.return.returnItemList);

  const onChangeReturn = (e) => {
    const { name, value } = e.target;
    ReduxStore.dispatch(setFormValues({ [name]: value }));
  };

  const onChangeReturnItem = (e) => {
    const { name, value } = e.target;
    if (name === "productId") {
      const productName = e.target.options[e.target.selectedIndex].text;
      ReduxStore.dispatch(setItemFormValues({ productId: value, productName }));
    } else {
      ReduxStore.dispatch(setItemFormValues({ [name]: value }));
    }
  };

  const addToReturn = async () => {
    if (IsEmpty(formData.customerId)) {
      ErrorToast("Select a customer");
    } else if (returnItemList.length === 0) {
      ErrorToast("Please, select a return in product list");
    } else {
      await AddReturn(
        {
          parent: formData,
          child: returnItemList,
        },
        id
      ).then((res) => {
        if (res === 2) {
          navigate("/return");
        }
      });
    }
  };

  const addToReturnItem = () => {
    if (IsEmpty(itemFromValues.productId)) {
      ErrorToast("Select a product");
    } else if (itemFromValues.qty === "" || Number(itemFromValues.qty) === 0) {
      ErrorToast("Enter quantity");
    } else if (
      itemFromValues.unitCost === "" ||
      Number(itemFromValues.unitCost) === 0
    ) {
      ErrorToast("Enter unit cost");
    } else {
      const updatedItemValues = {
        ...itemFromValues,
        total: itemFromValues.qty * itemFromValues.unitCost,
      };

      const newGrandCost = formData.grandCost + updatedItemValues.total;
      ReduxStore.dispatch(setFormValues({ grandCost: newGrandCost }));
      ReduxStore.dispatch(saveReturnItemList(updatedItemValues));
      ReduxStore.dispatch(resetItemFormValues());
    }
  };

  const removeFromReturnItem = (i, total) => {
    const newGrandCost = formData.grandCost - total;
    ReduxStore.dispatch(setFormValues({ grandCost: newGrandCost }));
    ReduxStore.dispatch(removeReturnItemList(i));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-md-4 col-lg-4 mb-3">
          <div className="card h-100">
            <div className="card-body">
              <div className="row">
                <ToastContainer />
                <h5>{id ? "Update Return" : "Create Return"}</h5>
                <hr className="bg-light" />
                <div className="col-12 p-1">
                  <label className="form-label">Customer</label>
                  <select
                    value={
                      formData.customerId === "" ? "1" : formData.customerId
                    }
                    name="customerId"
                    onChange={onChangeReturn}
                    className="form-control form-control-sm"
                  >
                    <option value="">Select Customer</option>
                    {customerList.map((type, i) => (
                      <option key={i + 1} value={type._id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-12 p-1">
                  <label className="form-label">Vat/Tax</label>
                  <input
                    value={formData.vatTax}
                    name="vatTax"
                    onChange={onChangeReturn}
                    className="form-control form-control-sm"
                    type="number"
                  />
                </div>
                <div className="col-12 p-1">
                  <label className="form-label">Discount</label>
                  <input
                    value={formData.discount}
                    name="discount"
                    onChange={onChangeReturn}
                    className="form-control form-control-sm"
                    type="number"
                  />
                </div>
                <div className="col-12 p-1">
                  <label className="form-label">Other Cost</label>
                  <input
                    value={formData.otherCost}
                    name="otherCost"
                    onChange={onChangeReturn}
                    className="form-control form-control-sm"
                    type="number"
                  />
                </div>
                <div className="col-12 p-1">
                  <label className="form-label">Shipping Cost</label>
                  <input
                    value={formData.shippingCost}
                    name="shippingCost"
                    onChange={onChangeReturn}
                    className="form-control form-control-sm"
                    type="number"
                  />
                </div>
                <div className="col-12 p-1">
                  <label className="form-label">Total</label>
                  <input
                    value={formData.grandCost}
                    name="grandCost"
                    onChange={onChangeReturn}
                    disabled
                    className="form-control form-control-sm"
                    type="number"
                  />
                </div>
                <div className="col-12 p-1">
                  <label className="form-label">Note</label>
                  <input
                    value={formData.note}
                    name="note"
                    onChange={onChangeReturn}
                    className="form-control form-control-sm"
                    type="text"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-4 p-2">
                  <button
                    onClick={addToReturn}
                    className="btn btn-sm my-3 btn-success"
                  >
                    {id ? "Update" : "Create"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-8 col-lg-8 mb-3">
          <div className="card h-100">
            <div className="card-body">
              <div className="row">
                <div className="col-6 p-1">
                  <label className="form-label">Select Product</label>
                  <select
                    value={
                      itemFromValues.productId === ""
                        ? "1"
                        : itemFromValues.productId
                    }
                    name="productId"
                    onChange={onChangeReturnItem}
                    className="form-control form-control-sm"
                  >
                    <option value="">Select Product</option>
                    {productList.map((type, i) => (
                      <option key={i + 1} value={type._id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-2 p-1">
                  <label className="form-label">Qty</label>
                  <input
                    value={itemFromValues.qty}
                    name="qty"
                    onChange={onChangeReturnItem}
                    className="form-control form-control-sm"
                  />
                </div>
                <div className="col-2 p-1">
                  <label className="form-label">Unit Price</label>
                  <input
                    value={itemFromValues.unitCost}
                    name="unitCost"
                    onChange={onChangeReturnItem}
                    className="form-control form-control-sm"
                  />
                </div>
                <div className="col-2 p-1">
                  <label className="form-label">Add to cart</label>
                  <button
                    onClick={addToReturnItem}
                    className="btn w-100 btn-success btn-sm"
                  >
                    <BsCartCheck />
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="table-responsive table-section">
                    <table className="table-sm text-center table">
                      <thead className="sticky-top bg-white">
                        <tr>
                          <th>Name</th>
                          <th>Qty</th>
                          <th>Unit Price</th>
                          <th>Total</th>
                          <th>Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {returnItemList.length > 0 ? (
                          returnItemList.map((item, i) => (
                            <tr key={i}>
                              <td>
                                {item.items
                                  ? item.product.name
                                  : item.productName}
                              </td>
                              <td>{item.qty}</td>
                              <td>{item.unitCost}</td>
                              <td>{item.total}</td>
                              <td>
                                <button
                                  onClick={removeFromReturnItem.bind(
                                    this,
                                    i,
                                    item.total
                                  )}
                                  className="btn btn-outline-light text-danger p-2 mb-0 btn-sm ms-2"
                                >
                                  <BsTrash />
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="text-center">
                              No Data Found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnForm;
