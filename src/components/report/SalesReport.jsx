import React, { useEffect, useRef, useState } from "react";
import { SalesReportRequest } from "../../api_request/ReportApiRequest";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { ErrorToast } from "../../utility/FormHelper";
import exportFromJSON from "export-from-json";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  calculateDaysBetweenDates,
  mergedReportData,
} from "../../utility/Config";

const SalesReport = () => {
  const today = new Date();
  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const report = useSelector((state) => state.report.salesReport);
  const [title, setTitle] = useState("Today");
  const [customSearch, setCustomSearch] = useState(false);
  const fromRef = useRef();
  const toRef = useRef();
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(formatDate(today));
  const [rangeCount, setRangeCount] = useState(1);

  const setPredefinedDateRange = (range) => {
    const today = new Date();
    let startDate, endDate;

    switch (range) {
      case "Today":
        startDate = new Date(today);
        endDate = new Date(today);
        setRangeCount(1);
        break;
      case "2 Days":
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 1);
        endDate = new Date(today);
        setRangeCount(2);
        break;
      case "7 Days":
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 7);
        endDate = new Date(today);
        setRangeCount(7);
        break;
      case "1 Month":
        startDate = new Date(today);
        startDate.setMonth(today.getMonth() - 1);
        endDate = new Date(today);
        setRangeCount(30);
        break;
      case "3 Months":
        startDate = new Date(today);
        startDate.setMonth(today.getMonth() - 3);
        endDate = new Date(today);
        setRangeCount(91);
        break;
      case "6 Months":
        startDate = new Date(today);
        startDate.setMonth(today.getMonth() - 6);
        endDate = new Date(today);
        setRangeCount(183);
        break;
      default:
        startDate = new Date(today);
        endDate = new Date(today);
        setRangeCount(1);
    }

    setFromDate(formatDate(startDate));
    setToDate(formatDate(endDate));
    setTitle(range);
    setCustomSearch(!customSearch);
  };

  useEffect(() => {
    setPredefinedDateRange("7 Days");
  }, []);

  useEffect(() => {
    if (fromDate && toDate) {
      viewReport();
    }
  }, [customSearch]);

  const viewReport = async () => {
    if (fromDate && toDate) {
      await SalesReportRequest(fromDate, toDate);
    } else {
      ErrorToast("Please, select a date range");
    }
  };

  const customViewReport = async () => {
    const dayCount = calculateDaysBetweenDates(toDate, fromDate);
    setRangeCount(dayCount);
    setTitle("last " + dayCount + " days");
    if (fromDate && toDate) {
      await SalesReportRequest(fromDate, toDate);
    } else {
      ErrorToast("Please, select a date range");
    }
  };

  const mergedData = mergedReportData(toDate, rangeCount, report.data);

  const exportData = (fileType) => {
    const fileName = `Sales Report ${today}`;
    if (mergedData.length > 0) {
      let ReportData = [];
      mergedData.map((item) => {
        let listItem = {
          Date: item["_id"],
          Total: item["total"],
        };
        ReportData.push(listItem);
      });
      exportFromJSON({
        data: ReportData,
        fileName: fileName,
        exportType: fileType,
      });
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
                    <h5>Sales Report by Date</h5>
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
                    onClick={customViewReport}
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
                <div className="row d-flex justify-content-between">
                  <div className="col-md-6 col-lg-6 p-2">
                    <span className="h6">
                      Total Sales : {report.total[0].total}
                    </span>
                  </div>
                  <div className="col-md-6 col-lg-6 p-2 text-end">
                    <button
                      onClick={exportData.bind(this, "csv")}
                      className="btn btn-sm my-2 btn-success"
                    >
                      Download CSV
                    </button>
                    <button
                      onClick={exportData.bind(this, "xls")}
                      className="btn btn-sm my-2 ms-2 btn-success"
                    >
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
        <div className="col-md-12 p-2">
          <div className="card">
            <div className="card-body">
              <span className="h6">Sales of {title}</span>
              <ResponsiveContainer className="mt-4" width="100%" height={200}>
                <AreaChart
                  width={500}
                  height={200}
                  data={mergedData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="_id" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="total"
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

export default SalesReport;
