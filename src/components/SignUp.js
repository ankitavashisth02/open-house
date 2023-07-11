import React, { useState } from "react";
import './SignUp.css';
import Home from "../assets/house.jpg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";


const backgroundStyle = {
  backgroundImage : `url(${Home})`,
  backgroundSize : "cover",
}

const SignUp = () => {
  var [mynumber, setnumber] = useState("");
  const [password, setPassword] = useState("");
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
    if(password != confirmPassword){
      alert("passwords do not match");
    }
    // return(
    //   console.log("happy happy")
    // );
  }

  return (
    <div className="main-box" style={backgroundStyle}>
    <div className="login-box">
      
        <h4>Welcome to Open House !</h4>
        <h3 style={{color:"#008080"}}>Sign up</h3>
        
        <label>Name</label>
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
          onChange={(e) => setLastName(e.target.value)}
        />

        <label>Company Name</label>
        <div className="company-name">
        <input
          type="text"
          className="company-name"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        </div>


        <label>Phone Number</label>
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


          <label>Password</label>
          <div className="password">
            <input
              type="password"
              className="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label>Confirm Password</label>
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