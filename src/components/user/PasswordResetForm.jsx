import React, { useRef } from "react";
import { getEmail } from "../../utility/SessionHelper";
import { ErrorToast, IsEmpty, SuccessToast } from "../../utility/FormHelper";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PasswordRecoverRequest } from "../../api_request/UserApiRequest";

const PasswordResetForm = () => {
  const navigate = useNavigate();
  let passwordRef,
    confirmPasswordRef = useRef();
  const ResetPass = () => {
    let password = passwordRef.value;
    let confirmPassword = confirmPasswordRef.value;
    if (IsEmpty(password)) {
      ErrorToast("Please enter password");
    } else if (IsEmpty(confirmPassword)) {
      ErrorToast("Please confirm password");
    } else if (password !== confirmPassword) {
      ErrorToast("Passwords do not match");
    } else {
      PasswordRecoverRequest(password).then((res) => {
        if (res) {
          SuccessToast("Password reset successfully.");
          localStorage.clear();
          navigate("/login");
        }
      });
    }
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6 center-screen">
          <div className="card w-90 p-4">
            <div className="card-body">
              <ToastContainer />
              <h4>SET NEW PASSWORD</h4>
              <br />
              <label>Your email address</label>
              <input
                readOnly={true}
                value={getEmail()}
                placeholder="User Email"
                className="form-control animated fadeInUp"
                type="email"
              />
              <br />
              <label>New Password</label>
              <input
                ref={(input) => (passwordRef = input)}
                placeholder="New Password"
                className="form-control animated fadeInUp"
                type="password"
              />
              <br />
              <label>Confirm Password</label>
              <input
                ref={(input) => (confirmPasswordRef = input)}
                placeholder="Confirm Password"
                className="form-control animated fadeInUp"
                type="password"
              />
              <br />
              <button
                onClick={ResetPass}
                className="btn w-100 animated fadeInUp float-end btn-primary"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetForm;
