import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { errorMessages } from "../../constants/errorMessages";
import InputField from "../form-input";

export const Login = (props) => {
  const { userData, setUser, message } = props;
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({ userName: false, password: false });

  useEffect(() => {
    validate();
  }, [userName, password]);

  const validate = () => {
    let formValid = true;
    let errors = {};
    if (!userName.length) {
      formValid = false;
      errors["userName"] = errorMessages.userName;
    }
    if (userName.length) {
      if (!userName.match(/^[a-zA-Z0-9]{3,15}$/)) {
        formValid = false;
        errors["userName"] = errorMessages.userNameInvalid;
      }
    }
    if (!password.length) {
      formValid = false;
      errors["password"] = errorMessages.password;
    }
    setFieldErrors(errors);
    return formValid;
  };

  const userLogin = () => {
    setTouched({ userName: true, password: true });
    if (validate()) {
      const userList = JSON.parse(localStorage.getItem("userList"));
      let results = userList?.filter(
        (entry) => entry.username === userName && entry.password === password
      );
      if (results?.length) {
        setUser({ userName: userName, isLoggedIn: true });
        history.push("/dashboard");
      } else {
        setError(errorMessages.invalidUser);
      }
    }
  };

  return (
    <>
      <div className="container mt-4 px-4 px-sm-0 ">
        <div className="row mt-5 ">
          <div className="col-sm-5 col-offset-3 mx-auto shadow p-5 bg-white">
            {userData.isLoggedIn && (
              <div className="alert alert-primary" role="alert">
                Hello {userData.userName} <br />
                You are already logged in..
                <br />
                <button
                  className="btn btn-success mt-1 btn-block"
                  onClick={() => history.push("/dashboard")}
                >
                  Goto Dashboard
                </button>
                <div>Login as another user below..</div>
              </div>
            )}
            {message.length > 0 && (
              <div className="alert alert-success" role="alert">
                {message}
              </div>
            )}
            <h4 className="text-center mb-4">Login</h4>
            <InputField
              type="text"
              label="Username"
              placeholder="enter your username"
              name="userName"
              value={userName}
              required={true}
              touched={touched}
              setTouched={setTouched}
              onChange={setUserName}
              errors={fieldErrors?.userName}
            />
            <InputField
              type="password"
              label="Password"
              placeholder="Enter your password"
              name="password"
              value={password}
              required={true}
              onChange={setPassword}
              setTouched={setTouched}
              touched={touched}
              errors={fieldErrors?.password}
            />
            {error.length > 1 && (
              <div className="text-danger mb-3">{error}</div>
            )}
            <div className="text-center">
              <div>
                <button
                  onClick={userLogin}
                  className="btn btn-primary btn-block btn-lg"
                >
                  Login
                </button>
              </div>
              <div>
                <button
                  onClick={() => history.push("/register")}
                  className="btn btn-success mt-3 btn-block btn-lg"
                >
                  Register new user
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
