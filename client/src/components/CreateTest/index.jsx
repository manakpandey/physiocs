import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import AssignmentOutlined from '@material-ui/icons/AssignmentOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  typography: {
    fontFamily: 'Roboto',
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
  "rightShoulderAngle"
]



export default function CreateTest() {
  const classes = useStyles();

  const [joint, setJoint] = useState("");

  const handleJoint = (event) => {
    setJoint(event.target.value);
    console.log(joint);
  }

  return (
    <Container component="main" maxWidth="xs">
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
                autoComplete="testName"
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
                autoComplete="testDesc"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                labelId="demo-simple-select-label"
                id="demo-simple-select" fullWidth
                label="Select Joint"
                value={joint}
                onChange={handleJoint}
                required
                select
                variant="outlined"
                helperText="Joint about which you want to measure the ROM"
              >
                {joints.map((joint) => {
                  return <MenuItem value={joint} key={joint}>
                  {joint}
                </MenuItem>
                })}
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="relaxedAngle"
                label="Relaxed Angle"
                type="decimal"
                name="relaxedAngle"
                autoComplete="relaxedAngle"
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="flexAngle"
                label="Flexed Angle"
                type="decimal"
                id="flexAngle"
                autoComplete="flexAngle"
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
                autoComplete="numReps"
                step="1"
              />
            </Grid>
            <Grid item xs={3}></Grid>

            <Grid item xs={12}></Grid>

            <Grid item xs={5}>
              <Button
                variant="contained"
                component="label"
              >
                Upload File
                <input 
                  type="file"
                  accept="image/*"
                  hidden/>
              </Button>
            </Grid>
            <Grid item xs={7}>
              <hr></hr><text>Please provide a sample photo</text>
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" required/>}
                label="The test details provided are for the correct patient and target joint *"
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create Test
          </Button>
        </form>
      </div>
    </Container>
  );
}