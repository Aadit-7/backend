import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import "../styles/form.scss";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { user, loading, handelLogin } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();

    await handelLogin(username, password);

    // console.log("User logged In");

    navigate("/");
  };

  if (loading) {
    return <main>Loading....</main>;
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handelSubmit}>
          <input
            onInput={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            name="username"
            id="username"
            placeholder="Enter username"
          />
          <input
            onInput={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
          />
          <button className="button primary-button">Login</button>
          <p>
            Don't have an accout <Link to={"/register"}>Create One.</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;
