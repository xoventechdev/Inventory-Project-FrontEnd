import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ReduxStore from "../../redux/store/ReduxStore";
import {
  resetFormValues,
  setFormValues,
} from "../../redux/slice/expense-slice";
import { ErrorToast, IsEmail, IsEmpty } from "../../utility/FormHelper";
import { ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  AddExpense,
  ExpenseDetailById,
  ExpenseTypeDropDownList,
} from "../../api_request/ExpenseApiRequest";

const ExpenseForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      (async () => {
        await ExpenseDetailById(id);
      })();
    } else {
      ReduxStore.dispatch(resetFormValues());
      (async () => {
        await ExpenseTypeDropDownList();
      })();
    }
  }, [id]);

  const formData = useSelector((state) => state.expense.formValues);
  const typesList = useSelector((state) => state.expense.typesList);
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    ReduxStore.dispatch(setFormValues({ [name]: value }));
  };

  const saveTo = () => {
    const { name, amount, typeID } = formData;
    if (IsEmpty(name)) {
      ErrorToast("Please enter a name");
    } else if (amount === 0) {
      ErrorToast("Please enter a valid amount");
    } else if (IsEmpty(typeID)) {
      ErrorToast("Please select a expense type");
    } else {
      AddExpense(formData, id).then((res) => {
        if (res == 2) {
          navigate("/expense");
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
                  <h5>{id ? "Update Expense" : "Add Expense"}</h5>
                  <ToastContainer />
                  <hr className="bg-light" />
                </div>
                <div className="col-md-6 col-lg-4 p-2">
                  <label className="form-label">Expense Name</label>
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
                  <label className="form-label">Amount</label>
                  <input
                    value={formData.amount}
                    name="amount"
                    placeholder="Type name"
                    onChange={onChangeHandler}
                    className="form-control form-control-sm"
                    type="text"
                  />
                </div>
                <div className="col-md-6 col-lg-4 p-2">
                  <label className="form-label">Type</label>
                  <select
                    value={formData.typeID === "" ? "1" : formData.typeID}
                    name="typeID"
                    onChange={onChangeHandler}
                    className="form-control form-control-sm"
                  >
                    {typesList.map((type, i) => {
                      return (
                        <option key={i + 1} value={type.id}>
                          {type.name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="col-12 p-2">
                  <label className="form-label">Note</label>
                  <textarea
                    placeholder="Type a note"
                    value={formData.note}
                    name="note"
                    onChange={onChangeHandler}
                    className="form-control form-control-sm"
                    rows={4}
                  />
                </div>

                <div className="col-12 p-2">
                  <button
                    onClick={saveTo}
                    className="btn btn-sm my-3 btn-success"
                  >
                    {id ? "Update Expense" : "Add Expense"}
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
export default ExpenseForm;
