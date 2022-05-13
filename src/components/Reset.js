import React, { useState } from "react";
import axios from "axios";
import './reset.css'
import { Navigate, NavLink, useNavigate } from "react-router-dom";

export default function Reset() {
    const [oldpass, setOldPass] = useState('')
    const [newpass, setNewPass] = useState('')
    const [confirmpass,setConfirmPass] = useState('')
    const [oldErr,setOldErr] = useState('')
    const [newErr, setNewErr] = useState("");
    const [matchErr, setMatchErr] = useState("");
    const [sameErr, setSameErr] = useState("");
    
    let navigate = useNavigate()

    const resetPass = async (e) =>{
        try{
            e.preventDefault()
            if(oldpass === ""){
                setOldErr('Please enter your old password')
            }else if( newpass ===""){
                setNewErr("Please enter your new password");
            }else if( newpass !== confirmpass){
                setMatchErr(" Passwords do not match");
            }else if( newpass === oldpass){
                setSameErr("New password cannot be the same as the old one");
            }else if (newpass === confirmpass){
                const sett = await axios.post('users/reset',{
                    password:oldpass,
                    newpass

                }
                )
                  const respond = sett.data;

                  if (respond.user) {
                    navigate("/login");
                  }
            }else{
                console.log('error')
            }
        }catch(error){
            console.log(error)
        }

    }
    return (
      <div className="modal">
        <div>
          <div className="main">
            <h2> Reset Password</h2>
            
            <input placeholder=" Enter old password"></input>
            {!oldpass && <span className="shake">{oldErr} </span>}
            
            <input placeholder="Enter new password"></input>
            {!newpass && <span className="shake">{newErr} </span>}
            <input placeholder=" Confirm new password"></input>
            {!confirmpass && <span className="shake">{matchErr} </span>}

            <button onClick={resetPass}> Reset Password </button>
          </div>
        </div>
      </div>
    );
}
