import React from 'react'

import Pfp from './ProfilePicComponent'
import EditProfileForm from './EditProfileComponent'
import MyButton from './ButtonComponents'
import { Typography, Box } from '@material-ui/core'

export default function ProfileSummaryComponent(props) {
   let { user, sameUser, updateUserSummary } = props
   user.title = 'Professional Fortnite Player'
   user.location = 'In my Mother\'s basement'

   let centerMe = 'row justify-content-center align-items-center'

   let smallTextStyle = {
      fontFamily: 'Poppins',
      fontSize: 12,
      color: '#777',
   }

   let description = 'I am a create designer from Toronto. I enjoy creating solutions for web and mobile app. Available for fulltime, freelance or remote work opportunities.'
   
   return (
      <div className=" col-lg-3 profile-detail">
         <br />
         <div className={centerMe}>
            <Pfp size={80} />
         </div>
         <div className={centerMe}
            style={{
               marginTop: 20,
               marginBottom: 10,
            }}>
            <Typography variant='h5' fontWeight='fontWeightBold'>
               {user.name}
            </Typography>
         </div>
         <Box textAlign="center" fontWeight='fontWeightMedium'>
            <Typography textAlign="center" style={smallTextStyle}>{user.title}</Typography>
         </Box>
         <Box textAlign="center" >
            <Typography textAlign="center" style={smallTextStyle}>{user.location}</Typography>
         </Box>
         <div className={centerMe} style={{ marginTop: 20 }}>
            <MyButton style={{
               marginLeft: 10,
               color: 'white',
               backgroundImage: 'linear-gradient(to right, #ff9400, #ff3963)'
            }} >
               Hire me
            </MyButton>
            <MyButton>Message</MyButton>
         </div>
         <hr className='hr-prof' />
         <div className={centerMe}>
            {// Only display this if user is viewing their own profile
               sameUser &&
               <EditProfileForm
                  updateUserSummary={updateUserSummary}
               />
            }
         </div>
         <hr className='hr-prof' />
         <Box className={centerMe}>
            <Typography variant='h6'>
               Skills:
            </Typography>
            <hr />
            <Typography>WORK IN PROGRESS</Typography>
         </Box>
         <hr className='hr-prof' />
         <Box textAlign="center" >
            <Typography variant='h6'>
               About:
            </Typography>
            <hr />
            <Typography style={smallTextStyle}>
               {description}
            </Typography>
         </Box>

      </div>
   )
}