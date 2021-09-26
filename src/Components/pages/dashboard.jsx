import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { useHistory } from "react-router-dom";
import { messages } from "../../constants/messages";

const Dashboard = (props) => {
  const { userData, setUser, setMessage } = props;
  const [redirect, setRedirect] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (!userData.isLoggedIn) {
      const timer = setTimeout(() => setRedirect(true), 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [userData]);

  const Logout = () => {
    setUser({ userName: "", isLoggedIn: false });
    setMessage(messages.loggedOut);
    history.push("/");
  };

  const showUsers = () => {
    const userList = JSON.parse(localStorage.getItem("userList"));
    return (
      <table className="table table-hover  table-striped table-bordered ml-4 ">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user, index) => (
            <tr key={index}>
              <td>{user?.fullName}</td>
              <td>{user?.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  if (redirect) {
    return <Redirect to="/login" />;
  }
  if (!userData.isLoggedIn) {
    return (
      <div className="container mt-5 px-4 px-sm-0 ">
        <div className="row mt-5 ">
          <div className="col-sm-5 col-offset-3 mx-auto shadow px-5 py-2 bg-white">
            <h4 className="text-center mb-4">You are not logged in</h4>
            <br />

            <h5 className="text-center mb-4">
              You will be redirected to login page in 5 seconds
            </h5>
            <div></div>
          </div>
        </div>
      </div>
    );
  } else
    return (
      <div className="container mt-5 px-4 px-sm-0 ">
        <div className="row mt-5 ">
          <div className="col-sm-5 col-offset-3 mx-auto shadow px-5 py-2 bg-white">
            <div className="row">
              <div className="col">
                <h4 className="text-center mb-4">Dashboard</h4>
              </div>
              <div className="col">
                <button
                  type="button"
                  className="btn btn-info float-end"
                  onClick={Logout}
                >
                  log out
                </button>
              </div>
            </div>

            <div>
              <h5 className="text-center my-4">Welcome {userData.userName}</h5>
              {userData.userName !== "admin" && (
                <h6 className="text-center pt-3">
                  login as admin to see the list of users
                </h6>
              )}
              {userData.userName === "admin" && showUsers()}
            </div>
          </div>
        </div>
      </div>
    );
};
export default Dashboard;
