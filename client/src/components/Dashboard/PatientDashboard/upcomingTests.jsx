import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./title";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import * as settings from "../../../settings";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

function TestRow({ id, tid }) {
  useEffect(() => {
    getTestsDetails();
  }, [tid]);

  const history = useHistory();

  const [data, setData] = useState();

  const getTestsDetails = async () => {
    try {
      const res = await axios.get(
        `${settings.API_SERVER}/api/auth/getTests?tid=${tid}`,
        { withCredentials: true }
      );
      setData(res.data[0]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <TableRow>
        <TableCell>{id}</TableCell>
        <TableCell>{data?.test_name}</TableCell>
        <TableCell align="right">
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push(`/test/${data?.id}`)}
          >
            ATTEMPT TEST
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function UpcomingTests() {
  useEffect(() => {
    getTests();
  }, []);

  const [tids, setTids] = useState([]);

  const getTests = async () => {
    try {
      const res = await axios.get(
        `${settings.API_SERVER}/api/auth/getTestSchedule`,
        { withCredentials: true }
      );
      const x = [];
      for (let i = 0; i < res.data.length; i++) {
        x.push(res.data[i].test_id);
      }
      setTids(x);
    } catch (e) {
      console.log(e);
    }
  };

  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Upcoming Tests</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Test Name</TableCell>
            <TableCell align="right">Attempt Test</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tids.map((tid, i) => (
            <TestRow tid={tid} key={i} id={i + 1} />
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Typography variant="subtitle2" color="secondary" align="center">
          Physiocs
        </Typography>
      </div>
    </React.Fragment>
  );
}
