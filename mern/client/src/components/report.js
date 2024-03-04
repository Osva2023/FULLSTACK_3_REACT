import 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { fetchReportData } from "./GetReports";

export default function ReportBar() {
  const [reportData, setReportData] = useState({ agent_bar_data: [], transaction_line_data: [] });
  // Supongamos que tienes un array de objetos con los datos de transacciones
  useEffect(() => {
  const fetchData = async () => {
    console.log ("Fetching data...");                                     // debugging purposes
      const data = await fetchReportData();
      if (data) {
          setReportData(data);
          console.log(data);
          
      }
    };
    fetchData();
  }, []);

  // Configura los datos para el gráfico de barras
  const agents = reportData.agent_bar_data ? reportData.agent_bar_data.map((item) => item[0]) : [];
  const amounts = reportData.agent_bar_data ? reportData.agent_bar_data.map((item) => item[1]) : [];

  const barData = {
    labels: agents,
    datasets: [
      {
        label: "Total transactions for Agent",
        data: amounts,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const dates = reportData.transaction_line_data ? reportData.transaction_line_data.map((item) => item[0]) : [];
  const montos = reportData.transaction_line_data ? reportData.transaction_line_data.map((item) => item[1]) : [];
   console.log(dates);
    console.log(montos);


  const lineData = {
    labels: dates,
    datasets: [
      {
        label: "Total transactions by Date",
        data: montos,
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        pointRadius: 4,
        pointBorderWidht: 2,
        pointHoverRadius: 6,
      },
    ],
  };
  const lineOptions = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
        },
        title: {
          display: true,
          text: 'Fechas',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Total de Transacciones',
        },
      },
    },
  };

  return (
    <div>
      <h1>Reports</h1>
  
      {/* Bar Chart */}
      <div style={{ border: '1px solid black', width: '50%', margin: 'auto' }}>
        <h2>Bar Chart</h2>
        <Bar data={barData} options={barOptions} />
      </div>
  
      {/* Line Chart */}
      <div style={{ border: '1px solid black', width: '50%', margin: 'auto', marginTop: '20px' }}>
        <h2>Line Chart</h2>
        <Line data={lineData} options={lineOptions} />
      </div>
    </div>
  );
}


