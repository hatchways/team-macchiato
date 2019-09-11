import React, { useState, useCallback, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
    width: "100%"
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
    height: "400px",
    background: "rgba(157, 157, 157, 0.1)"
  },
  filter_modal_refine: {
    height: "75%",
    background: "tomato",
    borderBottom: "rgba(157, 157, 157, 0.3)",
    display: "flex"
  },
  filter_modal_refine_section: {
    width: "33.33%"
  },
  filter_modal_button_search: {
    height: "25%",
    background: "yellow"
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

const FilterModal = () => {
  const classes = useStyles();
  return (
    <div className={classes.filter_modal}>
      <div className={classes.filter_modal_refine}>
        <div className={classes.filter_modal_refine_section}>
          <div>
            <TextField />
            <TextField />
          </div>
        </div>
        <div className={classes.filter_modal_refine_section}>
          location years
        </div>
        <div className={classes.filter_modal_refine_section}>
          location years
        </div>
      </div>
      <div className={classes.filter_modal_button_search}>
        <h1>Button</h1>
      </div>
    </div>
  );
};

export default function Discovery() {
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [searchedUsers, setSearchedUsers] = React.useState([]);

  // Open Filter
  const [filter, setFilter] = React.useState(false);

  const props = filter
    ? {
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        color: "white"
      }
    : { background: "white", color: "black" };
  const classes = useStyles(props);

  useEffect(() => {
    fetch("http://localhost:3001/api/discovery")
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        return setSearchedUsers(data);
      });
  }, []);

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.root}>
        <div className={classes.flex}>
          <div className={classes.search_container}>
            <div className={classes.textField}>
              <IconButton className={classes.iconButton} aria-label="search">
                <SearchIcon />
              </IconButton>
              <InputBase
                className={classes.input}
                placeholder="UX/ UI"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <Divider className={classes.divider} orientation="vertical" />
            </div>
            <div className={classes.square_close_container}>
              <Icon
                path={mdiCloseCircle}
                size={1}
                color="gray"
                onClick={e => setSearch("")}
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
        {filter ? <FilterModal /> : ""}
        <div className={classes.card_container}>
          {!loading
            ? searchedUsers.map(user => {
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
