import React, { useState } from "react";
import './SignUp.css';
import Home from "../assets/house.jpg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const SignUp = () => {
  var [mynumber, setnumber] = useState("");
  const [passw, setPassw] = useState("");
  const [show, setShow] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Sent OTP
  const signin = () => {
    mynumber = "+" + mynumber;
    if (mynumber === "" || mynumber.length < 10) {
      alert("Please enter a valid phone number");
      return;
    }
  };

  return (
    <div style={{ backgroundImage: `url(${Home})` }}>
    <div className="login-box">
      
        <h4>Welcome to Open House !</h4>
        <h3>Sign up</h3>
        
        <input
          type="text"
          className="first-name"
          placeholder="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          className="last-name"
          placeholder="lastName"
          value={lastName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <div className="company-name">
        <input
          type="text"
          className="company-name"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setLastName(e.target.value)}
        />
        </div>


        <div id="phone-input" style={{ display: !show ? "block" : "none" }}>
          <PhoneInput
            country={"ca"}
            onlyCountries={["ca"]}
            disableAreaCodes
            disableDropdown
            countryCodeEditable={false}
            value={mynumber}
            onChange={(e) => {
              setnumber(e);
            }}
            placeholder="Enter phone number"
          />


          <br></br>


          <div className="password">
            <input
              type="password"
              className="password"
              placeholder="Enter Password"
              value={passw}
              onChange={(e) => setPassw(e.target.value)}
            />

            <input
              type="password"
              className="confirm-password"
              placeholder="confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>


          <button id="send-otp" onClick={signin}>
            Sign Up
          </button>
        </div>
      
    </div>
    </div>
  );
};



export default SignUp;