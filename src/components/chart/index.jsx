import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { Chart } from "react-google-charts";
import axios from "axios";
import { Typography } from "@mui/material";

export default function Charts(props) {
  const [codeAnalysitc, setCodeAnalysitc] = useState({});

  function convertDataToChart(data) {
    var lst = [["code", "total_amount"]];
    for (var i = 0; i < data.length; i++) {
      lst.push([data[i].promo_code, data[i].TOTAL_AMOUNT]);
    }
    return lst;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/code-analysis/"
        );
        data = response.data.data;

        setCodeAnalysitc(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const dataChart = [
    {
      promo_code: "None",
      TOTAL_AMOUNT: 37884770000,
      PROMO_AMOUNT: 0,
      COUNT: 0,
      START_DAY: "2016-08-07T09:22:39.501036Z",
      END_DAY: "2022-07-31T23:16:43.885323Z",
    },
    {
      promo_code: "AZ2022",
      TOTAL_AMOUNT: 6675745000,
      PROMO_AMOUNT: 60119641,
      COUNT: 12005,
      START_DAY: "2016-08-08T06:25:24.341833Z",
      END_DAY: "2022-07-29T22:16:37.169906Z",
    },
    {
      promo_code: "BUYMORE",
      TOTAL_AMOUNT: 4962927000,
      PROMO_AMOUNT: 44486761,
      COUNT: 8942,
      START_DAY: "2016-08-08T03:46:50.958678Z",
      END_DAY: "2022-07-29T12:48:21.123459Z",
    },
  ];

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
          <Chart
            width={"100%"}
            height={"100%"}
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={convertDataToChart(dataChart)}
            options={{
              legend: { position: "bottom" },
            }}
            rootProps={{ "data-testid": "6" }}
            chartPackages={["corechart", "controls"]}
            render={({ renderChart }) => {
              return (
                <div
                  style={{
                    display: "flex",
                    height: "100%",
                    flexDirection: "column",
                  }}
                >
                  <div>{renderChart()}</div>
                </div>
              );
            }}
          />
        </Typography>
      </div>
    </div>
  );
}
