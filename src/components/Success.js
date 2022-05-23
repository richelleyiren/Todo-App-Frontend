import React from 'react'
import '../styling/forver.scss'

export default function Success() {
    return (
      <div className="outbody">
        <div>
          <div className="image-side">
            <div className="logo"> tickyTasky </div>
          </div>
          <div className="success">
            <h2>Password successfully changed</h2>
            <p>Please login with new password</p>
          </div>
        </div>
      </div>
    );
}

