import React, { useState, useEffect } from "react";
import { Login } from "./Components/pages/login";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "./Components/pages/register";
import Dashboard from "./Components/pages/dashboard";

function App() {
  const [user, setUser] = useState({ userName: "", isLoggedIn: false });
  const [message, setMessage] = useState("");

  useEffect(() => {
    let userList = JSON.parse(localStorage.getItem("userList"));
    let user = JSON.parse(localStorage.getItem("userStatus"));
    if (user) {
      setUser(user);
    }
    if (!userList) {
      localStorage.setItem(
        "userList",
        JSON.stringify([
          { fullName: "admin", username: "admin", password: "admin" },
        ])
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userStatus", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    const timer = setTimeout(() => setMessage(""), 5000);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div style={{ backgroundColor: "#F7F7F9" }}>
      <BrowserRouter>
        <Switch>
          <Route path="/register">
            <Register
              userData={user}
              setUser={setUser}
              setMessage={setMessage}
            />
          </Route>
          <Route path="/dashboard">
            <Dashboard
              userData={user}
              setUser={setUser}
              setMessage={setMessage}
            />
          </Route>
          <Route path="/">
            <Login userData={user} setUser={setUser} message={message} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
