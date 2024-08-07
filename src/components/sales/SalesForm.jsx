import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BsCartCheck, BsTrash } from "react-icons/bs";
import {
  AddSales,
  ProductDropDownList,
  SalesDetailById,
  CustomerDropDownList,
} from "../../api_request/SalesApiRequest";
import {
  emptySalesItemList,
  removeSalesItemList,
  resetFormValues,
  resetItemFormValues,
  saveSalesItemList,
  setFormValues,
  setItemFormValues,
} from "../../redux/slice/sales-slice";
import ReduxStore from "../../redux/store/ReduxStore";
import { ErrorToast, IsEmpty, SuccessToast } from "../../utility/FormHelper";
import { ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const SalesForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      (async () => {
        await SalesDetailById(id);
        await CustomerDropDownList();
        await ProductDropDownList();
      })();
    } else {
      ReduxStore.dispatch(resetFormValues());
      ReduxStore.dispatch(emptySalesItemList());
      (async () => {
        await CustomerDropDownList();
        await ProductDropDownList();
      })();
    }
  }, [id]);

  const formData = useSelector((state) => state.sales.formValues);
  const itemFromValues = useSelector((state) => state.sales.itemFromValues);
  const customerList = useSelector((state) => state.sales.customerList);
  const productList = useSelector((state) => state.sales.productList);
  const salesItemList = useSelector((state) => state.sales.salesItemList);

  const onChangeSales = (e) => {
    const { name, value } = e.target;
    ReduxStore.dispatch(setFormValues({ [name]: value }));
  };

  const onChangeSalesItem = (e) => {
    const { name, value } = e.target;
    if (name === "productId") {
      const productName = e.target.options[e.target.selectedIndex].text;
      ReduxStore.dispatch(setItemFormValues({ productId: value, productName }));
    } else {
      ReduxStore.dispatch(setItemFormValues({ [name]: value }));
    }
  };

  const addToSales = async () => {
    if (IsEmpty(formData.customerId)) {
      ErrorToast("Select a customer");
    } else if (salesItemList.length === 0) {
      ErrorToast("Please, select a sales in product list");
    } else {
      await AddSales(
        {
          parent: formData,
          child: salesItemList,
        },
        id
      ).then((res) => {
        if (res === 2) {
          navigate("/sale");
        }
      });
    }
  };

  const addToSalesItem = () => {
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
      ReduxStore.dispatch(saveSalesItemList(updatedItemValues));
      ReduxStore.dispatch(resetItemFormValues());
    }
  };

  const removeFromSalesItem = (i, total) => {
    const newGrandCost = formData.grandCost - total;
    ReduxStore.dispatch(setFormValues({ grandCost: newGrandCost }));
    ReduxStore.dispatch(removeSalesItemList(i));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-md-4 col-lg-4 mb-3">
          <div className="card h-100">
            <div className="card-body">
              <div className="row">
                <ToastContainer />
                <h5>{id ? "Update Sales" : "Create Sales"}</h5>
                <hr className="bg-light" />
                <div className="col-12 p-1">
                  <label className="form-label">Customer</label>
                  <select
                    value={
                      formData.customerId === "" ? "1" : formData.customerId
                    }
                    name="customerId"
                    onChange={onChangeSales}
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
                    onChange={onChangeSales}
                    className="form-control form-control-sm"
                    type="number"
                  />
                </div>
                <div className="col-12 p-1">
                  <label className="form-label">Discount</label>
                  <input
                    value={formData.discount}
                    name="discount"
                    onChange={onChangeSales}
                    className="form-control form-control-sm"
                    type="number"
                  />
                </div>
                <div className="col-12 p-1">
                  <label className="form-label">Other Cost</label>
                  <input
                    value={formData.otherCost}
                    name="otherCost"
                    onChange={onChangeSales}
                    className="form-control form-control-sm"
                    type="number"
                  />
                </div>
                <div className="col-12 p-1">
                  <label className="form-label">Shipping Cost</label>
                  <input
                    value={formData.shippingCost}
                    name="shippingCost"
                    onChange={onChangeSales}
                    className="form-control form-control-sm"
                    type="number"
                  />
                </div>
                <div className="col-12 p-1">
                  <label className="form-label">Total</label>
                  <input
                    value={formData.grandCost}
                    name="grandCost"
                    onChange={onChangeSales}
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
                    onChange={onChangeSales}
                    className="form-control form-control-sm"
                    type="text"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-4 p-2">
                  <button
                    onClick={addToSales}
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
                    onChange={onChangeSalesItem}
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
                    onChange={onChangeSalesItem}
                    className="form-control form-control-sm"
                  />
                </div>
                <div className="col-2 p-1">
                  <label className="form-label">Unit Price</label>
                  <input
                    value={itemFromValues.unitCost}
                    name="unitCost"
                    onChange={onChangeSalesItem}
                    className="form-control form-control-sm"
                  />
                </div>
                <div className="col-2 p-1">
                  <label className="form-label">Add to cart</label>
                  <button
                    onClick={addToSalesItem}
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
                        {salesItemList.map((item, i) => (
                          <tr key={i}>
                            <td>
                              {item.product
                                ? item.product.name
                                : item.productName}
                            </td>
                            <td>{item.qty}</td>
                            <td>{item.unitCost}</td>
                            <td>{item.total}</td>
                            <td>
                              <button
                                onClick={removeFromSalesItem.bind(
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
                        ))}
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

export default SalesForm;
