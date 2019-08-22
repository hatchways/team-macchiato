import { withStyles } from "@material-ui/core/styles"
import { TextField } from '@material-ui/core'

import Image from '../assets/images/login-photo.png'

export const formsPageStyle = theme => ({
   imageWrapper: {
      backgroundSize: '100%',
      backgroundImage: `url(${Image})`,
      backgroundRepeat: 'no-repeat',
      height: '100vh',
   },
   contentWrapper: {
      minHeight: '600px',
      // minWidth: '420px',
   },
   toolBar: {
      background: 'white',
      boxShadow: 'none',
   },
   navButton: {
      top: theme.spacing(5),
      right: theme.spacing(5),
      left: 'auto',
      position: 'absolute',
   },
   content: {
      maxWidth: '50%',
      marginLeft: '20%',
      margin: '0 auto',
      marginTop: '5%',
   },
   header: {
      marginBottom: theme.spacing(5),
      fontSize: 40,
      fontWeight: theme.typography.fontWeightMedium,
   },
   formControl: {
      marginBottom: theme.spacing(1),
      display: 'flex',
   },
   label: {
      marginBottom: theme.spacing(1),
      color: '#a9b0d0',
      fontWeight: theme.typography.fontWeightMedium,
   },
   submitButton: {
      marginTop: theme.spacing(5),
   }
});

// export const CustomTextField = withStyles({
//       root: {
//          '& label.Mui-focused': {
//             color: 'green',
//          },
//          '& .MuiInput-underline:after': {
//             borderBottomColor: 'green',
//          },
//          '& .MuiOutlinedInput-root': {
//             '& fieldset': {
//                borderColor: 'red',
//             },
//             '&:hover fieldset': {
//                borderColor: 'yellow',
//             },
//             '&.Mui-disabled fieldset': {
//                borderColor: 'green',
//             },
//          },
//       },
//    })(TextField)