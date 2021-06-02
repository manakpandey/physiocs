import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AssignmentIndOutlinedIcon from "@material-ui/icons/AssignmentIndOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import * as settings from "../../settings";
import { MenuItem } from "@material-ui/core";
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


export default function ScheduleTest() {
  const classes = useStyles();

  const [ptntData, setPtntData] = useState([]);
  const [testData, setTestData] = useState([]);
  const [patient, setPatient] = useState(0);
  const [test, setTest] = useState(0);

  async function handleSubmit() {
    let formData = new FormData();
    formData.append("pid", patient);
    formData.append("tid", test);

    for (var pair of formData.entries()) {
         console.log(pair[0] + ", " + pair[1]);
       }

    try {
      const res = await axios.post(
        `${settings.API_SERVER}/api/auth/scheduleTest`,
        formData
      );

      if(res.status == 201) {
        Swal.fire({
          icon: "success",
          title: "Succesful",
          text: "Test Assigned Successfully",
        });

        setPatient("");
        setTest("");
      }
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const resPtnt = await axios.get(
        `${settings.API_SERVER}/api/auth/getPhysioUsers`,
        { withCredentials: true }
      );
      console.log(resPtnt.data);
      setPtntData(resPtnt.data);      
    } catch (e) {
      console.log(e);
    }

    try {
      const resTest = await axios.get(
        `${settings.API_SERVER}/api/auth/getAllTests`,
        { withCredentials: true }
      );
      console.log(resTest.data);
      setTestData(resTest.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleTest = (event) => {
    setTest(event.target.value);
  }

  const handlePatient = (event) => {
    setPatient(event.target.value);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AssignmentIndOutlinedIcon />
        </Avatar>
        <Typography component="h4" variant="h4">
          Assign a Test
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
                onChange={handlePatient}
                value={patient}
              >
                {ptntData.map((ptnt, index) => {
                  return <MenuItem key={index} value={ptnt.id}>
                    {ptnt.first_name + ' ' + ptnt.last_name}
                  </MenuItem>
                })}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                fullWidth
                label="Select Test"
                required
                select
                variant="outlined"
                onChange={handleTest}
                value={test}
              >
                {testData.map((test, index) => {
                  return <MenuItem value={test.id} key={index}>
                    {test.test_name}
                  </MenuItem>
                })}
              </TextField>
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
            Schedule Test
          </Button>
        </form>
      </div>
    </Container>
  );
}
