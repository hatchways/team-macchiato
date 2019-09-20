import React from 'react'

import { Avatar } from '@material-ui/core'

const DEFAULTPFP = "https://api.adorable.io/avatars/100/abel@adorable.io.png"

export default function ProfilePicComponent(props) {
   return (
      <Avatar
         alt="avatar"
         src={
            props.src ? props.src : DEFAULTPFP
         } 
         style={{
            width: props.size,
            height: props.size
         }}
         />
   )
}
