import React, { useState } from "react";
import axios from "axios";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import "../styling/authdesigns.scss";
import Checkmail from "./Checkmail";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passMatch, setPassMatch] = useState("");
  const [checkMail, setCheckMail] = useState("");
  const [emailTaken, setEmailTaken] = useState("");

  let navigate = useNavigate();

  const addUser = async (e) => {
    try {
      e.preventDefault();
      if (email === "") {
        setEmailError("please enter an email");
      } else if (password === "") {
        setPasswordError("please enter a password");
      } else if (password !== confirmPassword) {
        setPassMatch(" Passwords do not match");
      } else if (password === confirmPassword) {
        const signed = await axios.post("users/signup", {
          email,
          password,
        });

        const respond = signed.data;

        if (respond.user) {
          setCheckMail("link sent");
          //          setTimeout(() => {
          //    navigate("/");
          //  }, 4000);
        }
      } else {
        console.log("error");
      }
    } catch (error) {
      if (error.message.includes("409")) {
        setEmailTaken("Email already exists");
        console.log("Already exists");
      }
      console.log(error);
    }
  };

  return checkMail ? (
    <Checkmail />
  ) : (
    <div className="body">
      <div className="image-side">
        <div className="logo"> tickyTasky </div>
      </div>

      <div className="body2">
        <div className=" card">
          <h2> Sign Up</h2>
          <input
            type="text"
            name="email"
            value={email}
            placeholder="Enter an e-mail"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          {!email && <span className="shake">{emailError} </span>}
          {emailTaken && <span className="shake">{emailTaken} </span>}

          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter a password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!password && <span className="shake">{passwordError} </span>}

          <input
            type="password"
            name="conFirmPassword"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {password !== confirmPassword && (
            <span className="shake">{passMatch} </span>
          )}

          <button onClick={addUser}> Sign Up </button>

          <h4>
            Have an account?{" "}
            <NavLink className="loginlink" to="/">
              Login
            </NavLink>
          </h4>
        </div>
      </div>
    </div>
  );
}
