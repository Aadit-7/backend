import React from "react";
import { Link } from "react-router";
import "../style/register.scss";
import InputContainer from "../components/InputContainer";

const Register = () => {
  return (
    <main className="login-page">
      <div className="form-container">
        <form>
          <h1>Register</h1>
          <InputContainer
            label={"Username"}
            placeholder={"Enter your username"}
          />
          <InputContainer label={"Email"} placeholder={"Enter your email"} />
          <InputContainer
            label={"Password"}
            placeholder={"Enter your password"}
          />

          <button className="button">Register</button>
        </form>
        <p>
          Already have an account ? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
