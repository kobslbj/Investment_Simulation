"use client";

import { useState, useEffect, SetStateAction } from "react";
import io, { Socket } from "socket.io-client";
let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

import Navbar1 from "@/components/navbar";
import OrderPlacer from "@/components/orderplacer";
import FiveAskChart from "@/components/stock/FiveAskChart";
import FiveBidChart from "@/components/stock/FiveBidChart";
import { stockNameToId } from "../stockUtils";
import { DefaultEventsMap } from "@socket.io/component-emitter";

export default function Home() {
  const [selectedStock, setSelectedStock] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");

  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("welcome", console.log);
    socket.on("stockPriceUpdate", (stock) => {
      if (stock.id === stockNameToId[selectedStock]) {
        console.log("123",stock)
        setCurrentPrice(stock.current_price);
      }
    });

    return () => {
      socket.off("welcome", console.log);
      socket.off("stockPriceUpdate");
    };
  }, [selectedStock]);
  return (
    <section className="flex flex-col items-center justify-center gap-4 ">
      <Navbar1 />
      <OrderPlacer
        selectedStock={selectedStock}
        setSelectedStock={setSelectedStock}
        currentPrice={currentPrice}
      />
      <div className="flex flex-row">
        <div className="text-2xl">{selectedStock}</div>
        <div className="text-2xl ml-5">
          及時價格: {currentPrice ? `${currentPrice} 元` : "N/A"}
        </div>
      </div>

      <div className="flex flex-row mt-5">
        <div>
          <div className="flex justify-center">委買 2550</div>
          <FiveBidChart />
        </div>
        <div>
          <div className="flex justify-center">委賣 1702</div>
          <FiveAskChart />
        </div>
      </div>
    </section>
  );
}
