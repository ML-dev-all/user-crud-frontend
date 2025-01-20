import React from "react";
import { Chart } from "react-google-charts";

const data = [
  ["Age", "Ammount"],
  ["20-29", 5],
  ["30-39", 3],
  ["40-49", 2],
  ["50-59", 1],
];

const options = {
  title: "Age Distribution",
  colors: ["#1b9e77"],
  hAxis: {
    title: "Ammount",
  },
  vAxis: {
    title: "Age",
  },
  legend: { position: "none" },
};

const BarChart = () => {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
    >
      <Chart
        chartType="BarChart"
        width="80%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
};

export default BarChart;
