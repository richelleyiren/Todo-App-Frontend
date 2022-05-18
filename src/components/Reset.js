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
            }else if( newpass === ""){
                setNewErr("Please enter your new password");
            }else if( newpass !== confirmpass){
                setMatchErr(" Passwords do not match");
            }else if( newpass === oldpass){
                setSameErr("New password cannot be the same as the old one");
            }
            
          
                const sett = await axios.post('users/reset',{
                    password:oldpass,
                    newPassword:newpass
                    

                })
                console.log("work");
                console.log(sett)
                

              if (sett.data) {
                console.log("Password changed successfully");

                //setting timeout
                
                  navigate("/");
                
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

            <input
              type="password"
              placeholder=" Enter old password"
              value={oldpass}
              onChange={(e) => setOldPass(e.target.value)}
            ></input>
            {!oldpass && <span className="shake">{oldErr} </span>}

            <input
              type="password"
              placeholder="Enter new password"
              value={newpass}
              onChange={(e) => setNewPass(e.target.value)}
            ></input>
            {!newpass && <span className="shake">{newErr} </span>}

            <input
              type="password"
              placeholder=" Confirm new password"
              value={confirmpass}
              onChange={(e) => setConfirmPass(e.target.value)}
            ></input>
             

            <button onClick={resetPass}> Reset Password </button>
          </div>
        </div>
      </div>
    );
}
