import React from "react";
import { Link } from "react-router";
import InputContainer from "../components/InputContainer";

const Login = () => {
  return (
    <main className="login-page">
      <div className="form-container">
        <form>
          <h1>Login</h1>
          <InputContainer
            label={"Username"}
            placeholder={"Enter your username"}
          />
          <InputContainer
            label={"Password"}
            placeholder={"Enter your password"}
          />
          <button className="button">Login</button>
        </form>
        <p>
          Don't have an account ? <Link to="/register">Register</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
