import React, { Component } from 'react'
import { styled } from '@material-ui/styles'

import { Box, Typography } from '@material-ui/core'

const SkillComponent = styled(Typography)({
   padding: '10px 20px 10px 20px',
   margin: '5px 4px 5px 4px',
   borderRadius: 5,
   border: '1px solid #d3d3d3',
   fontSize: 14,
   textTransform: 'capitalize',
})

export default SkillComponent
