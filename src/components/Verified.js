import React from 'react'
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../styling/forver.scss'

export default function Verified() {
    const navigate = useNavigate();
    const { confirmToken } = useParams();

   
           const verify =  axios.get(
             `/users/verified-email/${confirmToken}`
           );
           if (verify) {
             console.log("success");

             setTimeout(() => {
               navigate("/");
             }, 4000);
           } else {
             //   setError("password do not match");
             console.log("no data");
           }
      
    

     


    return (
      <div className="outbody">
        <div className="image-side">
          <div className="logo"> tickyTasky </div>
        </div>
        <div className="verified-card">
          <h2>Email Verified! You will be redirected to the Login.</h2>
        </div>
      </div>
    );
}
