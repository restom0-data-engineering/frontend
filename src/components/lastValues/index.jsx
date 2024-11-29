import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import { Chart } from "react-google-charts";

const dataDefault1 = {
  total_customers: 100,
  gender_distribution: { F: 32548, M: 18157 },
  country_distribution: { "Jakarta Raya": 9389, "Jawa Barat": 5781 },
};

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

const dataDefault3 = {
  most_sold_products: {
    1: 10,
    2: 6,
    3: 2,
  },
  total_revenue_by_product: {
    1: 450,
    2: 900,
    3: 100,
  },
};

export default function LastValues(props) {
  const [customerAnalysitc, setCustomerAnalysitc] = useState(dataDefault1);
  const [keywordAnalysitc, setKeywordAnalysitc] = useState(dataDefault2);
  const [productAnalysitc, setProductAnalysitc] = useState(dataDefault3);

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

  function convertproductAnalysitcToChart(data) {
    const most_sold_products = Object.entries(data.most_sold_products);
    const total_revenue_by_product = Object.entries(
      data.total_revenue_by_product
    );
    most_sold_products.unshift(["product_id", "quality"]);
    total_revenue_by_product.unshift(["product_id", "total_revenue"]);
    const lst = [most_sold_products, total_revenue_by_product];
    return lst;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urls = [
          "http://localhost:8000/customer-analysis/",
          "http://localhost:8000/keyword-analysis/",
          "http://localhost:8000/product-analysis/",
        ];
        const responses = await Promise.all(urls.map((url) => axios.get(url)));

        var data_customer_analysis = responses[0].data;
        var data_keyword_analysis = responses[1].data;
        var data_product_analysis = responses[2].data;
        const transform_data = convertDataToChart(
          data_keyword_analysis.search_keywords,
          ["month", "search_count"],
          "search_keywords"
        );
        setCustomerAnalysitc(data_customer_analysis);
        setKeywordAnalysitc(transform_data);
        setProductAnalysitc(data_product_analysis);
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
            <div className="col-span-1 bg-white h-[475px] mb-[20px]">
              <Typography variant="h5" className="!font-extrabold ps-8 pt-4 ">
                Báo cáo doanh thu
                <Chart
                  width={"100%"}
                  height={"100%"}
                  chartType="BarChart"
                  loader={<div>Loading Chart</div>}
                  data={convertproductAnalysitcToChart(productAnalysitc)[0]}
                  options={{
                    legend: { position: "bottom" },
                    title: "Biểu đồ sản phẩm bán chạy nhất",
                    vAxis: { title: "id sản phẩm" },
                    bar: { groupWidth: "50%" },
                  }}
                />
                <Chart
                  width={"100%"}
                  height={"100%"}
                  chartType="BarChart"
                  loader={<div>Loading Chart</div>}
                  data={convertproductAnalysitcToChart(productAnalysitc)[1]}
                  options={{
                    legend: { position: "bottom" },
                    title: "Biểu đồ doanh thu sản phẩm bán nhiều nhất",
                    vAxis: { title: "id sản phẩm" },
                    bar: { groupWidth: "50%" },
                  }}
                />
              </Typography>
            </div>
            <div className="col-span-1 bg-white h-[475px]">
              <Typography variant="h5" className="!font-extrabold ps-8 pt-4">
                Từ khóa nổi bật
                <Chart
                  width={450}
                  height={300}
                  chartType="PieChart"
                  loader={<div>Loading Chart</div>}
                  data={keywordAnalysitc}
                  options={{
                    legend: "none",
                    chartArea: { left: 15, top: 15, right: 0, bottom: 0 },
                    pieSliceText: "label",
                  }}
                  rootProps={{ "data-testid": "1" }}
                  chartWrapperParams={{ view: { columns: [0, 2] } }}
                  chartPackages={["corechart", "controls"]}
                  render={({ renderControl, renderChart }) => {
                    return (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <div style={{ width: "100%", paddingTop: 10 }}>
                          <div
                            style={{
                              height: 75,
                              border: "solid 1px #ccc",
                              padding: 10,
                              paddingTop: 20,
                              marginTop: 10,
                              fontSize: "20px",
                            }}
                          >
                            {renderControl(
                              ({ controlProp }) =>
                                controlProp.controlID === "select-month"
                            )}
                          </div>
                        </div>
                        <div style={{ width: "50%" }}>{renderChart()}</div>
                      </div>
                    );
                  }}
                  controls={[
                    {
                      controlType: "CategoryFilter",
                      controlID: "select-month",
                      options: {
                        filterColumnIndex: 1,
                        ui: {
                          labelStacking: "horizontal", // | "vertical"
                          label: "Filter Month",
                          allowTyping: false,
                          allowMultiple: false,
                        },
                      },
                    },
                  ]}
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
                data={[
                  ["country", "total"],
                  ...Object.entries(customerAnalysitc.country_distribution),
                ]}
                options={{
                  legend: { position: "bottom" },
                  title: "Biểu đồ phân bổ khách hàng theo từng quốc gia",
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
