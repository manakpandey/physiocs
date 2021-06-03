import React, { useEffect, useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import Title from "./title";
import * as settings from "../../../settings";
import axios from "axios";
import _ from "lodash";

export default function Chart() {
  const theme = useTheme();

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
      const d = _.forEach(_.sortBy(res.data, "timestamp"), function (c) {
        const da = new Date(c.timestamp);
        c["timestamp"] = da.toLocaleString();
        return c;
      });

      setData(d);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <React.Fragment>
      <Title>Pain Trend</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="timestamp" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
            >
              Pain Level
            </Label>
          </YAxis>
          <Line
            type="monotone"
            dataKey="feedback_state"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
