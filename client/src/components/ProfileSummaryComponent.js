import React from 'react'

import Pfp from './ProfilePicComponent'
import EditProfileForm from './ProfileSummaryEdit'
import MyButton from './ButtonComponents'
import Skill from './SkillComponent'
import { Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
   card: {
      margin: 10,
      maxWidth: '45%',
   },
   media: {
      height: 200,
   }
})

export default function ProfileSummaryComponent(props) {
   const classes = useStyles()

   let { user, sameUser, updateUserSummary } = props

   if (!user.title || user.title === '') user.title = 'Professional Fortnite Player'
   if (!user.location || user.location === '') user.location = 'In my Mother\'s basement'

   let renderSkills = user.skills.map(skill =>
      <Skill key={skill.id}>{skill.skill}</Skill>
   )
   // let skillPlaceholder = ['Design', 'Illustration', 'UI', 'UX', 'Product Design', 'Mobile']
   // renderSkills = skillPlaceholder.map(skill =>
   //    <Skill key={skill}>{skill}</Skill>
   // )
   
   let centerMe = 'row justify-content-center align-items-center'

   let smallTextStyle = {
      fontFamily: 'Poppins',
      fontSize: 12,
      color: '#777',
   }
   let medHeader = {
      marginTop: 30,
      marginBottom: 10
   }

   let description = 'I am a create designer from Toronto. I enjoy creating solutions for web and mobile app. Available for fulltime, freelance or remote work opportunities.'
   console.log(user)
   return (
      <Box className=" col-lg-3 profile-detail" style={{ height: '100vh' }}>
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
            <Typography style={smallTextStyle}>{user.title}</Typography>
         </Box>
         <Box textAlign="center">
            <Typography style={smallTextStyle}>{user.location}</Typography>
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
         <br />
         <div className={centerMe}>
            {// Only display this if user is viewing their own profile
               sameUser &&
               <EditProfileForm
                  updateUserSummary={updateUserSummary}
               />
            }
         </div>
         <Box className={centerMe}>
            <Typography variant='h6' style={medHeader}>Skills:</Typography>
         </Box>
         <Box className={centerMe} style={{
            display: 'flex',
            flexWrap: 'wrap'
         }}>
            {renderSkills}
         </Box>
         <hr className='hr-prof' />
         <Box textAlign="center" >
            <Typography variant='h6' style={medHeader}>About:</Typography>
            <Typography style={smallTextStyle}>
               {description}
            </Typography>
         </Box>

      </Box>
   )
}
