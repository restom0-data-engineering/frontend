import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { Chart } from "react-google-charts";
import axios from "axios";
import { Typography } from "@mui/material";

function toDate(str) {
  return new Date(str);
}

export default function Charts(props) {
  // const [sessionID, setSessionID] = useState(props.api_token);
  // const [tempLoading, setTempLoading] = useState(true);
  // const [lightLoading, setLightLoading] = useState(true);
  // const [humidLoading, setHumidLoading] = useState(true);
  // const [moistureLoading, setMoistureLoading] = useState(true);
  // const [EDLoading, setEDLoading] = useState(true);
  // const [processedTemp, setProcessedTemp] = useState([[{ type: "date", label: "time" }, "°C"]]);
  // const [processedLight, setProcessedLight] = useState([[{ type: "date", label: "time" }, "lux"]]);
  // const [processedHumid, setProcessedHumid] = useState([[{ type: "date", label: "time" }, "%"]]);
  // const [processedMoisture, setProcessedMoisture] = useState([[{ type: "date", label: "time" }, "%"]]);
  // const [processedED, setProcessedED] = useState([[{ type: "date", label: "time" }, ""]]);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const config = {
  //           headers: {
  //             Authorization: "Bearer " + sessionID,
  //           },
  //         };
  //         const tempResponse = await axios.get(
  //           `http://localhost:3001/sensors/chart/temp`,
  //           config
  //         );
  //         setProcessedTemp(
  //           processedTemp.concat(
  //             tempResponse.data.data.map(({ _id, userID, data, Date }) => {
  //               return [toDate(Date), parseFloat(data)];
  //             })
  //           )
  //         );
  //         setTempLoading(false);

  //         const lightResponse = await axios.get(
  //           `http://localhost:3001/sensors/chart/light`,
  //           config
  //         );
  //         setProcessedLight(
  //           processedLight.concat(
  //             lightResponse.data.data.map(({ _id, userID, data, Date }) => {
  //               return [toDate(Date), parseFloat(data)];
  //             })
  //           )
  //         );
  //         setLightLoading(false);

  //         const humidResponse = await axios.get(
  //           `http://localhost:3001/sensors/chart/humid`,
  //           config
  //         );
  //         setProcessedHumid(
  //           processedHumid.concat(
  //             humidResponse.data.data.map(({ _id, userID, data, Date }) => {
  //               return [toDate(Date), parseFloat(data)];
  //             })
  //           )
  //         );
  //         setHumidLoading(false);

  //         const moistureResponse = await axios.get(
  //           `http://localhost:3001/sensors/chart/moisture`,
  //           config
  //         );
  //         setProcessedMoisture(
  //           processedMoisture.concat(
  //             moistureResponse.data.data.map(({ _id, userID, data, Date }) => {
  //               return [toDate(Date), parseFloat(data)];
  //             })
  //           )
  //         );
  //         setMoistureLoading(false);

  //         const EDResponse = await axios.get(
  //           `http://localhost:3001/sensors/chart/ed`,
  //           config
  //         );
  //         setProcessedED(
  //           processedED.concat(
  //             EDResponse.data.data.map(({ _id, userID, data, Date }) => {
  //               return [toDate(Date), parseFloat(data)];
  //             })
  //           )
  //         );
  //         setEDLoading(false);
  //       } catch (error) {
  //         if (error.response.status == 403 || error.response.status == 401) {
  //           alert("Error: " + error.response.data.message);
  //           navigate("/login");
  //         } else {
  //           alert("Error: " + error.response.data.error);
  //           console.error("Error fetching data:", error);
  //         }
  //       }
  //     };
  //     fetchData();
  //     const intervalId = setInterval(fetchData, 10 * 1000);

  //     return () => clearInterval(intervalId);
  //   }, []);

  return (
    <div className="grid grid-cols-2 gap-[20px]">
      <div className="rounded-lg bg-white mb-4 h-[625px]">
        <Typography variant="h5" className="!font-extrabold ps-8 pt-4 ">
          Chi tiết phân khúc người dùng
        </Typography>
      </div>
      <div className="rounded-lg bg-white mb-4 h-[625px]">
        <Typography variant="h5" className="!font-extrabold ps-8 pt-4 ">
          Báo cáo doanh thu
        </Typography>
      </div>
    </div>
  );
}
