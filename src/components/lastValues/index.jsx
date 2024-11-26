import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CircularProgress, TextField } from "@mui/material";
import TemperatureCelsiusGood from "../../assets/images/temperature-celsius-good.svg";
import TemperatureCelsiusWarning from "../../assets/images/temperature-celsius-warning.svg";
import LightIntensityGood from "../../assets/images/light-intensity-good.svg";
import LightIntensityWarning from "../../assets/images/light-intensity-warning.svg";
import SoilMoistureWarning from "../../assets/images/soil-moisture-warning.svg";
import SoilMoistureGood from "../../assets/images/soil-moisture-good.svg";
import AirHumidityWarning from "../../assets/images/air-humidity-warning.svg";
import AirHumidityGood from "../../assets/images/air-humidity-good.svg";
import { Typography } from "@mui/material";
function formatDateInfo(inputTime) {
  // const date = new Date(inputTime);
  // const today = new Date();
  // const yesterday = new Date(today);
  // yesterday.setDate(yesterday.getDate() - 1);

  // const isToday = date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  // const isYesterday = date.getDate() === yesterday.getDate() && date.getMonth() === yesterday.getMonth() && date.getFullYear() === yesterday.getFullYear();

  // if (isToday) {
  //     return `Hôm nay lúc ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  // } else if (isYesterday) {
  //     return `Hôm qua lúc ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  // } else {
  //     const day = date.getDate().toString().padStart(2, '0');
  //     const month = (date.getMonth() + 1).toString().padStart(2, '0');
  //     const year = date.getFullYear();
  //     const hours = date.getHours().toString().padStart(2, '0');
  //     const minutes = date.getMinutes().toString().padStart(2, '0');
  //     return `${day}/${month}/${year} lúc ${hours}:${minutes}`;
  // }
  return inputTime;
}

function formatTime(inputTime) {
  const date = new Date(inputTime);

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${hours}:${minutes} ${day}/${month}/${year}`;
}

export default function LastValues(props) {
  const [tempInfo, setTempInfo] = useState(null);
  const [lightInfo, setLightInfo] = useState(null);
  const [humidInfo, setHumidInfo] = useState(null);
  const [moistureInfo, setMoistureInfo] = useState(null);
  const [tempLoading, setTempLoading] = useState(false);
  const [lightLoading, setLightLoading] = useState(false);
  const [humidLoading, setHumidLoading] = useState(false);
  const [moistureLoading, setMoistureLoading] = useState(false);
  const [EDLoading, setEDLoading] = useState(true);
  const navigate = useNavigate();
  // const [sessionID, setSessionID] = useState(props.api_token);

  // useEffect(() => {
  //   const fetchApiData = async () => {
  //     try {
  //       const config = {
  //         headers: {
  //           Authorization: "Bearer " + sessionID,
  //         },
  //       };
  //       const tempResponse = await axios.get(
  //         `http://localhost:3001/sensors/temp`,
  //         config
  //       );
  //       const lightResponse = await axios.get(
  //         `http://localhost:3001/sensors/light`,
  //         config
  //       );
  //       const humidResponse = await axios.get(
  //         `http://localhost:3001/sensors/humid`,
  //         config
  //       );
  //       const moistureResponse = await axios.get(
  //         `http://localhost:3001/sensors/moisture`,
  //         config
  //       );
  //       setTempInfo({
  //         value: parseFloat(tempResponse.data.data.value),
  //         time: formatTime(tempResponse.data.data.created_at),
  //         lowerThreshold: tempResponse.data.lower,
  //         upperThreshold: tempResponse.data.upper,
  //         needNoti: tempResponse.data.needNoti,
  //       });
  //       setTempLoading(false);
  //       setLightInfo({
  //         value: parseFloat(lightResponse.data.data.value),
  //         valuePercent: (lightResponse.data.data.value * 100) / 10000,
  //         time: formatTime(lightResponse.data.data.created_at),
  //         lowerThreshold: lightResponse.data.lower,
  //         upperThreshold: lightResponse.data.upper,
  //         lowerThresholdPercent: (lightResponse.data.lower * 100) / 10000,
  //         upperThresholdPercent: (lightResponse.data.upper * 100) / 10000,
  //         needNoti: lightResponse.data.needNoti,
  //       });
  //       setLightLoading(false);
  //       setHumidInfo({
  //         value: parseFloat(humidResponse.data.data.value),
  //         time: formatTime(humidResponse.data.data.created_at),
  //         lowerThreshold: humidResponse.data.lower,
  //         upperThreshold: humidResponse.data.upper,
  //         needNoti: humidResponse.data.needNoti,
  //       });
  //       setHumidLoading(false);
  //       setMoistureInfo({
  //         value: parseFloat(moistureResponse.data.data.value),
  //         time: formatTime(moistureResponse.data.data.created_at),
  //         lowerThreshold: moistureResponse.data.lower,
  //         upperThreshold: moistureResponse.data.upper,
  //         needNoti: moistureResponse.data.needNoti,
  //       });
  //       setMoistureLoading(false);
  //     } catch (error) {
  //       if (error.response.status == 403 || error.response.status == 401) {
  //         alert("Error: " + error.response.data.message);
  //         navigate("/login");
  //       } else {
  //         alert("Error: " + error.response.data.error);
  //         console.error("Error fetching data:", error);
  //       }
  //     }
  //   };

  //   const fetchEDApiData = async () => {
  //     try {
  //       const config = {
  //         headers: {
  //           Authorization: "Bearer " + sessionID,
  //         },
  //       };
  //       const EDResponse = await axios.get(
  //         `http://localhost:3001/sensors/ed`,
  //         config
  //       );
  //       setEDLoading(false);
  //     } catch (error) {
  //       if (error.response.status == 403 || error.response.status == 401) {
  //         alert("Error: " + error.response.data.message);
  //         navigate("/login");
  //       } else {
  //         alert("Error: " + error.response.data.error);
  //         console.error("Error fetching data:", error);
  //       }
  //     }
  //   };

  //   fetchApiData();
  //   fetchEDApiData();
  //   const otherIntervalId = setInterval(fetchApiData, 10 * 1000);
  //   const EDintervalId = setInterval(fetchEDApiData, 10 * 1000);

  //   return () => {
  //     clearInterval(otherIntervalId);
  //     clearInterval(EDintervalId);
  //   };
  // }, []);

  // function handleKeyDown(e, sensor) {
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //     const updateThreshold = async () => {
  //       try {
  //         const config = {
  //           headers: {
  //             Authorization: "Bearer " + sessionID,
  //           },
  //         };
  //         var lower, upper, api_url;

  //         if (sensor == "temp") {
  //           setTempLoading(true);
  //           lower = tempInfo.lowerThreshold;
  //           upper = tempInfo.upperThreshold;
  //         } else if (sensor == "light") {
  //           setLightLoading(true);
  //           lower = lightInfo.lowerThreshold;
  //           upper = lightInfo.upperThreshold;
  //         } else if (sensor == "humid") {
  //           setHumidLoading(true);
  //           lower = humidInfo.lowerThreshold;
  //           upper = humidInfo.upperThreshold;
  //         } else {
  //           setMoistureLoading(true);
  //           lower = moistureInfo.lowerThreshold;
  //           upper = moistureInfo.upperThreshold;
  //         }

  //         if (lower == "" && upper == "") {
  //           api_url = `http://localhost:3001/sensors/threshold/` + sensor + "?";
  //         } else if (lower == "") {
  //           api_url =
  //             `http://localhost:3001/sensors/threshold/` +
  //             sensor +
  //             "?upper=" +
  //             upper;
  //         } else if (upper == "") {
  //           api_url =
  //             `http://localhost:3001/sensors/threshold/` +
  //             sensor +
  //             "?lower=" +
  //             lower;
  //         } else {
  //           api_url =
  //             `http://localhost:3001/sensors/threshold/` +
  //             sensor +
  //             "?upper=" +
  //             upper +
  //             "&lower=" +
  //             lower;
  //         }

  //         await axios.put(api_url, {}, config);

  //         // if (sensor == 'temp') {
  //         //     setTempLoading(false);
  //         // }
  //         // else if (sensor == 'light') {
  //         //     setLightLoading(false);
  //         // }
  //         // else if (sensor == 'humid') {
  //         //     setHumidLoading(false);
  //         // }
  //         // else {
  //         //     setMoistureLoading(false);
  //         // }
  //       } catch (error) {
  //         if (error.response.status == 403 || error.response.status == 401) {
  //           alert("Error: " + error.response.data.message);
  //           navigate("/login");
  //         } else {
  //           alert("Error: " + error.response.data.error);
  //           console.error("Error fetching data:", error);
  //         }
  //       }
  //       // } finally {
  //       //     if (sensor == 'temp') {
  //       //         setTempLoading(false);
  //       //     }
  //       //     else if (sensor == 'light') {
  //       //         setLightLoading(false);
  //       //     }
  //       //     else if (sensor == 'humid') {
  //       //         setHumidLoading(false);
  //       //     }
  //       //     else {
  //       //         setMoistureLoading(false);
  //       //     }
  //       // }
  //     };

  //     updateThreshold();
  //   }
  // }

  return (
    <div>
      <div>
        <div className="grid grid-cols-2 gap-[20px] w-full">
          <div>
            <div className="col-span-1 bg-white h-[275px] mb-[20px]">
              <Typography variant="h5" className="!font-extrabold ps-8 pt-4 ">
                Báo cáo doanh thu
              </Typography>
            </div>
            <div className="col-span-1 bg-white h-[275px]">
              <Typography variant="h5" className="!font-extrabold ps-8 pt-4">
                Từ khóa nổi bật
              </Typography>
            </div>
          </div>
          <div className="col-span-1 bg-white h-[570px]">
            <Typography variant="h5" className="!font-extrabold ps-8 pt-4 ">
              Phân nhóm khách hàng
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
