import React, { useEffect, useRef, useState } from "react";
import { ExpenseReportRequest } from "../../api_request/ReportApiRequest";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { ErrorToast } from "../../utility/FormHelper";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
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
      <div className="row">
        <div className="col-md-6 p-2">
          <div className="card">
            <div className="card-body">
              <span className="h6">Expense Last 30 Days</span>
              <ResponsiveContainer className="mt-4" width="100%" height={200}>
                <AreaChart
                  width={500}
                  height={200}
                  data={report.data}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="_id" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="TotalAmount"
                    stroke="#CB0C9F"
                    fill="#CB0C9F"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseReport;
