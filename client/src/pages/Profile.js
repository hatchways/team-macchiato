import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import { Modal, Form, Button } from "react-bootstrap";
import { ProjectDetail } from './ProjectDetail';
import Dropzone from 'react-dropzone';

import img1 from '../assets/images/creativedesignerediting34199.jpg';
import img6 from '../assets/images/profilepic.jpg';

import { userService, connectionService } from '../services/userServices';

import ProfileSummary from '../components/ProfileSummaryComponent'
import ProjectSummary from '../components/ProjectSummaryComponent'

class ProfilePage extends Component {

   constructor(props) {
      super(props);
      console.log(this.props)
      this.state = {
         addModalshow: false,
         loading: true,
         openEdit: false,
         status: '',
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
      if (this.props.currentUserInfo) {
         connectionService.getStatusBetween(otherUserId)
            .then(res => {
               if (res) {
                  let status;
                  if (res.status == 0) {
                     if (res.requester_id == this.props.currentUserInfo) {
                        status = 'Pending'
                     } else {
                        status = 'Accept'
                     }
                  } else if (res.status == 1) {
                     status = 'Connected'
                  } else {
                     status = 'Connect'
                  }
                  console.log(res)
                  console.log(status)
                  this.setState({ status: status })
               }
            })
      }
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
      if (!user) return 'User Does Not Exist'
      let addModalclose = () => this.setState({ addModalShow: false });
      let currentUser = this.props.currentUserInfo
      let sameUser = currentUser && currentUser.id === user.id
      let loading = this.state.loading
      if (loading) return ''
      return (
         <div>
            <div className="row">
               <ProfileSummary
                  user={user}
                  currentUser={currentUser}
                  sameUser={sameUser}
                  status={this.state.status}
                  updateUserSummary={this.updateUserSummary} />
               <ProjectSummary userId={user.id} />
            </div>
         </div>

      );
   }
}

export default ProfilePage;