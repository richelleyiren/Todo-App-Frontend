import signup from "../signup.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate, NavLink } from "react-router-dom";



export default function Login() {
   const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const loginUser = async (e) =>{
         try{
           e.preventDefault()
           if(email === ""){
              setEmailError("Please enter your email")
           } else if( password === ""){
              setPasswordError("Please enter your password")
           }
           setLoading(true)
           const logged = await axios.post("/users/login", {
        email,
       password,
      },
           )
            setEmail("");
            setPassword("");
            

            const respond = logged.data;

            if (respond.user) {
              navigate("/app");
            }

         }catch(error){
           console.log(error)
           //write proper code later
         }
  }

    return (
      <div>
        <div className=" card">
          <h2> Login</h2>
          <input
            type="text"
            name="email"
            value={email}
            placeholder="Enter your e-mail"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          {!email && <span className="shake" >{emailError} </span>}

          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          {!password && <span className="shake" >{passwordError} </span>}

          <button onClick={loginUser}> Login </button>
          <h4>
            Don't have an account? <NavLink to="/signup"> Signup </NavLink>
          </h4>
        </div>
      </div>
    );
}
