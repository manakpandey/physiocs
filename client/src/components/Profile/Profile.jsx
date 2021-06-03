import React, { useState, useEffect } from "react";
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
      marginLeft:"100px",
    width: "80%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  typography: {
    fontFamily: "Roboto",
  },
}));


export default function DashRouter() {
    const classes = useStyles();
  useEffect(() => {
    getUser();
  });

  const [userType, setUserType] = useState();
  const [name, setName]=useState();
  const [lname, setlName]=useState();
  const [add, setAdd]=useState();
  const [num,setNum]=useState();
  const [email, setEmail]=useState();

  const getUser = async () => {
    try {
      const res = await axios.get(`${settings.API_SERVER}/api/auth/getUser`, {
        withCredentials: true,
      });
      const user = res.data;
      setUserType(user[0].usertype);
      setName(user[0].first_name);
      setlName(user[0].last_name);
      setAdd(user[0].address);
      setNum(user[0].phone);
      setEmail(user[0].email);

    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
     <Container component="div" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AssignmentOutlined />
        </Avatar>
        <Typography component="h4" variant="h4">
          Profile
        </Typography>

        <form className={classes.form}>
          <Grid container spacing={12}>
              </Grid>

            <Grid container spacing={12}>
                <Grid item xs={6}>
                <Typography >Name</Typography>
                </Grid>
                <Grid item xs={6}>
                <Typography>{name} {lname}</Typography>
                </Grid>
            </Grid>
            <Grid container spacing={12}>
                <Grid item xs={6}>
                <Typography >Email</Typography>
                </Grid>
                <Grid item xs={6}>
                <Typography>{email}</Typography>
                </Grid>
            </Grid>
            <Grid container spacing={12}>
                <Grid item xs={6}>
                <Typography >Phone number</Typography>
                </Grid>
                <Grid item xs={6}>
                <Typography>{num}</Typography>

                </Grid>
            </Grid>
            <Grid container spacing={12}>
                <Grid item xs={6}>
                <Typography >Address</Typography>
                </Grid>
                <Grid item xs={6}>
                <Typography>{add}</Typography>
                </Grid>
            </Grid>
        </form>
      </div>
    </Container>
  


    </>
  );
}
