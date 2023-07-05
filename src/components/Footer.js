import React from "react";
import './Footer.css';
import FooterImg from "../assets/FooterTop.jpg";
import Insta from "../assets/instagram.png";
import Fb from "../assets/facebook.jpg";



const Footer = ()=>{
    return(
        <React.Fragment>
        <div className="total" >

                <p>Register your<br/>property Free today. </p>
                <img src={FooterImg} alt="logo"/>


            <div className="container">

            
                <p>Get in touch: <img src={Insta} alt="logo"/><img src={Fb} alt="logo"/></p>


                <h3>Popular cities</h3>
                <ul>
                    <li>Edmonton</li>
                    <li>Toronto</li>
                    <li>Calgary</li>
                    <li>Vancouver</li>
                    <li>Surrey</li>
                </ul>
                <hr/>
                <h5 style={{clear:"both",paddingLeft:"30px",color:"#FFFFFF"}}>Copyright@2023 Openhouse All Rights Reserved.</h5>
            </div>


        </div>
        </React.Fragment>
    )
}

export default Footer;