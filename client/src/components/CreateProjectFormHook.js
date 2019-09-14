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
// List
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";

// Icons
import CloseIcon from "@material-ui/icons/Close";

// Services
import { projectService } from "../services/userServices"

const useStyles = makeStyles(theme => ({
  root: {
    margin: "50px",
    padding: theme.spacing(3, 2)
  },
  listItem: {
    background: "palegreen",
    margin: "5px 0",
    borderRadius: "25px"
  },
  listItemButton: {
    cursor: "pointer",
    background: "red",
    position: "absolute",
    top: "0",
    right: "0",
    padding: "0 10px",
    zIndex: "1"
  },
  xIcon: {
    zIndex: "0"
  }
}));

export default function CreateProjectForm() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [link, setLink] = React.useState("");
  const [imgSrc, setImgSrc] = React.useState(null);
  const [files, setFiles] = React.useState([]);
  const maxSize = 1000000000000;
  // Opens the modal
  const handleClickOpen = () => {
    setOpen(true);
  };
  // Closes the modal
  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async e => {
    e.preventDefault();
    //Fetch Or Axios
    // const { photos, title, desc, link } = proj;

    const getBase64 = async file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onload = () => {
          if (!!reader.result) {
            resolve(reader.result)
          }
          else {
            reject(Error("Failed converting to base64"))
          }
        }
      })
    }

    let encodedFiles = files.map(async file => getBase64(file))

    Promise.all(encodedFiles)
      .then(res => {
        let proj = {
          photos: res,
          title: title,
          desc: description,
          link: link,
        }
        projectService.uploadProj(proj)
      }).catch(err => {
        console.error(err)
      })

    setOpen(false);
    setTitle("");
    setDescription("");
    setLink("");
    setFiles([]);
  };

  const onDrop = useCallback(
    file => {
      setFiles(files.concat(file));
    },
    [files]
  );

  const deleteFile = e => {
    const deleteFileName = e.target.id;
    const newFiles = files.filter(file => file.name != deleteFileName);
    return setFiles(newFiles);
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    acceptedFiles,
    rejectedFiles
  } = useDropzone({
    onDrop,
    accept: "image/png",
    minSize: 0,
    maxSize
  });
  const isFileTooLarge =
    rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;

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
          {/* React DropZone */}
          <div>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {!isDragActive && "Click here or drop a file to upload!"}
              {isDragActive && !isDragReject && "Drop it like it's hot!"}
              {isDragReject && "File type not accepted, sorry!"}
              {isFileTooLarge && (
                <div className="text-danger mt-2">File is too large.</div>
              )}
            </div>
            <List>
              {files.map(file => {
                return (
                  <ListItem className={classes.listItem}>
                    {file.name}
                    <div
                      className={classes.listItemButton}
                      onClick={deleteFile}
                      id={file.name}
                      value={file}
                    >
                      <CloseIcon
                        className={classes.xIcon}
                        onClick={deleteFile}
                        id={file.name}
                        value={file}
                      />
                    </div>
                  </ListItem>
                );
              })}
            </List>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
