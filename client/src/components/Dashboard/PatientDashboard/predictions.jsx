import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Title from "./title";
import axios from "axios";
import * as settings from "../../../settings";

export default function Predictions() {
  useEffect(() => {
    getPrediction();
  }, []);

  const [p, setP] = useState(`--`);

  const getPrediction = async () => {
    try {
      const res = await axios.get(
        `${settings.API_SERVER}/api/auth/getPrediction`,
        { withCredentials: true }
      );

      if (res.status === 204) setP("Not enough data");
      if (res.status === 200) setP(`${res.data} days`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <React.Fragment>
      <Title>Expected Recovery</Title>
      <br />
      <br />
      <Typography component="p" variant="h4" align="center">
        {p}
      </Typography>
    </React.Fragment>
  );
}
