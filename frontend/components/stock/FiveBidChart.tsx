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

export const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    scales: {
      x: {
        reverse: true, // 將 X 軸反向
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        position: 'right', // 將 Y 軸放在右側
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
  

const BIDData = [
  { price: 100, quantity: 500 },
  { price: 99, quantity: 300 },
  { price: 98, quantity: 200 },
  { price: 97, quantity: 100 },
  { price: 96, quantity: 50 },
];

export const bidData = {
  labels: BIDData.map((bid) => `$${bid.price}`),
  datasets: [
    {
      label: "Quantity",
      data: BIDData.map((bid) => bid.quantity),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

export default function FiveBidChart() {
  return (
    <div className="w-[20rem]">
      <Bar options={options} data={bidData} />
    </div>
  );
}
