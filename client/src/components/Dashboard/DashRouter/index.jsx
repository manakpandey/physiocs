import axios from "axios";
import React, { useEffect, useState } from "react";
import * as settings from "../../../settings";
import PatientDashboard from "../../Profile/Profile";
import PhysioDashboard from "../PhysioDashboard";

export default function DashRouter() {
  useEffect(() => {
    getUser();
  });

  const [userType, setUserType] = useState();

  const getUser = async () => {
    try {
      const res = await axios.get(`${settings.API_SERVER}/api/auth/getUser`, {
        withCredentials: true,
      });
      const user = res.data;
      setUserType(user[0].usertype);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {userType == 0 ? (
        <PatientDashboard />
      ) : userType == 1 ? (
        <PhysioDashboard />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
