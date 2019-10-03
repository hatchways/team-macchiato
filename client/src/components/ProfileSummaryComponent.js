import React from 'react'

import Pfp from './ProfilePicComponent'
import EditProfileForm from './ProfileSummaryEdit'
import MyButton from './ButtonComponents'
import Skill, { AddSkillButton } from './SkillComponent'
import { Typography, Box, Button } from '@material-ui/core'
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

import { userService, connectionService } from '../services/userServices'
import CreateProjectFormHook from './CreateProjectFormHook'

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

   let { user, currentUser, sameUser, updateUserSummary } = props

   console.log(user.title)
   console.log(user.location)

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

   const sendFriendRequest = () => {
      let { currentUser, user } = props
      if (currentUser) {
         // Send a connection request
         connectionService.sendConnectionRequest(user.id)
            .then(res => {
               console.log(res)
               updateUserSummary()
            })
      } else {
         // Redirect to Login
         props.history.push(`/login`)
      }
   }

   const acceptFriendRequest = () => {
      let { user } = props
      connectionService.respondToConnection(user.id, true)
         .then(res => {
            console.log(res)
            updateUserSummary()
         })
   }
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
            {sameUser ?
               <>
                  <EditProfileForm
                     updateUserSummary={updateUserSummary}
                  />
                  <CreateProjectFormHook updateUserSummary={updateUserSummary}/>
                  {/* <MyButton>Add Project</MyButton> */}
               </>
               :
               <>
                  {(props.status == 'Pending' || props.status == 'Connected') ?
                     <MyButton style={{
                        marginLeft: 10,
                        color: 'white',
                        backgroundImage: 'linear-gradient(to right, #52DD32, #00997E)'
                     }} disabled>
                        Connected
                     </MyButton>
                     : (props.status == 'Accept') ?
                        <MyButton style={{
                           marginLeft: 10,
                           color: 'white',
                           backgroundImage: 'linear-gradient(to right, #0EB9DA, #2546F1)'
                        }} onClick={acceptFriendRequest}>
                           Accept
                        </MyButton>
                        : <MyButton style={{
                           marginLeft: 10,
                           color: 'white',
                           backgroundImage: 'linear-gradient(to right, #ff9400, #ff3963)'
                        }} onClick={sendFriendRequest}>
                           Connect
                        </MyButton>
                  }
                  <MyButton variant="outlined" color="primary" onClick={() => console.log(props)}>Message</MyButton>
               </>
            }
         </div>
         <br />
         <Box className={centerMe}>
            <Typography variant='h6' style={medHeader}>Skills:</Typography>
         </Box>
         <Box className={centerMe} style={{
            display: 'flex',
            flexWrap: 'wrap'
         }}>
            {renderSkills}
            {sameUser && <AddSkillComponent updateUserSummary={updateUserSummary} />}
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

function AddSkillComponent(props) {

   const [open, setOpen] = React.useState(false);
   const [skill, setSkill] = React.useState("");

   const handleClickOpen = () => setOpen(true)
   const handleClose = () => setOpen(false)

   const addSkill = () => {
      userService.addSkill(skill)
         .then(res => {
            props.updateUserSummary()
            handleClose()
         })
         .catch(err => {
            console.log(err)
         })
   }

   return (
      <>
         <AddSkillButton onClick={handleClickOpen}>+ New Skill</AddSkillButton>
         {/* <AddSkillButton onClick={() => console.log(this.state)}>State</AddSkillButton> */}
         <Dialog
            //Keep this open for a bit
            open={open}
            onClose={handleClose}
         >
            <DialogTitle id="form-dialog-title">Add Skill</DialogTitle>
            <DialogContent>
               <TextField
                  autoFocus
                  margin="dense"
                  id="skill"
                  onChange={e => setSkill(e.target.value)}
                  label="Skill"
                  fullWidth
               />
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose} color="primary">
                  Cancel
               </Button>
               <Button onClick={addSkill} color="primary">
                  Add
               </Button>
            </DialogActions>
         </Dialog>
      </>
   )
}