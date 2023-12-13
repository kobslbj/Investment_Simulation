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
  const [orderBook, setOrderBook] = useState({
    bids: [],
    asks: [],
    totalBidQuantity: 0,
    totalAskQuantity: 0
  });
  const updateFiveLevelOrderBook = (
    data: SetStateAction<{ bids: never[]; asks: never[] }>
  ) => {
    setOrderBook(data);
  };

  useEffect(() => {
    const socket = io("http://localhost:3000");
    socket.on("orderBookUpdate", (data) => {
      if (data.stockId === stockNameToId[selectedStock]) {
        console.log("123", data);
        updateFiveLevelOrderBook(data);
      }
    });
    socket.on("welcome", console.log);
    socket.on("stockPriceUpdate", (stock) => {
      if (stock.id === stockNameToId[selectedStock]) {
        console.log("123", stock);
        setCurrentPrice(stock.current_price);
      }
    });

    return () => {
      socket.off("welcome", console.log);
      socket.off("stockPriceUpdate");
      socket.off("orderBookUpdate");
    };
  }, [selectedStock]);
  function calculateTotal(orders: { quantity: number }[]) {
    return orders.reduce((total, order) => total + order.quantity, 0);
  }
  

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
          即時價格: {currentPrice ? `${currentPrice} 元` : "N/A"}
        </div>
      </div>

      <div className="flex flex-row mt-5">
        <div>
          <div className="flex justify-center">
            委買 {orderBook.totalBidQuantity}
          </div>
          <FiveBidChart bids={orderBook.bids} />
        </div>
        <div>
          <div className="flex justify-center">
            委賣 {orderBook.totalAskQuantity}
          </div>
          <FiveAskChart asks={orderBook.asks} />
        </div>
      </div>
    </section>
  );
}
