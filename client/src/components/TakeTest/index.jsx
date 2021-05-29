import React, { useState, useEffect } from "react";
import Posenet from "react-posenet";
import { useParams } from "react-router";
import * as settings from "../../settings";
import axios from "axios";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import swal from "sweetalert2";

import "./index.scss";
import RepCounter from "../RepCounter";
import { Button, Typography } from "@material-ui/core";

function Timer({ duration, onComplete, play, k }) {
  return (
    <CountdownCircleTimer
      key={k}
      isPlaying={play}
      duration={duration}
      colors={[
        ["#004777", 0.33],
        ["#F7B801", 0.33],
        ["#A30000", 0.33],
      ]}
      onComplete={onComplete}
    >
      {({ remainingTime }) => <h1>{remainingTime}</h1>}
    </CountdownCircleTimer>
  );
}

export const TakeTest = () => {
  const { tid } = useParams();
  const [testData, setTestData] = useState();

  const [currRep, setRep] = useState(0);
  const [start, setStart] = useState(false);
  const [ready, setReady] = useState(false);
  const [countType, setCountType] = useState("Rest");
  const [k, setK] = useState(0);
  useEffect(() => {
    getTestsDetails();
  }, [tid]);

  useEffect(() => {
    const d = new Date();
    const kt = d.getTime().toString();
    setK(kt);
    console.log(kt);
  }, [ready]);

  const handleReps = () => {
    const cr = currRep + 1;
    if (cr < testData?.reps) {
      setReady(!ready);
    }
    setRep(cr);
  };

  const getTestsDetails = async () => {
    try {
      const res = await axios.get(
        `${settings.API_SERVER}/api/auth/getTests?tid=${tid}`,
        { withCredentials: true }
      );
      const td = res.data[0];
      setTestData(td);
      console.log(td);

      swal.fire({
        title: `Test Details`,
        text: td.test_description,
        icon: "info",
        confirmButtonText: "Continue",
        backdrop: true,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {testData ? (
        <div className={"tp-take_test"}>
          <div className={"left"}>
            <Typography variant="h3" align="center">
              {testData?.test_name}
            </Typography>
            <div className={"counter"}>
              <Typography
                variant="h5"
                color={!ready ? "textPrimary" : "primary"}
              >
                {!ready ? "Get Ready" : "Just do it"}
              </Typography>
              <Timer
                k={k}
                duration={!ready ? 5 : testData?.time_per_rep}
                play={start}
                onComplete={() => handleReps()}
              />
            </div>
            <RepCounter numReps={testData?.reps} count={currRep} />
            <div className={"starter"}>
              <Button
                variant="contained"
                color="primary"
                disabled={start}
                onClick={() => {
                  setReady(true);
                  setStart(true);
                }}
              >
                Start
              </Button>
            </div>
          </div>
          <div className={"right"}>
            <Posenet />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};
