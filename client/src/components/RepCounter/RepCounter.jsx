import { Card, CardContent, LinearProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import React from 'react';


const useStyles = makeStyles((theme) => ({
    base: {
      maxWidth: '450px',
      width: '75%',
      backgroundColor: '#e6d7ff',
      boxShadow: '3px 7px 8px #888888',
    },
    supplementary: {
        maxWidth: '100px',
        width: '25%',
        textAlign: 'center',
        boxShadow: '3px 7px 8px #888888',
        backgroundColor: '#e6d7ff',
      },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    dotContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '10px'
    },
    completedRep: {
        width: '24px',
        height: '24px',
        fontSize: '16px',
    },
    incompleteRep: {
        width: '24px',
        height: '24px',
        fontSize: '16px',
    },
    cardContainer: {
        display: 'flex',
        width: '600px',
    },
  }));


export default function RepCounter({repResult, count, numReps}) {
    const classes = useStyles();

    // Convert count to percentage
    const currProgress = (x) => {
        return (x*100)/numReps;
    }

    if(count>numReps)
        console.error('Count value provided is greater than that of numReps')

    return (
        <div className="row">
            <div className={classes.cardContainer}>
                <Card className={classes.base}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Rep Counter
                        </Typography>
                        <LinearProgress 
                            variant="determinate"
                            value={currProgress(count)}
                            style={{marginTop:"5%", height:"6px", borderRadius:"5px"}}
                        />
                    </CardContent>
                </Card>
                <Card className={classes.supplementary} style={{
        backgroundColor: repResult?'#4caf50':'#f57c00'}}>
                    <CardContent style={{display:"flex"}}>
                        <Typography variant="h3" component="h3">
                            <sup>{count}</sup>/
                        </Typography>
                        <Typography variant="h5" component="h5" style={{marginTop:"35px", fontSize:"16px"}}>
                            <sub>{numReps}</sub>
                        </Typography>
                    </CardContent>
                </Card>
            </div>

            <br></br>
            <br></br>  

            <div className={classes.cardContainer}> 
                <Card className={classes.base}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Rep Counter
                        </Typography>
                        <div className={classes.dotContainer}>
                            {[...Array(numReps).keys()].map((x) => {
                                return ( ++x<=count ? 
                                <div key={++x} className={classes.completedRep} >
                                    <FiberManualRecordIcon style={{fill:'#4caf50'}}/>
                                </div> : 
                                <div key={++x} className={classes.incompletedRep}>
                                    <FiberManualRecordOutlinedIcon />
                                </div>
                                );
                            })}
                            
                        </div>
                    </CardContent>
                </Card>
                <Card className={classes.supplementary}>
                    <CardContent style={{display:"flex", alignItems:'center'}}>
                        <Typography variant="h3" component="h3">
                            <sup>{count}</sup>/
                        </Typography>
                        <Typography variant="h5" component="h5" style={{marginTop:"35px", fontSize:"16px"}}>
                            <sub>{numReps}</sub>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
            <br></br>
            <br></br>  

            <div className={classes.cardContainer}> 
                <Card className={classes.base}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Rep Counter
                        </Typography>
                        <div className={classes.dotContainer}>
                            {[...Array(numReps).keys()].map((x) => {
                                if(++x<=count) {
                                    return (
                                        <div key={++x} className={classes.completedRep} >
                                            <FiberManualRecordIcon style={{fill:'#4caf50'}}/>
                                        </div>
                                    );
                                }
                                if(x==count+1 && !repResult) {
                                    return (
                                        <div key={++x} className={classes.completedRep} >
                                            <FiberManualRecordIcon style={{fill:'#f57c00'}}/>
                                        </div>
                                    );
                                }
                                if(++x>count+1) {
                                    return (
                                        <div key={++x} className={classes.completedRep} >
                                            <FiberManualRecordOutlinedIcon />
                                        </div>
                                    );
                                }
                            })}
                            
                        </div>
                    </CardContent>
                </Card>
                <Card className={classes.supplementary}>
                    <CardContent style={{display:"flex", alignItems:'center'}}>
                        <Typography variant="h3" component="h3">
                            <sup>{count}</sup>/
                        </Typography>
                        <Typography variant="h5" component="h5" style={{marginTop:"35px", fontSize:"16px"}}>
                            <sub>{numReps}</sub>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}