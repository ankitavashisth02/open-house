import React, { useState } from "react";
import "./SignIn.css";
import Home from "../assets/house.jpg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const backgroundStyle = {
    backgroundImage : `url(${Home})`,
    backgroundSize : "cover",
}

const signin = ()=>{
    return(
        alert("Signed in successfully")
    );
}

const SignIn = ()=>{

    const[mynumber , setnumber] = useState("");
    const [show, setShow] = useState("");
    const [password , setPassword] = useState("");
    const signIn = async () => {
    try{
    console.warn(mynumber,password)
    let item ={mynumber,password};
    let result =await  fetch("http://localhost:8081/api/v1/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json"
        },
        body:JSON.stringify(item)
    });
    result = await result.json();
    localStorage.setItem("user-info",JSON.stringify(result))
    history.push("/add")
}
catch (error) {
    console.log("error", error);
    return false
}
}

    return(
        <React.Fragment>
        <div className="main" style={backgroundStyle}>
        <div className="login-box">
        <h4>Welcome to Open House !</h4>
        <h3 style={{color:"#008080"}}>Sign in to your account</h3>

        <br/>

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

            </div>

            <br/>

        <label>Password</label>
            <div className="password">
                <input
                type="password"
                className="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button onClick={signin}>Sign In</button>
    </div>
    </div>
        </React.Fragment>
    );
}

export default SignIn ; 
