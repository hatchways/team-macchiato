import React, { Component } from 'react';
import '../App.css';

function Nav(){
    return(
     <nav>
       <h5 className='top-text'> CREATIVE  HUB</h5>
       <button className='black-button sign-text'>Sign Up</button>
       <button className='orange-button login-button'>Login</button>
       <div className='container' >
             <div className='menu'></div>
             <div className='menu'></div>
             <div className='menu'></div>
       </div>
     </nav>
    );
}

export default Nav;