"use client";

import { useState, useEffect, SetStateAction } from "react";
import io, { Socket } from "socket.io-client";
import useGetStock from "../hooks/stock/useGetStock";
let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

import Navbar1 from "@/components/navbar";
import OrderPlacer from "@/components/orderplacer";
import FiveAskChart from "@/components/stock/FiveAskChart";
import FiveBidChart from "@/components/stock/FiveBidChart";
import { stockNameToId } from "../stockUtils";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import React from "react";
import { Chip } from "@nextui-org/react";

export default function Home() {
  const [selectedStock, setSelectedStock] = useState("");
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const stockId = stockNameToId[selectedStock]
    ? stockNameToId[selectedStock].toString()
    : "";

  const {
    stock,
    error: stockError,
    isLoading: stockLoading,
  } = useGetStock(stockId);
  type OrderBookEntry = {
    order_price: number;
    price: number;
    quantity: number;
  };
  
  console.log("123123123" + selectedStock);
  const [orderBook, setOrderBook] = useState({
    bids: [] as OrderBookEntry[],
    asks: [] as OrderBookEntry[],
    totalBidQuantity: 0,
    totalAskQuantity: 0,
  });
  
  const updateFiveLevelOrderBook = (
    data: {
      bids: OrderBookEntry[];
      asks: OrderBookEntry[];
      totalBidQuantity: number;
      totalAskQuantity: number;
    }
  ) => {
    setOrderBook(data);
  };
  

  useEffect(() => {
    const socket = io("https://52.195.76.225");
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
  useEffect(() => {
    if (stock) {
      console.log(stock);
      setCurrentPrice(stock.current_price);
    }
  }, [selectedStock, stock]);

  return (
    <section className="flex flex-col items-center justify-center gap-10 ">
      <Navbar1 />
      <OrderPlacer
        selectedStock={selectedStock}
        setSelectedStock={setSelectedStock}
        currentPrice={currentPrice}
      />
      <div className="flex flex-row">
        <Chip color="warning" variant="dot" size="lg" >
          {selectedStock}
        </Chip>
        <div className="text-xl ml-5">
          即時價格: {currentPrice != null ? `${currentPrice} 元` : "N/A"}
        </div>
      </div>

      <div className="flex flex-row mt-5">
        <div>
          <div className="flex justify-center text-xl">
            <div>委買</div>
            <div className=" text-red-600 font-bold">
              {orderBook.totalBidQuantity}
            </div>
          </div>
          <FiveBidChart bids={orderBook.bids} />
        </div>
        <div>
          <div className="flex justify-center text-xl">
            <div>委賣</div>
            <div className=" text-green-600 font-bold">
              {orderBook.totalAskQuantity}
            </div>
          </div>
          <FiveAskChart asks={orderBook.asks} />
        </div>
      </div>
    </section>
  );
}
