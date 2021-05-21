import React from 'react';
import Typography from '@material-ui/core/Typography';
import Title from './title';

export default function Predictions() {
 
  return (
    <React.Fragment>
      <Title >Recovery Time</Title>
      <br/>
      <br/>
      <Typography component="p" variant="h4">
        25 Days
      </Typography>
      
      
    </React.Fragment>
  );
}