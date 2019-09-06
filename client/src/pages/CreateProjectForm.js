import React, { useState, useCallback } from "react";
import Dropzone from "react-dropzone";
import { useDropzone } from "react-dropzone";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "50px",
    padding: theme.spacing(3, 2)
  }
}));

export default function CreateProjectForm() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [link, setLink] = React.useState("");
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
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog
        //Keep this open for a bit
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create a New Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the Fields and Click Submit!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={title}
            onChange={e => setTitle(e.target.value)}
            label="title"
            type="title"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            value={description}
            onChange={e => setDescription(e.target.value)}
            id="description"
            label="description"
            type="description"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="link"
            value={link}
            onChange={e => setLink(e.target.value)}
            label="link"
            type="link"
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
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              </section>
            )}
          </Dropzone>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
