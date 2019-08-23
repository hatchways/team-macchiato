import Image from '../assets/images/login-photo.png'

export const formsPageStyle = theme => ({
   typography: {
      fontWeight: theme.typography.fontWeightMedium,
   },
   imageWrapper: {
      backgroundSize: '100%',
      backgroundImage: `url(${Image})`,
      backgroundRepeat: 'no-repeat',
      height: '100vh',
      minHeight: '750px',
   },
   contentWrapper: {
      minHeight: '600px',
      // minWidth: '420px',
   },
   toolBar: {
      background: 'white',
      boxShadow: 'none',
   },
   navButtonWrapper: {
      top: theme.spacing(5),
      right: theme.spacing(5),
      left: 'auto',
      position: 'absolute',
      textDecoration: 'none',
   },
   navButton: {
      width: 140,
      height: 48,
      border: '1px #e0e0e0 solid',
      borderRadius: 90,
      fontSize: 14,
      textTransform: 'capitalize'
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
   },
   formControl: {
      marginBottom: theme.spacing(1),
      display: 'flex',
   },
   label: {
      marginBottom: theme.spacing(1),
      color: '#a9b0d0',
   },
   errorText: {
      color: '#f44336',
   },
   submitButton: {
      marginTop: theme.spacing(5),
      width: 140,
      height: 48,
      color: 'white',
      borderRadius: 90,
      fontSize: 14,
      textTransform: 'capitalize',
      backgroundImage: 'linear-gradient(to right, #ff9400, #ff3963)',
   },
   termsAndConditions: {
      fontWeight: theme.typography.fontWeightMedium,
      color: 'black',
      textDecoration: 'none',
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