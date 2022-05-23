import React, { useState, useEffect } from "react";
import axios from "axios";
import Successful from "../components/Successful";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import '../styling/forver.scss'


export default function ForgottenPass() {
        const [email, setEmail] = useState("");
        const [emailError, setEmailError] = useState("");
        const [error, setError] = useState("");
        const [loading, setLoading] = useState(false);
        const [success, setSuccess] = useState("");

        const navigate = useNavigate();

        const forgottenPassword = async (e) => {
          try {
            e.preventDefault();
            if (email === "") {
              return setEmailError("Please enter email");
            }
            setLoading(true);
            const checkEmail = await axios.put(
              `/users/forgotten-password/${email}`
            );

            console.log(checkEmail);
            if (checkEmail.data) {
              setSuccess("Link has been sent to your mail");
            }
            setEmail("");

            // setTimeout(() => {
            //   navigate("/");
            // }, 4000)
            setLoading(false);
          } catch (error) {
            if (error.message.includes("401")) {
              setError("Email or password does not exist");
            }
            console.log(error);
          }
        };
    return success ? (
      <Successful />
    ) : (
      <div className="outbody">
        <div className="image-side">
          <div className="logo"> tickyTasky </div>
        </div>
        <div className="forgotten-card">
          <h2> Forgotten Password</h2>
          <input
            type="text"
            name="email"
            value={email}
            placeholder="Enter your e-mail address"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          {!email && <span className="shake">{error} </span>}

          <button onClick={forgottenPassword}> Reset Password </button>
        </div>
      </div>
    );
    
}
