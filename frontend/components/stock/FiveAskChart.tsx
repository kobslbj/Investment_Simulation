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
      text: "Stock Ask",
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
