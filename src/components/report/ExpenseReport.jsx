import React, { useEffect, useRef, useState } from "react";
import { ExpenseReportRequest } from "../../api_request/ReportApiRequest";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { ErrorToast } from "../../utility/FormHelper";

const ExpenseReport = () => {
  const report = useSelector((state) => state.report.expenseReport);
  console.log(report);
  let fromRef,
    toRef = useRef();

  const viewReport = async () => {
    const fromDate = fromRef.value;
    const toDate = toRef.value;
    console.log(fromDate);
    if (fromDate && toDate) {
      await ExpenseReportRequest(fromDate, toDate);
    } else {
      ErrorToast("Please, select a date range");
    }
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 mb-3">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <ToastContainer />
                <h5>Expense Report by Date</h5>
                <hr className="bg-light" />

                <div className="col-4 p-2">
                  <label className="form-label">Date Form:</label>
                  <input
                    ref={(input) => (fromRef = input)}
                    className="form-control form-control-sm"
                    type="date"
                  />
                </div>
                <div className="col-4 p-2">
                  <label className="form-label">Date To:</label>
                  <input
                    ref={(input) => (toRef = input)}
                    className="form-control form-control-sm"
                    type="date"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-4 p-2">
                  <button
                    onClick={viewReport}
                    className="btn btn-sm my-3 btn-success"
                  >
                    View Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {report.length !== 0 ? (
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <h6>Total: {report.total[0].total} </h6>
                    <button className="btn btn-sm my-2 btn-success">
                      Download CSV
                    </button>
                    <button className="btn btn-sm my-2 ms-2 btn-success">
                      Download XLS
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default ExpenseReport;
