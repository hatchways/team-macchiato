import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import { Modal, Form, Button } from "react-bootstrap";
import { ProjectDetail } from './ProjectDetail';
import EditProfileForm from './EditProfile'
import Dropzone from 'react-dropzone';

import Nav from "./Nav";
import img1 from '../assets/images/creativedesignerediting34199.jpg';
import img6 from '../assets/images/profilepic.jpg';
import { userService } from '../services/userServices';

class ProfilePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addModalshow: false,
            loading: true,
            openEdit: false
        }
        this.updateUserProfile = this.updateUserProfile.bind(this)
    }
    componentWillMount() {
        this.updateUserProfile()
        console.log("ME: ")
        console.log(this.props.currentUserInfo)
    }

    updateUserProfile = () => {
        let pathname = this.props.location.pathname
        let otherUserId = pathname.split('/')[2]
        this.setState({ otherUserId: otherUserId })
        userService.getById(otherUserId)
            .then(user => {
                console.log(user)
                this.setState({
                    user,
                    loading: false
                })
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
        let addModalclose = () => this.setState({ addModalShow: false });
        let currentUser = this.props.currentUserInfo
        return (
            <div>
                <Nav />
                <div className="row">
                    {/* <div className="gif-container"> */}
                    <div className=" col-lg-3 profile-detail ">
                        <Dropzone onDrop={this.onDrop} accept="image/jpg, image/gif">
                            {({ getRootProps, getInputProps, isDragActive }) => (
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <img className='profile-image' src={img6} />

                                </div>
                            )}
                        </Dropzone>



                        <h5 className='name-text'>{user && user[0].name}</h5>
                        <h5 className='title-text'>{user && user[0].title}</h5>
                        <h5 className='city-text'>{user && user[0].location}</h5>
                        <button className='orange-button hire-button'>Hire me</button>
                        <button className='white-button'>Message</button>
                        <div>
                            
                              <EditProfileForm 

                                    updateUserProfile={this.updateUserProfile}
                                />
                        {/* {
                            user &&
                                currentUser.id === user.id ?
                               
                                <EditProfileForm

                                    updateUserProfile={this.updateUserProfile}
                                />
                               
                                :
                                ''
                                } */}
                       
                        </div>
                        <hr className='hr-prof' />

                         
                       


                        <h6 className='skill-title'>Skills: </h6>
                        <div className="row ">
                            <div className="col-lg-3 ">
                                <button className='skill-box'>DESIGN</button>
                            </div>
                            <div className="col-lg-3 ">
                                <button className='skill-box'>ILLUSTRATION</button>
                            </div>
                            <div className="col-lg-2 ">
                                <button className='skill-box skill-UI'>UI</button>
                            </div>
                            <div className="col-lg-2 ">
                                <button className='skill-box'>UX</button>
                            </div>
                            <div className=" skill-row row ">
                                <div className="col-lg-6 ">
                                    <button className='skill-box skill-product'>PRODUCT DESIGN</button>
                                </div>
                                <div className="col-lg-4 ">
                                    <button className='skill-box'>MOBILE</button>
                                </div>
                            </div>
                        </div>
                        <hr className='hr-prof' />
                        
                        <h6 className='about-title'>About</h6>
                        <p className='about-text'>{user && user[0].About}</p>
                    </div>
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
                                        onHide={addModalclose} /> */} */}
                                </div>
                                <div className="col-lg-5  ">
                                    <Button className='project-button' variant="primary" onClick={() => this.setState({ addModalShow: true })}>
                                        <img className='project-image' src={img1} />
                                     </Button>
                                    {/* <ProjectDetail show={this.state.addModalShow}
                                        onHide={addModalclose} /> */} */}
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