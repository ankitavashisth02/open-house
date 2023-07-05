import Home from "../assets/house3.jpg";
import { useState, useEffect } from "react";

const HouseCards = ({price,areaSize,address})=>{

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
        <h1>{areaSize}</h1>
        <h1>{address.city}</h1>
        <h5>{date.toLocaleDateString()}</h5>
        <h5>{date.toLocaleTimeString()}</h5>
        </div>
    );
}

export default HouseCards;