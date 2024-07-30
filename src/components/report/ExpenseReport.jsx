import React, { useEffect, useRef, useState } from "react";
import { ExpenseReportRequest } from "../../api_request/ReportApiRequest";
import { useSelector, useDispatch } from "react-redux";
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
  Line,
} from "recharts";

const ExpenseReport = () => {
  const report = useSelector((state) => state.report.expenseReport);
  const expenseSummary = useSelector((state) => state.summary.expenseSummary);
  const [title, setTitle] = useState("Today");
  const [customSearch, setCustomSearch] = useState(false);
  const fromRef = useRef();
  const toRef = useRef();
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [processedData, setProcessedData] = useState([]);

  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const setPredefinedDateRange = (range) => {
    const today = new Date();
    let startDate, endDate;

    switch (range) {
      case "Today":
        startDate = new Date(today);
        endDate = new Date(today);
        break;
      case "2 Days":
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 1);
        endDate = new Date(today);
        break;
      case "7 Days":
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 7);
        endDate = new Date(today);
        break;
      case "1 Month":
        startDate = new Date(today);
        startDate.setMonth(today.getMonth() - 1);
        endDate = new Date(today);
        break;
      case "3 Months":
        startDate = new Date(today);
        startDate.setMonth(today.getMonth() - 3);
        endDate = new Date(today);
        break;
      case "6 Months":
        startDate = new Date(today);
        startDate.setMonth(today.getMonth() - 6);
        endDate = new Date(today);
        break;
      default:
        startDate = new Date(today);
        endDate = new Date(today);
    }

    setFromDate(formatDate(startDate));
    setToDate(formatDate(endDate));
    setTitle(range);
    setCustomSearch(!customSearch);
  };

  const preprocessData = (data, range) => {
    let processed = [];
    let dateFormat = "day";

    if (range === "Today" || range === "2 Days") {
      dateFormat = "hour";
    }

    data.forEach((item) => {
      const date = new Date(item.createdAt);
      let formattedDate;

      if (dateFormat === "hour") {
        formattedDate = `${date.getHours()}:00`;
      } else {
        formattedDate = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      }

      processed.push({
        name: formattedDate,
        amount: item.amount,
        TotalAmount: item.amount, // Assuming TotalAmount is the same as amount for simplicity
      });
    });

    setProcessedData(processed);
  };

  useEffect(() => {
    setPredefinedDateRange("Today");
  }, []);

  useEffect(() => {
    if (fromDate && toDate) {
      viewReport();
    }
  }, [customSearch]);

  useEffect(() => {
    if (report.data && report.data.length > 0) {
      preprocessData(report.data, title);
    }
  }, [report.data, title]);

  const viewReport = async () => {
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
                <div className="row d-flex justify-content-between">
                  <div className="col-md-6 col-lg-6 p-2">
                    <h5>Expense Report by Date</h5>
                  </div>
                  <div className="col-md-6 col-lg-6 p-2 text-end">
                    <nav>
                      {[
                        "Today",
                        "2 Days",
                        "7 Days",
                        "1 Month",
                        "3 Months",
                        "6 Months",
                      ].map((range) => (
                        <button
                          key={range}
                          className="btn btn-outline-success me-2"
                          type="button"
                          onClick={() => setPredefinedDateRange(range)}
                        >
                          {range}
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>

                <hr className="bg-light" />

                <div className="col-4 p-2">
                  <label className="form-label">Date From:</label>
                  <input
                    ref={fromRef}
                    className="form-control form-control-sm"
                    type="date"
                    defaultValue={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </div>
                <div className="col-4 p-2">
                  <label className="form-label">Date To:</label>
                  <input
                    ref={toRef}
                    className="form-control form-control-sm"
                    type="date"
                    defaultValue={toDate}
                    onChange={(e) => setToDate(e.target.value)}
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
              <span className="h6">Expense for {title}</span>
              <ResponsiveContainer className="mt-4" width="100%" height={200}>
                <AreaChart
                  width={500}
                  height={200}
                  data={processedData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Line type="monotone" dataKey="amount" stroke="#82ca9d" />
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
