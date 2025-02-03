import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL_BARCHART;
const BarChart = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(API_URL);
        const formattedData = [["Age", "Ammount"]];
        response.data.forEach((group) => {
          formattedData.push([
            `${group._id}-${parseInt(group._id) + 9}`,
            group.count,
          ]);
        });
        setUserData(formattedData);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    fetchUserData();
  }, []);

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

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
    >
      {userData.length > 1 ? (
        <Chart
          chartType="BarChart"
          width="80%"
          height="400px"
          data={userData}
          options={options}
        />
      ) : (
        <p>Carregando Gráfico...</p>
      )}
    </div>
  );
};

export default BarChart;
