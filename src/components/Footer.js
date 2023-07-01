import React from "react";
import './Footer.css';
import logo from "../assets/house.jpg";

// footer is divided in three parts- upper , middle, lower

const Upper = () =>{
    return(
        <React.Fragment>
        <div className="upper">
        <h4>
        Learn More..
        <br/>
        Features You're Looking For
        </h4>

        <div className="container1">
        picture to be added.
        </div>

        </div>
        </React.Fragment>
    );
}

const Middle = () =>{
    return(
        <React.Fragment>
        <div className="container2">
        <img src={logo} alt="logo"/>
        <h4>REGISTER YOUR<br/>FREE PROPERTY<br/>HERE..</h4>
        </div>
        </React.Fragment>
    );
}

const Lower = () =>{
    return(
        <React.Fragment>
        <div className="container3">
        <h5>Get In Touch</h5>
        </div>
        </React.Fragment>
    );
}


// to integrate the footer part

const Footer = ()=>{
    return(
        <React.Fragment>
        
        <div className="total">
        <Upper/>
        <Middle/>
        <Lower/>
        </div>
        
        </React.Fragment>
    )
}

export default Footer;