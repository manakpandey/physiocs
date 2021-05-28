import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
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


export default function ScheduleTest() {
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
          <AssignmentIndOutlinedIcon />
        </Avatar>
        <Typography component="h4" variant="h4">
          Schedule a Test
        </Typography>
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="demo-simple-select" 
                fullWidth
                label="Select Patient"
                required
                variant="outlined"
                select
                //value={''}
              >
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                labelId="demo-simple-select-label"
                id="demo-simple-select" fullWidth
                label="Select Test"
                value={joint}
                onChange={handleJoint}
                required
                select
                variant="outlined"
              >
                {/*joints.map((joint) => {
                  return <MenuItem value={joint} key={joint}>
                  {joint}
                </MenuItem>
                })*/}
              </TextField>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Schedule Test
          </Button>
        </form>
      </div>
    </Container>
  );
}