import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './title';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


// Generate Order Data
function createData(testName,tid) {
  return { testName,tid };
}

const rows = [
  createData('Elow flex', 123),
  createData('Knee flex', 124),
];

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function UpcomingTests() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Upcoming Tests</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Test Name</TableCell>
            <TableCell align='right'>Attempt Test</TableCell>
            
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,i) => (
            <TableRow key={i}>
              <TableCell>{i+1}</TableCell>
              <TableCell>{row.testName}</TableCell>
              <TableCell align='right'>
                  <Button variant="contained" color="primary">
                    ATTEMPT TEST

                    </Button>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Typography variant="subtitle2" color="secondary">
            Physiocs
        </Typography>
      </div>
    </React.Fragment>
  );
}