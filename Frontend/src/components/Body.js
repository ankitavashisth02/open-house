import React from "react";
import SearchBar from "./SearchBar";
import Footer from "./Footer";
import './SearchBar.css';
import {cards} from "../constants";
import HouseCards from "./HouseCard";
import footerImg from "../assets/Footer1.jpg";


const Body = ()=>{
    return(
        <React.Fragment>
        <SearchBar />
        <div className="main-body">
        <p style={{fontFamily:"Poppins", paddingLeft:"20px",fontSize:"18px",fontStyle:"normal"}}>DISCOVER</p>
        <h1 style={{fontFamily:"Poppins", paddingLeft:"20px"}}>Featured listings near you</h1>
        <hr style={{border:"2px solid #008080",width:"150px",margin:"20px",float:"left"}}/>


        <div className="house-list">
        {
            cards.data.map((card)=>{
                return (<HouseCards {...card}/>);
            })
        }
        </div>



        <br/><br/>

        Learn More..<br/>
        <p>Features You're Looking For</p>

        <div className="upper">
        
        <div className="container1">
        <img src={footerImg} alt="no image aval." style={{paddingTop:"25px"}} />
        </div>

        </div>

        <Footer />
        </div>
        
        </React.Fragment>
    )
}

export default Body;