import React, { useState, useCallback } from "react";
import Dropzone from "react-dropzone";
import { useDropzone } from "react-dropzone";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Button from './ButtonComponents';

import { userService } from '../services/userServices'

const useStyles = makeStyles(theme => ({
  root: {
    margin: "50px",
    padding: theme.spacing(3, 2)
  }
}));

export default function EditProfile(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [imgSrc, setImgSrc] = React.useState(null);
  const imageMaxSize = 1000000000000;
  // Opens the modal
  const handleClickOpen = () => {
    setOpen(true);
  };
  // Closes the modal
  const handleClose = () => {
    setOpen(false);
  };



  const submitEditProfileData = () => {
    let data = {
      name,
      title,
      location,


    }
    console.log(data)
    userService.editProfile(data)
      .then(res => {
        console.log(res)
        props.updateUserSummary()
        handleClose()
      })
      
    setName('')
    setTitle('')
    setLocation('')
  }

  const onSubmit = e => {
    e.preventDefault();
    console.log("helo");
  };

  const handleOnDrop = (acceptedFiles, rejectedFiles) => {
    console.log(acceptedFiles);
    console.log("rejected files are", rejectedFiles);
    if (rejectedFiles && rejectedFiles.length > 0) {
      const currentRejectedFile = rejectedFiles[0];
      const currentRejectedFileType = currentRejectedFile.type;
      const currentRejectedFileSize = currentRejectedFile.size;
      if (currentRejectedFileSize > imageMaxSize) {
        alert("this file is too big");
      }
    }

    const currentFile = acceptedFiles[0];
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        console.log(reader.result);
        setImgSrc(reader.result);
      },
      false
    );
    reader.readAsDataURL(currentFile);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    disabled: true
  });

  return (
    <div>
      <Button style={{
        marginLeft: 10,
        color: 'white',
        backgroundImage: 'linear-gradient(to right, #ff9400, #ff3963)'
      }} onClick={handleClickOpen}>
        Edit Profile
      </Button>
      <Dialog
        //Keep this open for a bit
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the Fields and Click Submit!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            label="name"
            type="name"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            label="title"
            type="title"
            fullWidth
          />

          <TextField
            autoFocus
            margin="dense"
            value={location}
            onChange={e => setLocation(e.target.value)}
            id="location"
            label="location"
            type="location"
            fullWidth
          />

          <Dropzone
            onDrop={handleOnDrop}
            maxSize={imageMaxSize}
            multiple
            accept="image/png, image/gif"
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {imgSrc !== null ? <img src={imgSrc} /> : ""}
                  {/* <p>Drag 'n' drop some files here, or click to select files</p> */}
                  <p>Drag 'n' drop some files here (Actually please don't, you'll break the app)</p>
                </div>
              </section>
            )}
          </Dropzone>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={submitEditProfileData} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
