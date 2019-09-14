import React, { Component } from 'react';
// import '../node_modules/font-awesome/css/font-awesome.min.css'; 


import { Modal, Form, Button } from "react-bootstrap";
import img1 from '../assets/images/creativedesignerediting34199.jpg';
import img6 from '../assets/images/profilepic.jpg';
// import FontAwesome from  '../node_modules/font-awesome/css/font-awesome.min.css';

export class ProjectDetail extends Component{
    constructor(props){
        super(props);
       
    }
  
    render(){
        return (
            <Modal
       {...this.props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
          <Modal.Title >
          <div className="row">
              <div className="col-lg-2 ">
                <img className='profile-image detail-profpic' src={img6} /> </div>
                <div className="col-lg-7 ">
                  <h4 className='detail-prof'>
                   Mobile Application UI/UX design
                   </h4>
                   <h5 className='detailtitle-text'> By David Rommel</h5>
                   </div>
                   <div className="col-lg-1 ">
                      <Button className='like-button'><i className='fa fa-spinner fa-spin'></i><p className='like-text'>Like </p></Button>
                   </div>
            </div>
          </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
              <img className=' detail-pic' src= {img1} />
        </div>
        <div className='row comment-desc'>
            <div className="row ">
                <div> <i className='fa fa-spinner fa-spin'></i> 283</div>
             <div>
                <p className='detail-message'> Hey Everyone!</p>
                    <p className='detail-message'> I just created an application to share and explore content with friends. All with in one app.what do you think about the UI and UX?
                </p>
              </div>
              <div>
                <p className='detaildate-text'> 20 July 2019</p>
                    
              </div>
         </div>
         <hr/>
         
         <div className='row comm-line'>
               <p>Comments:</p>
           </div >
        <div className="row comm-first ">
           <div className="col-lg-1 first-image">
           <img className='comment-image detail-profpic' src={img6} />
           </div>
           <div className="col-lg-8 first-image ">
           <h4 className='detailname-text '>
              Joan Stoner</h4>
           <h5 className='detailcomment-text'>It is great.</h5>
          </div>
        </div>
            <div className="row comm-second">
            <div className="col-lg-1 second-image ">
             <img className='comment-image detail-profpic' src={img6} />
             </div>
             <div className="col-lg-8 second-image ">
             <h4 className=' detailname-text'>
              Joan Stoner
             </h4>
           <h5 className='detailcomment-text'> cool</h5>
        </div>
        </div>
        <h5 className='comment-add'>Add a new comment</h5>
        <form>
            <input className='input-box'type='text'onChange={this.myChangeHandler}/>
        </form>
        </div>
           </Modal.Body>
            <div className='footer-button'>
                 <Button  className='submit-button' variant="danger" onClick={this.props.onHide}>Submit</Button>
             </div>
         
    </Modal>
    
        )
    }
}