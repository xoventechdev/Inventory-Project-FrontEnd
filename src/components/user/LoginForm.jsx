import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { IsEmail, IsEmpty, ErrorToast } from "../../utility/FormHelper";
import { LogInRequest } from "../../api_request/UserApiRequest";
import { ToastContainer } from "react-toastify";

const LoginForm = () => {
  let emailRef,
    passwordRef = useRef();

  const onLogin = () => {
    let email = emailRef.value;
    let password = passwordRef.value;
    if (IsEmail(email) || IsEmpty(password)) {
      ErrorToast("Please fill all fields");
    } else if (IsEmail(email)) {
      ErrorToast("Please enter a valid email");
    } else {
      LogInRequest(email, password).then((res) => {
        if (res) {
          window.location.href = "/";
        }
      });
    }
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6 center-screen">
          <div className="card w-90  p-4">
            <div className="card-body">
              <h4>SIGN IN</h4>
              <ToastContainer />
              <br />
              <input
                ref={(input) => (emailRef = input)}
                placeholder="User Email"
                className="form-control animated fadeInUp"
                type="email"
              />
              <br />
              <input
                ref={(input) => (passwordRef = input)}
                placeholder="User Password"
                className="form-control animated fadeInUp"
                type="password"
              />
              <br />
              <button
                onClick={onLogin}
                className="btn w-100 animated fadeInUp float-end btn-primary"
              >
                Next
              </button>
              <hr />
              <div className="float-end mt-3">
                <span>
                  <Link
                    className="text-center ms-3 h6 animated fadeInUp"
                    to="/registration"
                  >
                    Sign Up{" "}
                  </Link>
                  <span className="ms-1">|</span>
                  <Link
                    className="text-center ms-3 h6 animated fadeInUp"
                    to="/recover-password"
                  >
                    Forget Password
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
