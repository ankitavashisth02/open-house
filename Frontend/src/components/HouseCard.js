import Home from "../assets/house3.jpg";
import { useState, useEffect } from "react";

const HouseCards = ({price,address})=>{

    const [date , setDate] = useState(new Date());

    useEffect(()=>{
        setInterval(() => {
            setDate( new Date()) ;
            },
            1000); 
    });


    return(
        <div className="house-cards">
        <img className="card-img" src={Home}/>
        <h1>{price}</h1>
        <h3 style={{color:"#8A8A8A"}}>{address.city},{address.postalCode}</h3>
        <h5 style={{float:"left",color:"#8A8A8A"}}>{date.toLocaleDateString()}</h5>
        <h5 style={{float:"right",color:"#8A8A8A"}}>{date.toLocaleTimeString()}</h5>
        </div>
    );
}

export default HouseCards;