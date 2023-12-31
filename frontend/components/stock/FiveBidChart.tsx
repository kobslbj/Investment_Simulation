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

interface FiveBidChartProps {
  bids: { order_price: number; quantity: number }[];
}

export const options = {
  indexAxis: 'y' as const, // 使用 'as const' 断言
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  scales: {
    x: {
      reverse: true,
      beginAtZero: true,
    },
    y: {
      beginAtZero: true,
      position: 'right' as const, // 使用 'as const' 断言
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




const FiveBidChart: React.FC<FiveBidChartProps> = ({ bids }) => {
  const data = {
    labels: bids.map((bid) => `$${bid.order_price}`),
    datasets: [
      {
        label: "Quantity",
        data: bids.map((bid) => bid.quantity),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="w-[25rem]">
      <Bar options={options} data={data} />
    </div>
  );
}
export default FiveBidChart;
