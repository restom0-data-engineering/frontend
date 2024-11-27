import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LastValues from "../../components/lastValues";
import PumpInfo from "../../components/pumpInfo";
import History from "../../components/history";
import axios from "axios";
import axiosInstance from "../../config/axiosConfig";
export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // useEffect(() => {
  //     const fetchApiData = async () => {
  // 		try {
  // 			if (!localStorage.getItem('sessionID')){
  // 				navigate('/login');
  // 			}
  // 			setLoading(false);
  //         } catch (error) {
  //             console.error("Error fetching data:", error);
  //         }
  //     };
  //     fetchApiData();
  // }, [navigate]);
  // useEffect(() => {
  //   const fetchApiData = async () => {
  //     try {
  //       const request = await axiosInstance.get("/keyword-analysis");
  //       console.log(request.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  // }, []);
  return (
    <div>
      {loading ? (
        <div></div>
      ) : (
        <div className="mt-10 w-full gap-[20px]">
          <LastValues />
          {/* <div>
            <PumpInfo />
            <br></br>
            <History />
          </div> */}
        </div>
      )}
    </div>
  );
}
