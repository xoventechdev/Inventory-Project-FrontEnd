import React, { useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CurrencyFormat from "react-currency-format";
import {
  ExpenseSummaryRequest,
  PurchaseSummaryRequest,
  ReturnSummaryRequest,
  SalesSummaryRequest,
} from "../../api_request/SummaryApiRequest";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const expenseSummary = useSelector((state) => state.summary.expenseSummary);
  const salesSummary = useSelector((state) => state.summary.salesSummary);
  const returnSummary = useSelector((state) => state.summary.returnSummary);
  const purchaseSummary = useSelector((state) => state.summary.purchaseSummary);
  useEffect(() => {
    (async () => {
      await ExpenseSummaryRequest();
      await SalesSummaryRequest();
      await ReturnSummaryRequest();
      await PurchaseSummaryRequest();
    })();
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 p-2">
          <div className="card">
            <div className="card-body">
              <span className="h5">
                <CurrencyFormat
                  value={expenseSummary.total[0].total}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              </span>
              <p>Total Expense</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 p-2">
          <div className="card">
            <div className="card-body">
              <span className="h5">
                <CurrencyFormat
                  value={salesSummary.total[0].total}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              </span>
              <p>Total Sale</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 p-2">
          <div className="card">
            <div className="card-body">
              <span className="h5">
                <CurrencyFormat
                  value={returnSummary.total[0].total}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              </span>
              <p>Total Purchase</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 p-2">
          <div className="card">
            <div className="card-body">
              <span className="h5">
                <CurrencyFormat
                  value={purchaseSummary.total[0].total}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              </span>
              <p>Total Return</p>
            </div>
          </div>
        </div>
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
                  data={expenseSummary.last30days}
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
        <div className="col-md-6 p-2">
          <div className="card">
            <div className="card-body">
              <span className="h6">Sales Last 30 Days</span>
              <ResponsiveContainer className="mt-4" width="100%" height={200}>
                <AreaChart
                  width={500}
                  height={200}
                  data={salesSummary.last30days}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="_id" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="col-md-6 p-2">
          <div className="card">
            <div className="card-body">
              <span className="h6">Purchase Last 30 Days</span>
              <ResponsiveContainer className="mt-4" width="100%" height={200}>
                <AreaChart
                  width={500}
                  height={200}
                  data={purchaseSummary.last30days}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="_id" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="#00A884"
                    fill="#00A884"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="col-md-6 p-2">
          <div className="card">
            <div className="card-body">
              <span className="h6">Return Last 30 Days</span>
              <ResponsiveContainer className="mt-4" width="100%" height={200}>
                <AreaChart
                  width={500}
                  height={200}
                  data={returnSummary.last30days}
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

export default Dashboard;
