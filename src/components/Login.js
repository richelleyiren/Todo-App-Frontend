import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate, NavLink } from "react-router-dom";
import "../styling/authdesigns.scss";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const loginUser = async (e) => {
    try {
      e.preventDefault();
      console.log();
      if (email === "") {
        setEmailError("Please enter your email");
      } else if (password === "") {
        setPasswordError("Please enter your password");
      }

      setLoading(true);

      const logged = await axios.post("users/login", {
        email,
        password,
      });
      console.log(logged);
      //  console.log("trying");

      setEmail("");
      setPassword("");

      const respond = logged.data;

      if (respond.user) {
        navigate("/app");

        window.localStorage.setItem("userId", JSON.stringify(respond.user._id));
      }
    } catch (error) {
      if (error.message.includes("401")) {
        setError("Email or password does not exist");
      }
      console.log(error);
    }
  };

  return (
    <div className="body">
      <div className="image-side2">
        <div className="logo"> tickyTasky </div>
      </div>

      <div className="body2">
        <div className=" card">
          <h2> Login</h2>
          <input
            type="text"
            name="email"
            value={email}
            placeholder="Enter your e-mail"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          {!email && <span className="shake">{emailError} </span>}

          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          {!password && <span className="shake">{passwordError} </span>}
          {error && <span className="shake">{error} </span>}

          <button onClick={loginUser}> Login </button>

          <h4>
            <NavLink className="forgot" to="/forgotten-password">
              {" "}
              Forgot password{" "}
            </NavLink>
          </h4>

          <h4>
            Don't have an account?{" "}
            <NavLink className="signlink" to="/signup">
              {" "}
              Signup{" "}
            </NavLink>
          </h4>
        </div>
      </div>
    </div>
  );
}
