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
  const SignUp = async () => {
    // Sending api request to backend 
    try {
        
        const res = await fetch(
          "http://localhost:8081/api/v1/signUp",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({mynumber,password,show,firstName,lastName,companyName,confirmPassword  }),
          }
        );
        const result = await res.json();
        if (res.status === 200) {
          //reset the state on success
          setnumber("");
          setPassword("");
          setShow("");
          setFirstName("");
          setLastName("");
          setCompanyName("");
          setConfirmPassword("");
          //clearing the local storage 
          window.localStorage.clear();
        }
        localStorage.setItem(JSON.stringify(result)) 
        history.push("/add")
    } catch (error) {
        console.log("error", error);
        return false
    }
    //message from backend on popup on UI whether success or error
  };

  // useEffect(() => {
  //   const mynumber = window.localStorage.getItem("mynumber");
  //   const password = window.localStorage.getItem("password");
  //   // const seats = JSON.parse(window.localStorage.getItem("seats"));
  //   const show = window.localStorage.getItem("show");
  //   const firstName = window.localStorage.getItem("firstName");
  //   const lastName = window.localStorage.getItem("lastName");
  //   const companyName = window.localStorage.getItem("companyName");
  //   const confirmPassword = window.localStorage.getItem("confirmPassword");
    
  //   if(mynumber || password || show || firstName || lastName || companyName || confirmPassword){
  //     setnumber("mynumber");
  //         setPassword("password");
  //         setShow("show");
  //         setFirstName("firstName");
  //         setLastName("lastName");
  //         setCompanyName("companyName");
  //         setConfirmPassword("confirmPassword");
  //   }

  // }, []);
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