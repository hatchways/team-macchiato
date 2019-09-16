import React, { useState, useCallback, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import useDebounce from "./use-debounce";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";

// Icon?
import Icon from "@mdi/react";
import { mdiCloseCircle } from "@mdi/js";
import { mdiKarate } from "@mdi/js";
import { mdiUfoOutline } from "@mdi/js";

// Grid? Nah

// Card?
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

// Chip?
import Chip from "@material-ui/core/Chip";

// Button?
import Button from "@material-ui/core/Button";

import { userService } from "../services/userServices";

// Locations ?
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
// Experience
const experiences = [
  {
    value: "0 year experience",
    label: "0"
  },
  {
    value: "1 year experience",
    label: "1"
  },
  {
    value: "2 year experience",
    label: "2"
  },
  {
    value: "3 year experience",
    label: "3"
  }
];

const useStyles = makeStyles(theme => ({
  // Do this Wrapper stuff for now till we have more content on the page
  wrapper: {
    margin: "100px",
    boxSizing: "border-box"
  },
  root: {
    padding: theme.spacing(3, 2),
    width: "80%",
    margin: "auto",
    padding: "0",
    boxShadow: "5px 2px 15px 5px rgba(157, 157, 157, 0.3)"
  },
  form_container: {
    width: "75%"
  },
  flex: {
    display: "flex",
    height: "75px",
    borderBottom: "1px solid rgba(157, 157, 157, 0.5)"
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%"
  },
  search_container: {
    width: "70%",
    borderRight: "1px solid rgba(157, 157, 157, 0.5)",
    display: "flex",
    alignItems: "center"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    background: "white",
    border: "none",
    boxShadow: "none",
    width: "100%",
    zIndex: "0"
  },
  filter: {
    width: "30%",
    background: props => props.background || "white",
    color: props => props.color || "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
    }
  },
  square_close_container: {
    padding: "20px",
    cursor: "pointer"
  },
  card_container: {
    width: "100%",
    position: "relative",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridGap: "30px 20px",
    padding: "1rem 3rem"
  },
  card: {
    width: "100%",
    margin: "4px",
    display: "inline-block",
    margin: "auto",
    height: "25rem",
    boxShadow: "5px 2px 15px 5px rgba(157, 157, 157, 0.1)"
  },
  card_profile: {
    height: "50%",
    borderBottom: "1px solid rgba(157, 157, 157, 0.2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  card_profile_section: {
    margin: "auto",
    padding: "1rem 0"
  },
  card_profile_image: {
    borderRadius: "50%",
    background: "palevioletred",
    height: "65px",
    width: "65px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto"
  },
  card_profile_text: {
    textAlign: "center",
    padding: "1rem 0"
  },
  card_skills: {
    height: "35%",
    borderBottom: "1px solid rgba(157, 157, 157, 0.2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  card_experience: {
    height: "15%",
    borderBottom: "1px solid rgba(157, 157, 157, 0.2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  tag: {
    margin: theme.spacing(1),
    padding: "2px 10px",
    margin: "3px 5px",
    background: "transparent",
    color: "black",
    border: "2px solid rgba(157, 157, 157, 0.2)",
    display: "inline-block",
    borderRadius: "5%",
    textTransform: "uppercase"
  },
  // This is for the FilterModal
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
    background: "tomato",
    borderBottom: "rgba(157, 157, 157, 0.3)",
    display: "flex"
  },
  filter_modal_refine_section: {
    width: "33.33%",
    margin: "auto"
  },
  filter_modal_refine_exp_loc: {
    width: "50%",
    margin: "auto"
  },
  menu: {
    width: 200
  },
  filter_modal_button_search: {
    height: "25%",
    background: "yellow"
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
  close_skill: {
    zIndex: "1"
  }
}));

// Bring this into helper methods
// Only works for array right now
function isEmpty(array) {
  if (array.length < 1) {
    return true;
  } else {
    return false;
  }
}

const SkillTag = props => {
  const classes = useStyles([]);
  return <span className={classes.tag}>{props.skill}</span>;
};

const UserCard = props => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <div className={classes.card_profile}>
        <div className={classes.card_profile_section}>
          <div className={classes.card_profile_image}>
            <Icon
              path={mdiUfoOutline}
              title="User Profile"
              size={2}
              color="pink"
            />
          </div>
          <Typography variant="h6" component="h6">
            <div className={classes.card_profile_text}>
              <div>{props.name}</div>
              <div>Put a city here</div>
            </div>
          </Typography>
        </div>
      </div>
      <div className={classes.card_skills}>
        {!isEmpty(props.skills)
          ? props.skills.map(skillTags => {
              return <SkillTag skill={skillTags.skill} />;
            })
          : "Sorry No Skills"}
      </div>
      <div className={classes.card_experience}>
        <div>
          <Typography variant="h6" component="h6">
            0 years experience
            <Icon
              path={mdiUfoOutline}
              title="User Profile"
              size={1}
              color="pink"
              spin
            />
          </Typography>
        </div>
      </div>
    </Card>
  );
};

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
          {["UX/UI", "React", "No Skill"].map(skill => {
            return (
              <div onClick={e => props.setSkills(props.skills.concat(skill))}>
                {skill}
              </div>
            );
          })}
        </div>
      </div>
      <div className={classes.filter_modal_button_search}>
        <Button variant="contained" color="primary" className={classes.button}>
          Apply Filters
        </Button>
        <Button variant="contained" color="primary" className={classes.button}>
          Reset
        </Button>
        <Button variant="contained" color="primary" className={classes.button}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default function Discovery() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [results, setResults] = React.useState([]);
  const [location, setLocation] = React.useState("");
  const [experience, setExpereince] = React.useState("");
  const [skills, setSkills] = React.useState([]);
  const [input, setInput] = React.useState("");
  const [values, setValues] = React.useState({
    experience: experience,
    location: location,
    skills: skills
  });

  // debounce

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleChange = name => e => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleInputChange = e => {
    setInput(e.target.value);

    console.log(values);
  };

  const handleInputKeyDown = skill => event => {
    if (event.keyCode === 13) {
      if (skills.includes(skill)) {
        console.log("skill is already added");
      } else {
        setSkills(skills.concat(skill));
        // console.log("skills before", skills);
        setInput("");
      }
    }
    console.log(skills);
    setValues({ ...values, skills: skills });
  };

  const handleDiscoverySearch = skill => e => {
    setSearchTerm(e.target.value);
  };

  // Open Filter
  const [filter, setFilter] = React.useState(false);

  const props = filter
    ? {
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        color: "white"
      }
    : { background: "white", color: "black" };
  const classes = useStyles(props);

  useEffect(
    () => {
      userService.searchDiscovery().then(data => {
        setLoading(false);
        return setResults(data);
      });

      if (debouncedSearchTerm) {
        setLoading(true);
        userService.searchDiscovery(debouncedSearchTerm).then(data => {
          setLoading(false);
          setResults(data);
        });
      } else {
        setResults([]);
      }
      // fetch("http://localhost:3001/api/discovery")
      //   .then(response => response.json())
      //   .then(data => {
      //     setLoading(false);
      //     return setResults(data);
      //   });
    },
    [debouncedSearchTerm]
  );

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.root}>
        <div className={classes.flex}>
          <div className={classes.search_container}>
            <div className={classes.textField}>
              <IconButton className={classes.iconButton} aria-label="search">
                <SearchIcon />
              </IconButton>
              {/* Here */}
              <InputBase
                className={classes.input}
                placeholder="UX/UI"
                value={searchTerm}
                name="search"
                onChange={e => setSearchTerm(e.target.value)}
              />
              <Divider className={classes.divider} orientation="vertical" />
            </div>
            <div className={classes.square_close_container}>
              <Icon
                path={mdiCloseCircle}
                size={1}
                color="gray"
                onClick={e => setSearchTerm("")}
              />
            </div>
          </div>
          <div
            className={classes.filter}
            isActive={filter}
            onClick={e => setFilter(!filter)}
          >
            <div>
              <Typography variant="h6" component="h6">
                <Icon
                  path={mdiKarate}
                  title="User Profile"
                  size={1}
                  color={filter ? "white" : "black"}
                  // spin
                />
                Filter
              </Typography>
            </div>
          </div>
        </div>
        {/* Open Filter Div */}
        <FilterModal
          isActive={filter}
          location={location}
          experience={experience}
          onChange={name => handleChange(name)}
          value={values}
          skills={skills}
          input={input}
          setSkills={skill => setSkills(skill)}
          handleInputChange={input => handleInputChange(input)}
          handleInputKeyDown={skill => handleInputKeyDown(skill)}
        />
        <div className={classes.card_container}>
          {!loading
            ? results.map(user => {
                return (
                  <UserCard
                    name={user.name}
                    skills={user.skills}
                    loading={loading}
                  />
                );
              })
            : "loading"}
        </div>
      </Paper>
    </div>
  );
}
