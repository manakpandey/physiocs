import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import UserDetails from "./userDetails";
import CreateTest from "../../CreateTest";
import ScheduleTest from "../../ScheduleTest";
import { Tabs, Tab } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function PatientDashboard() {
  const classes = useStyles();

  const [page, setPage] = useState(0);

  return (
    <div className={classes.root}>
      <CssBaseline />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <div style={{display: 'flex', width:'70%', marginLeft:'15%', justifyContent: 'space-around'}}>
          <div style={{height:'80px'}}>
          <Tabs>
            <Tab label="Patient Details"
              style={{marginRight:'10px',
                marginLeft:'10px',
                fontSize:'16px',
                borderBottom:page==0?'3px solid #f6a5c0':'none',
                boxShadow: page==0?'4px 10px 10px 2px #888888':'none'}}
              onClick={() => setPage(0)}
            />
            <Tab label="Create New Test"
              style={{marginRight:'10px',
                fontSize:'16px',
                marginLeft:'10px',
                borderBottom:page==1?'3px solid #f6a5c0':'none',
                boxShadow: page==1?'4px 10px 10px 2px #888888':'none'}}
              onClick={() => setPage(1)}
            />
            <Tab label="Assign Test"
              style={{marginRight:'10px',
                marginLeft:'10px',
                fontSize:'16px',
                borderBottom:page==2?'3px solid #f6a5c0':'none',
                boxShadow: page==2?'4px 10px 10px 2px #888888':'none'}}
              onClick={() => setPage(2)}
            />
          </Tabs>
          </div>
        </div>
        
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {page == 0 ? (
                  <UserDetails />
                ) : page == 1 ? (
                  <CreateTest />
                ) : (
                  <ScheduleTest />
                )}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
