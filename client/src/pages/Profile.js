import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";

import Dropzone from 'react-dropzone';

import Nav from "./Nav";
import img1 from '../assets/images/creativedesignerediting34199.jpg';
import img6 from '../assets/images/profilepic.jpg';

class ProfilePage extends Component {
  render() {
    return (
      <div>
      <Nav/>
      <div className="row">   
                {/* <div className="gif-container"> */}
                <div  className=" col-lg-3 profile-detail "> 
                <Dropzone onDrop={this.onDrop} accept="image/jpg, image/gif">
                    {({getRootProps, getInputProps, isDragActive}) => (
                     <div {...getRootProps()}>
                         <input {...getInputProps()} />
                             <img className='profile-image' src={img6} />
      
                      </div>
                             )}
                </Dropzone>
       
        
                
                    <h5 className='name-text'>David Rommel</h5>
                    <h5 className='title-text'>Designer & Creative Art Director</h5>
                    <h5 className='city-text'>Toronto Canada</h5>
                    <button className='orange-button hire-button'>Hire me</button>
                    <button className='white-button'>Message</button>
                    <hr/>
                    <h6 className ='skill-title'>Skills: </h6>
                    <div className="row "> 
                            <div className="col-lg-3 ">
                                   <button className ='skill-box'>DESIGN</button>
                            </div>
                            <div className="col-lg-3 ">
                                 <button className ='skill-box'>ILLUSTRATION</button>
                            </div>
                            <div className="col-lg-2 ">
                                 <button className ='skill-box skill-UI'>UI</button>
                            </div>
                            <div className="col-lg-2 ">
                                   <button className ='skill-box'>UX</button>
                            </div>
                            <div className=" skill-row row "> 
                                  <div className="col-lg-6 ">
                                        <button className ='skill-box skill-product'>PRODUCT DESIGN</button>
                                  </div>
                                  <div className="col-lg-4 ">
                                          <button className ='skill-box'>MOBILE</button>
                                    </div>
                             </div>
                      </div>
                      <hr/>
                       <h6 className ='about-title'>About</h6>
                       <p className ='about-text'>I am a create designer from Toronto.I enjoy creating solutions for web anad mobile app.
                        Available  for fulltime, freelance or remote work opportunities.</p>
                 </div>
               <div className="col-lg-7 verticalLine "> 
                   <div className="row last-row"> 
                        <div className="col-lg-5 ">
                    
                            <img className='project-image' src= {img1} />
                       </div>

                       <div className="col-lg-5  ">
                    
                            <img  className='project-image' src= {img1} />
                       </div>
                    
                </div>
                 <div className="row"> 
                       <div className="col-lg-5  ">
                    
                           <img className='project-image' src= {img1} />
                      </div>
                       <div className="col-lg-5  ">
                    
                           <img  className='project-image' src= {img1} />
                       </div>
                  
                  </div>
                  <div className="row"> 
                         <div className="col-lg-5 ">
                    
                                <img className='project-image' src= {img1} />
                          </div>
                    
                    </div>
               </div>
            </div>
        </div>
      
    );
  }
}

export default ProfilePage;