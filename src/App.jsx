import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/dashboard/DashboardPage";
import CustomerListPage from "./pages/customer/CustomerListPage";
import CustomerFormPage from "./pages/customer/CustomerFormPage";
import SupplierFormPage from "./pages/supplier/SupplierFormPage";
import SupplierListPage from "./pages/supplier/SupplierListPage";
import ExpenseFormPage from "./pages/expense/ExpenseFormPage";
import ExpenseListPage from "./pages/expense/ExpenseListPage";
import ExpenseTypeListPage from "./pages/expenseType/ExpenseTypeListPage";
import ExpenseTypeFormPage from "./pages/expenseType/ExpenseTypeFormPage";
import ProductFormPage from "./pages/product/ProductFormPage";
import ProductListPage from "./pages/product/ProductListPage";
import BrandFormPage from "./pages/brand/BrandFormPage";
import BrandListPage from "./pages/brand/BrandListPage";
import CategoryListPage from "./pages/category/CategoryListPage";
import CategoryFormPage from "./pages/category/CategoryFormPage";
import PurchaseFormPage from "./pages/purchase/PurchaseFormPage";
import PurchaseListPage from "./pages/purchase/PurchaseListPage";
import SalesFormPage from "./pages/sales/SalesFormPage";
import SalesListPage from "./pages/sales/SalesListPage";
import ReturnListPage from "./pages/return/ReturnListPage";
import ReturnFormPage from "./pages/return/ReturnFormPage";
import ExpenseReportPage from "./pages/report/ExpenseReportPage";
import PurchaseReportPage from "./pages/report/PurchaseReportPage";
import ReturnReportPage from "./pages/report/ReturnReportPage";
import SalesReportPage from "./pages/report/SalesReportPage";
import ProfilePage from "./pages/user/ProfilePage";
import LoginPage from "./pages/user/LoginPage";
import CreateAccountPage from "./pages/user/CreateAccountPage";
import ForgetPasswordPage from "./pages/user/ForgetPasswordPage";
import VerifyPasswordRequestPage from "./pages/user/VerifyPasswordRequestPage";
import PasswordResetPage from "./pages/user/PasswordResetPage";
import NotFoundPage from "./pages/notFound/NotFoundPage";
import { useSelector } from "react-redux";
import { getToken } from "./utility/SessionHelper";
import FullscreenLoader from "./components/masterLayout/FullscreenLoader";

function App() {
  const recoverMode = useSelector((state) => state.settings.recoverMode);

  if (getToken()) {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<DashboardPage />} />
            <Route exact path="/customer" element={<CustomerListPage />} />
            <Route exact path="/customer/new" element={<CustomerFormPage />} />
            <Route
              exact
              path="/customer/edit/:id"
              element={<CustomerFormPage />}
            />
            <Route exact path="/supplier" element={<SupplierListPage />} />
            <Route exact path="/supplier/new" element={<SupplierFormPage />} />
            <Route
              exact
              path="/supplier/edit/:id"
              element={<SupplierFormPage />}
            />
            <Route exact path="/expense" element={<ExpenseListPage />} />
            <Route exact path="/expense/new" element={<ExpenseFormPage />} />
            <Route
              exact
              path="/expense/edit/:id"
              element={<ExpenseFormPage />}
            />
            <Route
              exact
              path="/expenseType"
              element={<ExpenseTypeListPage />}
            />
            <Route
              exact
              path="/expenseType/new"
              element={<ExpenseTypeFormPage />}
            />
            <Route
              exact
              path="/expenseType/edit/:id"
              element={<ExpenseTypeFormPage />}
            />
            <Route exact path="/product" element={<ProductListPage />} />
            <Route exact path="/product/new" element={<ProductFormPage />} />
            <Route
              exact
              path="/product/edit/:id"
              element={<ProductFormPage />}
            />
            <Route exact path="/brand" element={<BrandListPage />} />
            <Route exact path="/brand/new" element={<BrandFormPage />} />
            <Route exact path="/brand/edit/:id" element={<BrandFormPage />} />
            <Route exact path="/category" element={<CategoryListPage />} />
            <Route exact path="/category/new" element={<CategoryFormPage />} />
            <Route
              exact
              path="/category/edit/:id"
              element={<CategoryFormPage />}
            />
            <Route exact path="/purchase" element={<PurchaseListPage />} />
            <Route exact path="/purchase/new" element={<PurchaseFormPage />} />
            <Route
              exact
              path="/purchase/edit/:id"
              element={<PurchaseFormPage />}
            />
            <Route exact path="/sale" element={<SalesListPage />} />
            <Route exact path="/sale/new" element={<SalesFormPage />} />
            <Route exact path="/sale/edit/:id" element={<SalesFormPage />} />
            <Route exact path="/return" element={<ReturnListPage />} />
            <Route exact path="/return/new" element={<ReturnFormPage />} />
            <Route exact path="/return/edit/:id" element={<ReturnFormPage />} />
            <Route exact path="/report/sale" element={<SalesReportPage />} />
            <Route exact path="/report/return" element={<ReturnReportPage />} />
            <Route
              exact
              path="/report/purchase"
              element={<PurchaseReportPage />}
            />
            <Route
              exact
              path="/report/expense"
              element={<ExpenseReportPage />}
            />
            <Route exact path="/profile" element={<ProfilePage />} />

            <Route exact path="/login" element={<Navigate to={"/"} />} />
            <Route exact path="/registration" element={<Navigate to={"/"} />} />
            <Route
              exact
              path="/recover-password"
              element={<Navigate to={"/"} />}
            />
            <Route exact path="/verify-otp" element={<Navigate to={"/"} />} />
            <Route
              exact
              path="/reset-password"
              element={<Navigate to={"/"} />}
            />

            <Route exact path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
        <FullscreenLoader />
      </>
    );
  } else {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/registration" element={<CreateAccountPage />} />
            <Route
              exact
              path="/recover-password"
              element={<ForgetPasswordPage />}
            />

            <Route
              path="/verify-otp"
              element={
                recoverMode ? (
                  <VerifyPasswordRequestPage />
                ) : (
                  <Navigate to={"/login"} />
                )
              }
            />
            <Route
              path="/reset-password"
              element={
                recoverMode ? <PasswordResetPage /> : <Navigate to={"/login"} />
              }
            />

            <Route exact path="*" element={<Navigate to={"/login"} />} />
          </Routes>
        </BrowserRouter>
        <FullscreenLoader />
      </>
    );
  }
}

export default App;
