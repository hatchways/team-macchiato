import React from 'react'

import { Menu, MenuItem, Box } from '@material-ui/core'

import { withStyles, styled } from '@material-ui/core/styles';

export const StyledMenu = withStyles({
   paper: {
      border: '1px solid #d3d4d5',
      borderRadius: 0,
      minWidth: 300,
   },
})(props => (
   <Menu
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
      transformOrigin={{ vertical: 'top', horizontal: 'right', }}
      keepMounted
      {...props}
   />
));

export const MenuHeader = withStyles({
   root: {
      borderBottom: '1px solid #ccc',
      padding: '0px 16px 4px 10px',
   }
})(Box)

export const StyledMenuItem = withStyles(theme => ({
   root: {
      padding: '6px 10px 5px 12px',
      borderBottom: '1px solid #ccc',
     '&:focus': {
       backgroundColor: 'ccc',
       '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
         color: theme.palette.common.white,
       },
     },
   },
 }))(MenuItem);

export default StyledMenu
