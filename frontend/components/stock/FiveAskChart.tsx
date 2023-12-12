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
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Stock Ask ",
    },
  },
};

// 假設的五檔委買數據
const ASKData = [
  { price: 100, quantity: 500 },
  { price: 101, quantity: 300 },
  { price: 102, quantity: 200 },
  { price: 103, quantity: 100 },
  { price: 104, quantity: 50 },
];

export const askData = {
  labels: ASKData.map((ask) => `$${ask.price}`),
  datasets: [
    {
      label: "Quantity",
      data: ASKData.map((ask) => ask.quantity),
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgba(75, 192, 192, 0.5)",
    },
  ],
};

export default function FiveAskChart() {
  return (
    <div className="w-[20rem]">
      <Bar options={options} data={askData} />
    </div>
  );
}
