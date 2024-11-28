import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import { Chart } from "react-google-charts";
// function formatDateInfo(inputTime) {
//   const date = new Date(inputTime);
//   const today = new Date();
//   const yesterday = new Date(today);
//   yesterday.setDate(yesterday.getDate() - 1);

//   const isToday = date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
//   const isYesterday = date.getDate() === yesterday.getDate() && date.getMonth() === yesterday.getMonth() && date.getFullYear() === yesterday.getFullYear();

//   if (isToday) {
//       return `Hôm nay lúc ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
//   } else if (isYesterday) {
//       return `Hôm qua lúc ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
//   } else {
//       const day = date.getDate().toString().padStart(2, '0');
//       const month = (date.getMonth() + 1).toString().padStart(2, '0');
//       const year = date.getFullYear();
//       const hours = date.getHours().toString().padStart(2, '0');
//       const minutes = date.getMinutes().toString().padStart(2, '0');
//       return `${day}/${month}/${year} lúc ${hours}:${minutes}`;
//   }
//   return inputTime;
// }

// function formatTime(inputTime) {
//   const date = new Date(inputTime);

//   const hours = date.getHours().toString().padStart(2, "0");
//   const minutes = date.getMinutes().toString().padStart(2, "0");
//   const day = date.getDate().toString().padStart(2, "0");
//   const month = (date.getMonth() + 1).toString().padStart(2, "0");
//   const year = date.getFullYear();

//   return `${hours}:${minutes} ${day}/${month}/${year}`;
// }

const dataDefault = [
  {
    total_customers: 100,
    gender_distribution: "M",
    country_distribution: "None",
  },
  {
    total_customers: 200,
    gender_distribution: "F",
    country_distribution: "New",
  },
];

const dataDefault1 = Object.values(
  dataDefault.reduce(
    (
      result,
      { total_customers, gender_distribution, country_distribution }
    ) => {
      if (!result[country_distribution]) {
        result[country_distribution] = {
          country_distribution,
          maleTotal: 0,
          femaleTotal: 0,
        };
      }

      if (gender_distribution === "M") {
        result[country_distribution].maleTotal += total_customers;
      } else if (gender_distribution === "F") {
        result[country_distribution].femaleTotal += total_customers;
      }

      return result;
    },
    {}
  )
);

const dataDefault2 = [
  {
    month: 1,
    search_keywords: "None",
    search_count: 100,
  },
  {
    month: 2,
    search_keywords: "None",
    search_count: 100,
  },
];

export default function LastValues(props) {
  const [customerAnalysitc, setCustomerAnalysitc] = useState(dataDefault1);
  const [keywordAnalysitc, setKeywordAnalysitc] = useState(dataDefault2);
  // const [successAnalysitc, setSuccessAnalysitc] = useState([{}]);

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
        const urls = [
          "http://localhost:8000/customer-analysis/",
          "http://localhost:8000/keyword-analysis/",
          // "http://localhost:8000/success-analysis/",
        ];
        const responses = await Promise.all(urls.map((url) => axios.get(url)));

        var data_customer_analysis = responses[0].data;
        var data_keyword_analysis = responses[1].data;
        // var data_success_analysis = responses[2].data;
        const transformedData = Object.values(
          data_customer_analysis.reduce(
            (
              result,
              { total_customers, gender_distribution, country_distribution }
            ) => {
              if (!result[country_distribution]) {
                result[country_distribution] = {
                  country_distribution,
                  maleTotal: 0,
                  femaleTotal: 0,
                };
              }

              if (gender_distribution === "M") {
                result[country_distribution].maleTotal += total_customers;
              } else if (gender_distribution === "F") {
                result[country_distribution].femaleTotal += total_customers;
              }

              return result;
            },
            {}
          )
        );
        console.log(data_keyword_analysis);
        setCustomerAnalysitc(transformedData);
        setKeywordAnalysitc(data_keyword_analysis);
        // setSuccessAnalysitc(data_success_analysis);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

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
                <Chart
                  chartType="PieChart"
                  data={convertDataToChart(
                    keywordAnalysitc,
                    ["search_count"],
                    "search_keywords"
                  )}
                  options={{
                    title: "Từ khóa nổi bật",
                  }}
                  width={"100%"}
                  height={"400px"}
                />
              </Typography>
            </div>
          </div>
          <div className="col-span-1 bg-white h-[570px]">
            <Typography variant="h5" className="!font-extrabold ps-8 pt-4 ">
              Phân nhóm khách hàng
              <Chart
                width={"100%"}
                height={"100%"}
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={convertDataToChart(
                  customerAnalysitc,
                  ["maleTotal", "femaleTotal"],
                  "country_distribution"
                )}
                options={{
                  legend: { position: "bottom" },
                  title:
                    "Biểu đồ phân bổ giới tính khách hàng theo từng quốc gia",
                  vAxis: { title: "Quốc gia" },
                  bar: { groupWidth: "50%" },
                }}
              />
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
