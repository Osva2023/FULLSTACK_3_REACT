import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { fetchReportData } from "./GetReports";

export default function ReportBar() {
    const [reportData, setReportData] = useState([]);
  // Supongamos que tienes un array de objetos con los datos de transacciones
  useEffect(() => {
  const fetchData = async () => {
      const data = await fetchReportData();
      if (data) {
          setReportData(data);
          console.log(data);
          
      }
    };
    fetchData();
  }, []);

  // Configura los datos para el gráfico de barras
  const agents = reportData.agent_bar_data.map((item) => item.agent_name);
  const amounts = reportData.agent_bar_data.map((item) => item.total_amount);

  const barData = {
    labels: agents,
    datasets: [
      {
        label: "Total de Transacciones por Agente",
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
   const dates = reportData.transaction_line_data.map((item) => item.date);
   const montos = reportData.transaction_line_data.map((item) => item.total_amount);
   console.log(dates);
    console.log(montos);


  const lineData = {
    labels: dates,
    datasets: [
      {
        label: "Total de Transacciones por Fecha",
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
        type: "time",
        time: {
          unit: "day",
        },
        title: {
          display: true,
          text: "Fechas",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Total de Transacciones",
        },
      },
    },
  };

  return (
    <div>
      <h1>Reports</h1>

      {/* Gráfico de Barras */}
      <div>
        <h2>Gráfico de Barras</h2>
        <Bar data={barData} options={barOptions} />
      </div>

      {/* Gráfico de Líneas */}
      <div>
        <h2>Gráfico de Líneas</h2>
        <Line data={lineData} options={lineOptions} />
      </div>
    </div>
  );
}


