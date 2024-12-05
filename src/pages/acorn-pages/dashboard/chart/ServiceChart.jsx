import React, { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080";

// apexcharts 라이브러리 : npm install react-apexcharts
import ReactApexChart from "react-apexcharts"; 

import "styles/charts/ServiceChart.css"
import { barOptions, colors } from "./BarOptions.js"

const ServiceChart = () => {
  // 상태변수로 차트 입력 데이터 series, options 선언
  const [chartData, setChartData] = useState({ series:[], options:{} });

  useEffect(() => {
    /* async ~ await -> await 키워드 이중 처리 */
    (async () => {
      try {
        const response = await (await (axios.get("/dashboard/service/chart"))).data;
        /* 서버로부터 전달받은 데이터 series 변수에 치환, 차트설정 외부 파일 불러와서 치환 */
        setChartData({ series: response, options: barOptions });
      } catch (error) {
        console.log("error : ", error);
      }
    })();
  }, []);

  return (
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        colors={colors}
        type="bar"
        // width="500"
        height={500}
      />
  );
};

export default ServiceChart;