import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

import A1 from "../../assets/emojis/1.png";
import A2 from "../../assets/emojis/2.png";
import A3 from "../../assets/emojis/3.png";
import A4 from "../../assets/emojis/4.png";
import A5 from "../../assets/emojis/5.png";
import A6 from "../../assets/emojis/6.png";

const useStyles = makeStyles(() => ({
  container: {
    /* background-color: #d2ccff; */
    borderRadius: "5px",
  },
  emojiContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
  },
  header1: {
    marginBottom: "5px",
    textAlign: "center",
  },
  header2: {
    textAlign: "center",
    marginBottom: "60px",
  },
  emojiCard: {
    justifyContent: "center",
    width: "64px",
  },
  emojiDesc: {
    fontSize: "24px",
    overflowX: "visible",
    textAlign: "center",
    display: "block",
    typography: {
      fontFamily: "Roboto",
    },
  },
  emoji: {
    width: "64px",
    height: "64px",
    display: "block",
    borderRadius: "32px",
    transitionDuration: "0.3s",
    marginBottom: "10px",
    "&:hover": {
      borderRadius: "36px",
      width: "72px",
      height: "72px",
      transitionDuration: "0.3s",
    },
  },
  typography: {
    fontFamily: "Roboto",
  },
}));

function getColor(index) {
  switch (index) {
    case 0:
      return "#99ebff";
    case 1:
      return "#99ff99";
    case 2:
      return "#bbff33";
    case 3:
      return "#ffe066";
    case 4:
      return "#ff8533";
    case 5:
      return "#ff3333";
    default:
      break;
  }
}

export default function FeedBackScale({clickMe}) {
  const classes = useStyles();

  function handleClick(selectedPainCategory) {
    clickMe(selectedPainCategory);
  }

  var createButtons = () => {
    const imgArray = [A1, A2, A3, A4, A5, A6];
    const descArray = [
      "No Pain",
      "Very Minor Pain",
      "Hurts a Little Less",
      "Hurts a Little More",
      "Hurts a Lot",
      "I'm Dead",
    ];
    return imgArray.map((img, index) => {
      return (
        <div className={classes.emojiCard} key={index}>
          <img
            className={classes.emoji}
            src={img}
            alt={descArray[index]}
            onClick={() => handleClick(index)}
            style={{ backgroundColor: getColor(index) }}
          ></img>
          <Typography
            variant="body1"
            component="body"
            className={classes.emojiDesc}
          >
            {descArray[index]}
          </Typography>
        </div>
      );
    });
  };

  return (
    <div className={classes.container}>
      <Typography variant="h3" component="h3" className={classes.header1}>
        Self-Assessment Pain Scale
      </Typography>
      <Typography variant="h5" component="h5" className={classes.header2}>
        Categorical SAPS
      </Typography>
      <div className={classes.emojiContainer}>{createButtons()}</div>
    </div>
  );
}
