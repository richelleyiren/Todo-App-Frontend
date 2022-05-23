import React from 'react'
import "../styling/header.scss";
import { Navigate, NavLink, useNavigate } from "react-router-dom";




export default function Heading() {
    return (
      <div className="mainy">
        <div className=" header">
          <div className="logo">
            <h3> youDO</h3>
          </div>
          <div className=" navs">
            <NavLink to="/" className=" slink">
             Login
            </NavLink>
            <NavLink to="/signup" className=" link">
              Login{" "}
            </NavLink>
          </div>
        </div>
      </div>
    );
}
