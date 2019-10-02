import React, { useState, useCallback, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

// Icon?
import Icon from "@mdi/react";
import { mdiUfoOutline } from "@mdi/js";

// Card?
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
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
  }
}));

// Helper Function
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

export default UserCard;
