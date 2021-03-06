import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../actions/action.auth";

const Signup = ({ signup, isAuthenticated }) => {
  const [accountCreated, setAccountCreated] = useState(false);
  const [signupData, SetSignupData] = useState({
    name: "",
    email: "", 
    password: "",
  });

  const { name, email, password } = signupData;

  const onChange = (e) =>
    SetSignupData({ ...signupData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    signup(name, email, password);
    setAccountCreated(true);
  };



  if (accountCreated) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <h1>Sign Up to your create an account</h1>
      <form onSubmit={(e) => onSubmit(e)}>
<input type="text"
placeholder="Your name here" name="name" autoComplete="on" onChange={(e) => onChange(e)}
/>
        <br />
<input type="email"
placeholder="Your email here" name="email" autoComplete="on" onChange={(e)=>onChange(e)}
/>
        <br />
<input type="password"
placeholder="Your password here" name="password" autoComplete="on" onChange={(e) => onChange(e)}
/>
        <br />
        <button className="button" type="submit">Create New Account</button>
      </form>
      <h1>
        Already have an account?<Link to="/login">Login</Link>
      </h1>
    </div>
  );
};


export default connect(null, { signup })(Signup);
