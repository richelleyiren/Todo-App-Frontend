import React from 'react'
import '../styling/success.scss'
import '../styling/forver.scss'

export default function Successful() {
    return (
      <div className="outbody">
        <div>
          <div className="image-side">
            <div className="logo"> tickyTasky </div>
          </div>
          <div className="success">
            <h1>Reset Your Password</h1>
            <p style={{ color:"wheat"}}>Please check your email for the reset link</p>
          </div>
        </div>
      </div>
    );
}
