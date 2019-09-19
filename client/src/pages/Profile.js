import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import { Modal, Form, Button } from "react-bootstrap";
import { ProjectDetail } from './ProjectDetail';
import Dropzone from 'react-dropzone';

import img1 from '../assets/images/creativedesignerediting34199.jpg';
import img6 from '../assets/images/profilepic.jpg';

import { userService } from '../services/userServices';

import Profile from '../components/ProfileSummaryComponent'

class ProfilePage extends Component {

   constructor(props) {
      super(props);
      this.state = {
         addModalshow: false,
         loading: true,
         openEdit: false,
      }
      this.updateUserSummary = this.updateUserSummary.bind(this)
   }

   componentWillMount() {
      this.updateUserSummary()
   }
   
   updateUserSummary = () => {
      let pathname = this.props.location.pathname
      let otherUserId = pathname.split('/')[2]
      this.setState({ otherUserId: otherUserId })
      userService.getById(otherUserId)
         .then(user => {
            console.log("Fetch User Success")
            console.log(user)
            this.setState({
               user: user,
               loading: false
            })
         })
         .catch(err => {
            console.log("User Fetch Failure")
            console.log(err)
         })
   }
   updateUserProject = () => {
      // let pathname = this.props.location.pathname
      let otherUserId = this.state.otherUserId
      userService.getById(otherUserId)
         .then(user => {
            console.log(user)
            this.setState({
               user,
               loading: false
            })
         })
   }

   render() {
      let user = this.state.user;
      let updateUserSummary = this.updateUserSummary;
      let addModalclose = () => this.setState({ addModalShow: false });
      let currentUser = this.props.currentUserInfo
      let loading = this.state.loading
      if (loading) return ''
      return (
         <div>
            <div className="row">
               {/* <div className="gif-container"> */}
               <Profile 
                  user={user}
                  sameUser={currentUser.id === user.id}
                  updateUserSummary={updateUserSummary} />
               <div className="col-lg-7 verticalLine ">
                  <div className="row last-row">
                     <div className="col-lg-5 ">

                        <Button className='project-button' variant="primary" onClick={() => this.setState({ addModalShow: true })}>
                           <img className='project-image' src={img1} />
                        </Button>

                        <ProjectDetail show={this.state.addModalShow}
                           onHide={addModalclose} />


                     </div>
                     <div className="col-lg-5  ">

                        <Button className='project-button' variant="primary" onClick={() => this.setState({ addModalShow: true })}> */}

                                    <img className='project-image' src={img1} />
                        </Button>
                        {/* <ProjectDetail show={this.state.addModalShow}
                                    onHide={addModalclose} /> */}
                     </div>
                  </div>
                  <div className="row">
                     <div className="row  middle-row ">
                        <div className="col-lg-5  ">

                           <Button className='project-button' variant="primary" onClick={() => this.setState({ addModalShow: true })}>

                              <img className='project-image' src={img1} />

                           </Button>
                           {/* <ProjectDetail show={this.state.addModalShow}
                                        onHide={addModalclose} /> */}
                        </div>
                        <div className="col-lg-5  ">
                           <Button className='project-button' variant="primary" onClick={() => this.setState({ addModalShow: true })}>
                              <img className='project-image' src={img1} />
                           </Button>
                           {/* <ProjectDetail show={this.state.addModalShow}
                                        onHide={addModalclose} /> */}
                        </div>
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-lg-5 ">

                        <Button className='project-button' variant="primary" onClick={() => this.setState({ addModalShow: true })}> */}

                                    <img className='project-image' src={img1} />

                        </Button>

                        {/* <ProjectDetail show={this.state.addModalShow}
                                    onHide={addModalclose} /> */}
                            </div>

                  </div>
               </div>
            </div>
         </div>

      );
   }
}

export default ProfilePage;