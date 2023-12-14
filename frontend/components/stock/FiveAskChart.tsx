"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface FiveAskChartProps {
  asks: { order_price: number; quantity: number }[];
}

export const options = {
  indexAxis: 'y' as const, // 将 'y' 更改为常量
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  scales: {
    x: {
      reverse: true, // 将 X 轴反向
      beginAtZero: true,
    },
    y: {
      beginAtZero: true,
      position: 'right' as const, // 将 'right' 更改为常量
    }
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Stock Bid ',
    },
  },
};


const FiveAskChart: React.FC<FiveAskChartProps> = ({ asks }) => {
  const data = {
    labels: asks.map((ask) => `$${ask.order_price}`),
    datasets: [
      {
        label: "Quantity",
        data: asks.map((ask) => ask.quantity),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  return (
    <div className="w-[25rem]">
      <Bar options={options} data={data} />
    </div>
  );
};

export default FiveAskChart;
