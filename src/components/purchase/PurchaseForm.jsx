import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BsCartCheck, BsTrash } from "react-icons/bs";
import {
  AddPurchase,
  ProductDropDownList,
  SupplierDropDownList,
} from "../../api_request/PurchaseApiRequest";
import {
  removePurchaseItemList,
  resetItemFormValues,
  savePurchaseItemList,
  setFormValues,
  setItemFormValues,
} from "../../redux/slice/purchase-slice";
import ReduxStore from "../../redux/store/ReduxStore";
import { ErrorToast, IsEmpty, SuccessToast } from "../../utility/FormHelper";
import { ToastContainer } from "react-toastify";

const PurchaseForm = () => {
  useEffect(() => {
    (async () => {
      await SupplierDropDownList();
      await ProductDropDownList();
    })();
  }, []);
  const formData = useSelector((state) => state.purchase.formValues);
  const itemFromValues = useSelector((state) => state.purchase.itemFromValues);
  const supplierList = useSelector((state) => state.purchase.supplierList);
  const productList = useSelector((state) => state.purchase.productList);
  const purchaseItemList = useSelector(
    (state) => state.purchase.purchaseItemList
  );

  const onChangePurchase = (e) => {
    const { name, value } = e.target;
    ReduxStore.dispatch(setFormValues({ [name]: value }));

    let grandCost =
      formData.grandCost +
      formData.vatTax +
      formData.otherCost +
      formData.shippingCost -
      formData.discount;
    ReduxStore.dispatch(setFormValues({ grandCost }));
  };
  const onChangePurchaseItem = (e) => {
    const { name, value } = e.target;
    if (name === "productId") {
      const productName = e.target.options[e.target.selectedIndex].text;
      ReduxStore.dispatch(
        setItemFormValues({ productId: value, productName: productName })
      );
    } else {
      ReduxStore.dispatch(setItemFormValues({ [name]: value }));
    }
  };

  const addToPurchase = async () => {
    if (IsEmpty(formData.supplierId)) {
      ErrorToast("Select a supplier");
    } else if (purchaseItemList.length === 0) {
      ErrorToast("Please, select a purchase in product list");
    } else {
      await AddPurchase({ parent: formData, child: itemFromValues }).then(
        (res) => {
          if (res == 2) {
            navigate("/purchase");
          } else {
            SuccessToast("Purchase added successfully");
          }
        }
      );
    }
  };

  const addToPurchaseItem = () => {
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

      let grandCost = formData.grandCost + updatedItemValues.total;
      ReduxStore.dispatch(setFormValues({ grandCost }));
      ReduxStore.dispatch(savePurchaseItemList(updatedItemValues));
      ReduxStore.dispatch(resetItemFormValues());
    }
  };

  const removeFromPurchaseItem = (i, total) => {
    let grandCost = formData.grandCost - total;
    ReduxStore.dispatch(setFormValues({ grandCost }));
    ReduxStore.dispatch(removePurchaseItemList(i));
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-md-4 col-lg-4 mb-3">
          <div className="card h-100">
            <div className="card-body">
              <div className="row">
                <ToastContainer />
                <h5>Create Purchase</h5>
                <hr className="bg-light" />
                <div className="col-12 p-1">
                  <label className="form-label">Supplier</label>
                  <select
                    value={
                      formData.supplierId === "" ? "1" : formData.supplierId
                    }
                    name="supplierId"
                    onChange={onChangePurchase}
                    className="form-control form-control-sm"
                  >
                    <option value="">Select Supplier</option>
                    {supplierList.map((type, i) => {
                      return (
                        <option key={i + 1} value={type._id}>
                          {type.name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="col-12 p-1">
                  <label className="form-label">Vat/Tax</label>
                  <input
                    value={formData.vatTax}
                    name="vatTax"
                    onChange={onChangePurchase}
                    className="form-control form-control-sm"
                    type="number"
                  />
                </div>

                <div className="col-12 p-1">
                  <label className="form-label">Discount</label>
                  <input
                    value={formData.discount}
                    name="discount"
                    onChange={onChangePurchase}
                    className="form-control form-control-sm"
                    type="number"
                  />
                </div>

                <div className="col-12 p-1">
                  <label className="form-label">Other Cost</label>
                  <input
                    value={formData.otherCost}
                    name="otherCost"
                    onChange={onChangePurchase}
                    className="form-control form-control-sm"
                    type="number"
                  />
                </div>

                <div className="col-12 p-1">
                  <label className="form-label">Shipping Cost</label>
                  <input
                    value={formData.shippingCost}
                    name="shippingCost"
                    onChange={onChangePurchase}
                    className="form-control form-control-sm"
                    type="number"
                  />
                </div>

                <div className="col-12 p-1">
                  <label className="form-label">Grand Total</label>
                  <input
                    value={formData.grandCost}
                    name="grandCost"
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
                    onChange={onChangePurchase}
                    className="form-control form-control-sm"
                    type="number"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-4 p-2">
                  <button
                    onClick={addToPurchase}
                    className="btn btn-sm my-3 btn-success"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-8 col-lg-8 mb-3">
          <div className="card  h-100">
            <div className="card-body">
              <div className="row">
                <div className="col-6  p-1">
                  <label className="form-label">Select Product</label>
                  <select
                    value={
                      itemFromValues.productId === ""
                        ? "1"
                        : itemFromValues.productId
                    }
                    name="productId"
                    onChange={onChangePurchaseItem}
                    className="form-control form-control-sm"
                  >
                    <option value="">Select Product</option>
                    {productList.map((type, i) => {
                      return (
                        <option key={i + 1} value={type._id}>
                          {type.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-2 p-1">
                  <label className="form-label">Qty</label>
                  <input
                    value={itemFromValues.qty}
                    name="qty"
                    onChange={onChangePurchaseItem}
                    className="form-control form-control-sm"
                  />
                </div>
                <div className="col-2 p-1">
                  <label className="form-label">Unit Price</label>
                  <input
                    value={itemFromValues.unitCost}
                    name="unitCost"
                    onChange={onChangePurchaseItem}
                    className="form-control form-control-sm"
                  />
                </div>
                <div className="col-2 p-1">
                  <label className="form-label">Add to cart</label>
                  <button
                    onClick={addToPurchaseItem}
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
                        {purchaseItemList.map((item, i) => {
                          return (
                            <tr key={i}>
                              <td>{item.productName}</td>
                              <td>{item.qty}</td>
                              <td>{item.unitCost}</td>
                              <td>{item.total}</td>
                              <td>
                                <button
                                  onClick={removeFromPurchaseItem.bind(
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
                          );
                        })}
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

export default PurchaseForm;
