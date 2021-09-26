import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { errorMessages } from "../../constants/errorMessages";
import InputField from "../form-input";
import { messages } from "../../constants/messages";

const Register = (props) => {
  const { setMessage } = props;
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const [touched, setTouched] = useState({
    fullName: false,
    userName: false,
    password: false,
  });
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    validate();
  }, [fullName, userName, password]);

  const validate = () => {
    let formValid = true;
    let errors = {};
    if (!fullName.length) {
      formValid = false;
      errors["fullName"] = errorMessages.fullName;
    }
    if (fullName.length) {
      if (!fullName.match(/^[a-zA-Z ]{3,15}$/)) {
        formValid = false;
        errors["fullName"] = errorMessages.nameInvalid;
      }
    }
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

  const registerUser = () => {
    setTouched({ fullName: true, userName: true, password: true });
    if (validate()) {
      const userList = JSON.parse(localStorage.getItem("userList"));
      let results = userList?.filter((entry) => entry.username === userName);
      if (!results.length) {
        userList.push({
          fullName: fullName,
          username: userName,
          password: password,
        });
        localStorage.setItem("userList", JSON.stringify(userList));
        setMessage(messages.userAdded);
        history.push("/login");
      } else {
        setError(errorMessages.alreadyExists);
      }
    }
  };
  return (
    <>
      <div className="container mt-4 px-4 px-sm-0">
        <div className="row mt-5 ">
          <div className="col-sm-5 col-offset-3 mx-auto shadow p-5  bg-white">
            <h4 className="text-center mb-4">Register</h4>
            <InputField
              type="text"
              label="Name"
              placeholder="Enter your name..."
              name="fullName"
              value={fullName}
              onChange={setFullName}
              required={true}
              touched={touched}
              setTouched={setTouched}
              errors={fieldErrors?.fullName}
            />
            <InputField
              type="text"
              label="Username"
              placeholder="enter username..."
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
              placeholder="Enter your password..."
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
                  onClick={registerUser}
                  className="btn btn-primary btn-block btn-lg"
                >
                  Register
                </button>
              </div>
              <div>
                <h6 className="text-success mt-3">
                  Already Registered? Login below
                </h6>

                <button
                  onClick={() => history.push("/")}
                  className="btn btn-success btn-block btn-lg"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
