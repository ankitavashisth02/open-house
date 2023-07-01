import React from "react";
import SearchBar from "./SearchBar";
import Footer from "./Footer";

const Body = ()=>{
    return(
        <React.Fragment>
        <SearchBar />
        <div>
        <h1>Body</h1>
        </div>
        <Footer />
        </React.Fragment>
    )
}

export default Body;