import React from 'react';
import './SearchBar.css';
import house from '../assets/house.jpg';


const backgroundStyle = {
   width :"100%" ,
   height: "600px",
   backgroundImage : `url(${house})`,
   backgroundSize : "cover",
};

const Search = () =>{
    return(
        <div className='search-bar'> 
        <input className='text-bar' type="text" placeholder='Search by Location' />
        <button className='search-btn'>Search</button>
        </div>
    );
}


const SearchBar = ()=>{
    return(
        <React.Fragment>
        <div style= {backgroundStyle} >

        <h1 className='one'>Let's find you a<i> place of dream.</i> </h1>
        <p className='two'>A BASE FOR GOOD LIFE.</p>

        <Search />
        
        </div>
        </React.Fragment>
    );
}

export default SearchBar;