import React, { useState, useCallback, useEffect } from "react";
import UserCard from "../components/DiscoveryCardComponent";
import FilterModal from "../components/DiscoveryFilterComponent";
import { makeStyles } from "@material-ui/core/styles";
import useDebounce from "./use-debounce";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputBase from "@material-ui/core/InputBase";

import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";

// Icon?
import Icon from "@mdi/react";
import { mdiKarate } from "@mdi/js";
import { mdiMagnify } from "@mdi/js";
import AccessAlarmsIcon from "@material-ui/icons/AccessAlarms";
import CloseIcon from "@material-ui/icons/Close";

import { userService } from "../services/userServices";

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
  searchIcon: {
    color: "#EBD1D2",
    display: "inline-block",
    margin: "20px"
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
    padding: "10px",
    cursor: "pointer",
    margin: "0 20px",
    borderRadius: "25%",
    background: "lightgray"
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
  inputBaseSearch: {
    width: "90%"
  }
}));

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

  // Initially load with non-filtered data
  // Use debounce on search bar everytime the search term get's updated (0.5 second)
  useEffect(
    () => {
      userService.searchDiscovery().then(data => {
        setLoading(false);
        return setResults(data);
      });

      if (debouncedSearchTerm) {
        // setLoading(true);
        userService.searchDiscovery(debouncedSearchTerm).then(data => {
          setResults(data);
        });
      } else {
        setResults([]);
      }
    },
    [debouncedSearchTerm]
  );

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.root}>
        <div className={classes.flex}>
          <div className={classes.search_container}>
            <div className={classes.textField}>
              <div className={classes.searchIcon}>
                <SearchIcon fontSize="large" />
              </div>

              <InputBase
                className={classes.inputBaseSearch}
                disableUnderline={true}
                placeholder="UX/UI"
                value={searchTerm}
                name="search"
                onChange={e => setSearchTerm(e.target.value)}
                onClick={e => setSearchTerm("")}
              />
            </div>
            <div className={classes.square_close_container}>
              <CloseIcon color="gray" onClick={e => setSearchTerm("")} />
              {/* <Icon
                path={mdiCloseCircle}
                size={1}
                color="gray"
                onClick={e => setSearchTerm("")}
              /> */}
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
