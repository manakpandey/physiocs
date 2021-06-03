import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./title";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import * as settings from "../../../settings";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

function TestRow({ id, hist }) {
  useEffect(() => {
    getTestsDetails();
  }, [hist]);

  const [data, setData] = useState();

  const getTestsDetails = async () => {
    try {
      const res = await axios.get(
        `${settings.API_SERVER}/api/auth/getTests?tid=${hist.test_id}`,
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
        <TableCell>{hist?.range}</TableCell>
        <TableCell>{hist?.feedback_state}</TableCell>
        <TableCell align="right">{hist?.timestamp}</TableCell>
      </TableRow>
    </>
  );
}

export default function TestHistory() {
  useEffect(() => {
    getData();
  }, []);

  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(
        `${settings.API_SERVER}/api/auth/getTestHistory`,
        { withCredentials: true }
      );
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Test History</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Test Name</TableCell>
            <TableCell>ROM</TableCell>
            <TableCell>Pain level</TableCell>
            <TableCell align="right">Timestamp</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((d, i) => (
            <TestRow hist={d} key={i} id={i + 1} />
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
