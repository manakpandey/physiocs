import React, { useState, useEffect } from "react";
import Posenet from "react-posenet";
import { useHistory, useParams } from "react-router";
import * as settings from "../../settings";
import axios from "axios";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import swal from "sweetalert2";

import "./index.scss";
import RepCounter from "../RepCounter";
import { Button, Typography } from "@material-ui/core";
import { checkJoints } from "../../utils/getAngles";
import { checkAngleWithinLimits } from "../../utils/checkRep";
import FeedbackScale from "../FeedbackScale";

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
  const [finished, setFinished] = useState(false);
  const [currRepVerified, setCurrRepVerification] = useState([]);
  const [minA, setMinA] = useState(360);
  const [maxA, setMaxA] = useState(-1);
  const [range, setRange] = useState([]);

  const [feedback, setFeedback] = useState();

  const [k, setK] = useState(0);
  useEffect(() => {
    getTestsDetails();
  }, [tid]);

  useEffect(() => {
    const d = new Date();
    const kt = d.getTime().toString();
    setK(kt);
  }, [ready]);

  const handleReps = () => {
    if (ready) {
      const cr = currRep + 1;
      setRep(cr);
    }
    setReady(!ready);
  };

  useEffect(() => {
    const rang = range;
    rang.push(maxA - minA);
    console.log(rang);
    console.log('min angle ',minA);
    console.log('max angle ' ,maxA);
    console.log('is max rep verified? ', checkAngleWithinLimits(maxA, testData?.max_angle));
    console.log('is min rep verified? ', checkAngleWithinLimits(minA, testData?.min_angle));
    if(checkAngleWithinLimits(maxA, testData?.max_angle) && checkAngleWithinLimits(minA, testData?.min_angle)) {
      currRepVerified.push(1);
    } else currRepVerified.push(0);
    setMinA(360);
    setMaxA(-1);
    setRange(rang);

    if (currRep == testData?.reps) setFinished(true);
  }, [currRep]);

  useEffect(() => {
    if (finished) submit();
    console.log(currRepVerified);
  }, [feedback]);
  const history = useHistory();
  const submit = async () => {
    try {
      let rg = 0;
      for (let i = 1; i < range.length; i++) {
        rg += range[i];
      }
      rg /= range.length - 1;

      const fd = new FormData();
      fd.append("tid", testData?.id);
      fd.append("range", rg);
      fd.append("feedback", feedback);

      console.log(rg, range);
      console.log('form data is below')
      for (var pair of fd.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      console.log('is av rep verified? ', checkAngleWithinLimits(rg, testData?.max_angle));
      await axios.post(`${settings.API_SERVER}/api/auth/saveUserTest`, fd, {
        withCredentials: true,
      });
      history.push("/");
    } catch (e) {
      console.log(e);
    }
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

  const handlePose = (poses) => {
    if (!ready) return;

    const cj = checkJoints(poses[0]);
    const ang = cj[testData["joint_name"]];

    if (ang !== -1) setMinA(Math.min(ang, minA));
    setMaxA(Math.max(ang, maxA));
  };

  return (
    <>
      {!finished ? (
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
                <RepCounter numReps={testData?.reps} repResult={currRepVerified} count={currRep} />
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
                <Posenet
                  onEstimate={handlePose}
                  inferenceConfig={{ decodingMethod: "single-person" }}
                />
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </>
      ) : (
        <FeedbackScale clickMe={(f) => setFeedback(f)} />
      )}
    </>
  );
};
