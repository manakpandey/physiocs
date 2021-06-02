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

export default function UserDetails() {
  useEffect(() => {
    getTests();
  }, []);

  const [data, setData] = useState([]);

  const getTests = async () => {
    try {
      const res = await axios.get(
        `${settings.API_SERVER}/api/auth/getPhysioUsers`,
        { withCredentials: true }
      );
      console.log(res.data);
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Patient Details</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell align="right">Phone Number</TableCell>
            <TableCell>Address</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((d, i) => (
            <TableRow key={i}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{d.first_name}</TableCell>
              <TableCell>{d.last_name}</TableCell>
              <TableCell>{d.email}</TableCell>
              <TableCell align="right">{d.phone}</TableCell>
              <TableCell>{d.address}</TableCell>
            </TableRow>
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
