import React from "react";
import './Navbar.css';
import logo from '../assets/logo.jpg';
import { Link } from "react-router-dom";

const Image = ()=>{
    return(
        <div className="image">
        <img src={logo} alt="no logo" />
        <p>Open House</p>
        </div>
    );
}


const Navbar = ()=>{
    return(
        <div className="header">
        <Image/>
        
        
        <div className="items">
        <ul>
        <Link to="/" style={{textDecoration: 'none'}}><li>Home</li></Link>
        <Link to="/signin" style={{textDecoration: 'none'}}><li>Sign In</li></Link>
        <Link to="/signup" style={{textDecoration: 'none'}}><li>SignUp</li></Link>
        <Link to="/listings" style={{textDecoration: 'none'}}><li><button className="add-listing">Add Listing</button></li></Link>
        </ul>
        </div>

        </div>
    )
};

export default Navbar;