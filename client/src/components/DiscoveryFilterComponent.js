import React, { useState, useCallback, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

// Icon?
import Icon from "@mdi/react";
import { mdiCloseCircle } from "@mdi/js";

// Card?
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";

const locations = [
  {
    value: "Toronto",
    label: "Tor"
  },
  {
    value: "Brampton",
    label: "Bramp"
  },
  {
    value: "Oakville",
    label: "Oak"
  },
  {
    value: "Mississauga",
    label: "Mis"
  }
];
const commonSkills = [
  "UX Design",
  "UI Design",
  "Mobile",
  "Product Design",
  "Illustration",
  "Motion Design"
];
// Experience
const experiences = [
  {
    value: "0",
    label: "0 year experience"
  },
  {
    value: "1",
    label: "1 year experience"
  },
  {
    value: "2",
    label: "2 year experience"
  },
  {
    value: "3",
    label: "3 year experience"
  }
];

const useStyles = makeStyles(theme => ({
  filter_modal: {
    height: "0px",
    overflow: "hidden",
    background: "rgba(157, 157, 157, 0.1)",
    "-webkit-transition": "all 1s ease",
    "-moz-transition": "all 1s ease",
    "-o-transition": "all 1s ease",
    "-ms-transition": "all 1s ease",
    transition: "all 1s ease"
  },
  // transform: {
  //   "-webkit-transition": "all 2s ease",
  //   "-moz-transition": "all 2s ease",
  //   "-o-transition": "all 2s ease",
  //   "-ms-transition": "all 2s ease",
  //   transition: "all 2s ease"
  // },
  transform_active: {
    height: "400px"
  },
  filter_modal_refine: {
    height: "75%",
    background: "	#F7F8FC",
    borderBottom: "rgba(157, 157, 157, 0.3)",
    display: "flex"
  },
  filter_modal_refine_section: {
    width: "33.33%",
    margin: "auto",
    padding: "20px"
  },
  filter_modal_refine_exp_loc: {
    width: "50%",
    margin: "auto"
  },
  menu: {
    width: 200
  },
  filter_modal_button_search: {
    borderTop: "1px solid rgba(157, 157, 157, 0.3)",
    height: "25%",
    background: "	#F7F8FC",
    margin: "auto"
  },
  magic: {
    zIndex: 1
  },
  filter_modal_refine_skill: {
    height: "200px"
  },
  filter_modal_skill_label: {
    width: "100%",
    height: "100%"
  },
  container: {
    border: "1px solid #ddd",
    padding: "5px",
    borderRadius: "5px",
    background: "white",
    height: "100%"
    // width: "100%"
  },

  items: {
    display: "inline-block",
    padding: "2px",
    border: "1px solid blue",
    fontFamily: "Helvetica, sans-serif",
    borderRadius: "5px",
    marginRight: "5px",
    cursor: "pointer"
  },

  input: {
    outline: "none",
    border: "none",
    fontSize: "14px",
    fontFamily: "Helvetica, sans-serif"
  },
  commonSkill: {
    background: "rgba(157, 157, 157, 0.3)",
    display: "inline-block",
    margin: "2px",
    borderRadius: "5%",
    padding: "2px 5px"
  },
  inputBaseSearch: {
    width: "80%"
  },
  close_skill: {
    zIndex: "1"
  }
}));

const FilterModal = props => {
  const classes = useStyles();

  return (
    <div
      className={`${classes.filter_modal} ${
        props.isActive ? classes.transform_active : classes.transform
      }`}
    >
      <div className={classes.filter_modal_refine}>
        <div className={classes.filter_modal_refine_section}>
          <div className={classes.filter_modal_refine_exp_loc}>
            <Typography variant="h6" component="h6">
              Location:
            </Typography>
            <TextField
              id="outlined-select-location-native"
              select
              className={classes.textField}
              value={props.value.location}
              onChange={props.onChange("location")}
              SelectProps={{
                native: true,
                MenuProps: {
                  className: classes.menu
                }
              }}
              margin="normal"
              variant="outlined"
            >
              {locations.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
            <Typography variant="h6" component="h6">
              Experience:
            </Typography>
            <TextField
              id="outlined-select-location-native"
              select
              className={classes.textField}
              value={props.value.experience}
              onChange={props.onChange("experience")}
              SelectProps={{
                native: true,
                MenuProps: {
                  className: classes.menu
                }
              }}
              margin="normal"
              variant="outlined"
            >
              {experiences.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </div>
        </div>
        <div className={classes.filter_modal_refine_section}>
          <div className={classes.filter_modal_refine_skill}>
            <Typography variant="h6" component="h6">
              Skills:
            </Typography>
            <label className={classes.filter_modal_skill_label}>
              <ul className={classes.container}>
                {props.skills.map((skill, i) => (
                  <li className={classes.items} key={i}>
                    {skill}
                    <span>
                      <Icon
                        className={classes.close_skill}
                        onClick={e =>
                          props.setSkills(
                            props.skills.filter(
                              (skill, i) => skill != e.target.id
                            )
                          )
                        }
                        path={mdiCloseCircle}
                        size={1}
                        id={skill}
                        color="gray"
                      />
                      {console.log(props.skills)}
                      {console.log()}
                    </span>
                  </li>
                ))}
                <input
                  className={classes.input}
                  value={props.input}
                  onChange={e => props.handleInputChange(e)}
                  onKeyDown={props.handleInputKeyDown(props.input)}
                />
              </ul>
            </label>
          </div>
        </div>
        <div className={classes.filter_modal_refine_section}>
          <Typography variant="h6" component="h6">
            Select from popular skills:
          </Typography>
          {commonSkills.map(skill => {
            return (
              <span
                className={classes.commonSkill}
                onClick={e =>
                  props.setSkills(props.skills.concat(skill.toUpperCase()))
                }
              >
                {skill.toUpperCase()}
              </span>
            );
          })}
        </div>
      </div>
      <div className={classes.filter_modal_button_search}>
        <Button variant="contained" color="#3ADB84" className={classes.button}>
          Apply Filters
        </Button>
        <Button variant="contained" color="#F6F9FB" className={classes.button}>
          Reset
        </Button>
        <Button variant="contained" color="#F6F9FB" className={classes.button}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default FilterModal;
