import Image from '../assets/images/login-photo.png'

export const formsPageStyle = theme => ({
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
      height: theme.spacing(20)
   },
   grow: {
      flexGrow: 1,
   },
   content: {
      maxWidth: '50%',
      marginLeft: '20%',
      margin: '0 auto',
   },
   header: {
      fontWeight: theme.typography.fontWeightMedium,
      marginBottom: theme.spacing(5),
      fontSize: 40,
   },
   formControl: {
      marginBottom: theme.spacing(1),
      display: 'flex',
   },
   label: {
      fontWeight: theme.typography.fontWeightMedium,
      marginBottom: theme.spacing(1),
      color: '#a9b0d0',
   },
   formControlLabel: {
      fontWeight: theme.typography.fontWeightMedium,
      marginRight: 3,
      color: '#aaa',
      marginBottom: 1,
   },
   errorText: {
      color: '#f44336',
   },
   submitButton: {
      marginTop: theme.spacing(5),
      color: 'white',
      backgroundImage: 'linear-gradient(to right, #ff9400, #ff3963)',
   },
   textLink: {
      fontWeight: theme.typography.fontWeightMedium,
      color: 'black',
      textDecoration: 'none',
   },
   snackbar: {
      '& div': {
         backgroundColor: theme.palette.error.dark
      }
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