
import React, { useState } from "react";
import axios from "axios";
import signup from "../signup.css";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ForgottenPass from "./ForgottenPass";

export default function ResetForgotten() {
    const [newpass, setNewPass] = useState('')
    const [confirmnew, setConfirmNew] = useState('')

        const navigate = useNavigate();
        const { resetToken } = useParams();
     const resetForgot = async () =>{

        try{
            const forgot = await axios.put(`/users/reset-forgotten/${resetToken}`,{
                newpass
            });
            if (forgot.data) {
              console.log("success");

              setTimeout(() => {
                navigate("/");
              }, 4000);
            } else {
            //   setError("password do not match");
              console.log("no data");
            }
        } catch (error) {
             console.log(error);
    }

     }

    return (
      <div>
        <div className=" card">
          <h2>Reset Password</h2>
          <input
            type="password"
            name="password"
            value={newpass}
            placeholder="Enter a new password"
            onChange={(e) => setNewPass(e.target.value)}
          />
          {/* {!password && <span className="shake">{passwordError} </span>} */}

          <input
            type="password"
            name="conFirmPassword"
            value={confirmnew}
            placeholder="Confirm your password"
            onChange={(e) => setConfirmNew(e.target.value)}
          />
          {/* {password !== confirmPassword && (
            // <span className="shake">{passMatch} </span>
          )} */}

          <button onClick={resetForgot}> Reset Password </button>

        </div>
      </div>
    );
}
