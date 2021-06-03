import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import AssignmentOutlined from "@material-ui/icons/AssignmentOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import * as settings from "../../settings";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  typography: {
    fontFamily: "Roboto",
  },
}));

const joints = [
  "leftElbowAngle",
  "leftHipAngle",
  "leftKneeAngle",
  "leftShoulderAngle",
  "rightElbowAngle",
  "rightHipAngle",
  "rightKneeAngle",
  "rightShoulderAngle",
];

export default function CreateTest() {
  const classes = useStyles();

  const [joint, setJoint] = useState("");
  const [testName, setTestName] = useState("");
  const [testDesc, setTestDesc] = useState("");
  const [relaxAngle, setRelaxAngle] = useState();
  const [flexAngle, setFlexAngle] = useState();
  const [numReps, setNumReps] = useState();
  const [file, setFile] = useState("");

  const handleJoint = (event) => {
    setJoint(event.target.value);
    //console.log(joint);
  };

  const handleTestName = (event) => {
    setTestName(event.target.value);
    //console.log(testName);
  };

  const handleTestDesc = (event) => {
    setTestDesc(event.target.value);
    //console.log(testDesc);
  };

  const handleRelaxAngle = (event) => {
    setRelaxAngle(event.target.value);
    //console.log(relaxAngle);
  };

  const handleFlexAngle = (event) => {
    setFlexAngle(event.target.value);
    //console.log(flexAngle);
  };

  const handleNumReps = (event) => {
    setNumReps(event.target.value);
    //console.log(numReps);
  };

  const handleFile = (event) => {
    setFile(event.target.files[0]);
    //console.log(file);
  };

  async function handleSubmit() {
    let formData = new FormData();
    formData.append("testName", testName);
    formData.append("testDescription", testDesc);
    formData.append("jointName", joint);
    formData.append("maxAngle", relaxAngle);
    formData.append("minAngle", flexAngle);
    formData.append("reps", numReps);
    //formData.append("img", file);

    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }

    // const config = {
    //   headers: { "content-type": "multipart/form-data" },
    // };

    try {
      const res = await axios.post(
        `${settings.API_SERVER}/api/auth/saveTest`,
        formData
      );

      if (res.status == 201) {
        Swal.fire({
          icon: "success",
          title: "Succesful",
          text: "New test created",
        });
        
        setNumReps(0);
        setRelaxAngle(0);
        setFlexAngle(0);
        setJoint("");
        setTestDesc("");
        setTestName("");
        setFile("");
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Container component="div" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AssignmentOutlined />
        </Avatar>
        <Typography component="h4" variant="h4">
          Create a Test
        </Typography>
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="testName"
                label="Enter Test Name"
                type="text"
                name="testName"
                value={testName}
                onChange={handleTestName}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="testDesc"
                label="Enter a Test Description"
                type="text"
                name="testDesc"
                value={testDesc}
                onChange={(e) => handleTestDesc(e)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="jointName"
                fullWidth
                label="Select Joint"
                value={joint}
                onChange={handleJoint}
                required
                select
                variant="outlined"
                helperText="Joint about which you want to measure the ROM"
              >
                {joints.map((joint) => {
                  return (
                    <MenuItem value={joint} key={joint}>
                      {joint}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="relaxedAngle"
                label="Relaxed Angle (max)"
                type="decimal"
                name="relaxedAngle"
                value={relaxAngle}
                onChange={(e) => handleRelaxAngle(e)}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="flexAngle"
                label="Flexed Angle (min)"
                type="decimal"
                id="flexedAngle"
                value={flexAngle}
                onChange={(e) => handleFlexAngle(e)}
              />
            </Grid>

            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="numReps"
                label="Number of Reps"
                type="integer"
                id="numReps"
                step="1"
                value={numReps}
                onChange={(e) => handleNumReps(e)}
              />
            </Grid>
            <Grid item xs={3}></Grid>

            <Grid item xs={12}></Grid>

            <Grid item xs={5}>
              <Button variant="contained" component="label">
                Upload File
                <input
                  type="file"
                  id="file"
                  accept="image/*"
                  onChange={(e) => handleFile(e)}
                  hidden
                />
              </Button>
            </Grid>
            <Grid item xs={7}>
              <hr></hr>
              {file == ""
                ? "Please provide a sample photo"
                : "Thanks for uploading a sample photo"}
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox value="allowExtraEmails" color="primary" required />
                }
                label="The test details provided are for the correct patient and target joint *"
              />
            </Grid>
          </Grid>

          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Create Test
          </Button>
        </form>
      </div>
    </Container>
  );
}
