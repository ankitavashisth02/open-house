import React from 'react';
import './SearchBar.css';
import house from '../assets/house.jpg';


const backgroundStyle = {
   
}

const Search = () =>{
    return(
        <div className='search-bar'> 
        <input className='text-bar' type="text" placeholder='Search by Location' />
        <button className='search-btn'>Search</button>
        </div>
    );
}

const Image = ()=>{
    return(
        <React.Fragment>
        <p className='one'>Let's find you a place of dream.</p>
        <p className='two'>a base for good life.</p>
        </React.Fragment>
    );
}

const SearchBar = ()=>{
    return(
        <React.Fragment>
        <div style={{backgroundImage:`url(${house})`}}>
        <h2></h2>
        </div>
        </React.Fragment>
    );
}

export default SearchBar;