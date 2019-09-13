import React from 'react'

import { Menu, MenuItem } from '@material-ui/core'

import { withStyles, styled } from '@material-ui/core/styles';

export const StyledMenu = withStyles({
   paper: {
      border: '1px solid #d3d4d5',
   },
})(props => (
   <Menu
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
      transformOrigin={{ vertical: 'top', horizontal: 'center', }}
      keepMounted
      {...props}
   />
));

export default StyledMenu
