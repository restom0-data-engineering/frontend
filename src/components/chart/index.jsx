import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";
import { Typography } from "@mui/material";

const dataDefault = [
  {
    promo_code: "None",
    TOTAL_AMOUNT: 0,
    PROMO_AMOUNT: 0,
    COUNT: 0,
    START_DAY: "2016-08-07T09:22:39.501036Z",
    END_DAY: "2022-07-31T23:16:43.885323Z",
  },
];

export default function Charts(props) {
  const [codeAnalysitc, setCodeAnalysitc] = useState(dataDefault);

  function convertDataToChart(data, xAxis, yAxis) {
    var temp = [yAxis];
    temp = temp.concat(xAxis);
    var lst = [temp];
    for (var i = 0; i < data.length; i++) {
      temp = [data[i][yAxis]];
      xAxis.map((item) => {
        temp.push(data[i][item]);
      });
      lst.push(temp);
    }
    return lst;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/code-analysis/"
        );
        var data = response.data;
        setCodeAnalysitc(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-[20px]">
      <div className="rounded-lg bg-white mb-4 h-[700px]">
        <Typography variant="h5" className="!font-extrabold ps-8 pt-4 ">
          Chi tiết phân khúc người dùng
        </Typography>
      </div>
      <div className="rounded-lg bg-white mb-4 h-[700px]">
        <Typography variant="h5" className="!font-extrabold ps-8 pt-4 ">
          Báo cáo tình trạng sử dụng mã khuyến mãi
          <Chart
            width={"100%"}
            height={"100%"}
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={convertDataToChart(
              codeAnalysitc,
              ["TOTAL_AMOUNT"],
              "promo_code"
            )}
            options={{
              legend: { position: "bottom" },
              title: "Biểu đồ tổng giá trị đơn hàng có mã khuyến mãi",
              vAxis: { title: "Mã khuyến mãi" },
              bar: { groupWidth: "50%" },
            }}
          />
          <Chart
            width={"100%"}
            height={"100%"}
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={convertDataToChart(
              codeAnalysitc,
              ["PROMO_AMOUNT"],
              "promo_code"
            )}
            options={{
              legend: { position: "bottom" },
              title: "Biểu đồ tổng giá trị đơn hàng có mã khuyến mãi",
              vAxis: { title: "Mã khuyến mãi" },
              bar: { groupWidth: "50%" },
            }}
          />
          <Chart
            width={"100%"}
            height={"100%"}
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={convertDataToChart(codeAnalysitc, ["COUNT"], "promo_code")}
            options={{
              legend: { position: "bottom" },
              title: "Biểu đồ tổng giá trị đơn hàng có mã khuyến mãi",
              vAxis: { title: "Mã khuyến mãi" },
              bar: { groupWidth: "50%" },
            }}
          />
        </Typography>
      </div>
    </div>
  );
}
