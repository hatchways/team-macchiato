import React, { Component } from 'react'
import { styled } from '@material-ui/styles'

import { Button } from '@material-ui/core'

import { Link } from 'react-router-dom'

const MyButton = styled(Button)({
   width: 140,
   height: 48,
   borderRadius: 90,
   fontSize: 14,
   textTransform: 'none',
})

const MyLink = styled(Link)({
   textDecoration: 'none',
   '&:hover': {
      textDecoration: 'none',
   }
})

export function LinkButton(props) {
   return (
      <MyLink className={props.linkClass} to={props.to} {...props.linkProps} >
         <MyButton className={props.buttonClass} {...props.buttonProps}>
            {props.buttonInner}
         </MyButton>
      </MyLink>
   )
}

export default MyButton
