"use client";

import React from "react";
import { useState, useMemo, useRef } from "react";
import { parseCookies } from 'nookies';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Input,
} from "@nextui-org/react";
import useTrade from "../hooks/trade/useTrade";

export default function Orderplacer({ selectedStock, setSelectedStock, currentPrice }) {
  const cookies = parseCookies();
  const userId = cookies.userId;
  const { executeTrade } = useTrade();
  const [quantity, setQuantity] = useState(0);
  const [orderPrice, setOrderPrice] = useState(0);
  const priceTypeRef = useRef("limit"); // 使用 useRef 來保持價格類型的狀態
  const handleStockSelection = (newSelectedStock) => {
    setSelectedStock(newSelectedStock);
  };

  const handleTrade = async (orderType) => {
    const stockId = stockNameToId[selectedValue];
    const finalOrderPrice = priceTypeRef.current === "market" ? currentPrice : orderPrice;
    await executeTrade(userId, stockId, orderType, priceTypeRef.current, quantity, finalOrderPrice);
  };
  
  const [selectedKeys, setSelectedKeys] = useState(new Set(["選擇股票"]));
  const [selectedKey1, setSelectedKey1] = useState(new Set(["整股ROD"]));
  const [selectedKey2, setSelectedKey2] = useState(new Set(["限價"]));
  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
  const selectedValue1 = useMemo(
    () => Array.from(selectedKey1).join(", ").replaceAll("_", " "),
    [selectedKey1]
  );
  const selectedValue2 = useMemo(
    () => Array.from(selectedKey2).join(", ").replaceAll("_", " "),
    [selectedKey2]
  );

  return (
    <Card className="w-[800px]">
      <CardHeader className="flex gap-3">
        <p className="text-xl font-bold ml-1.5">下單專區</p>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-row gap-3">
        <div>
          <p className="ml-1.5">股票名稱</p>
          <Dropdown className="w-[200px] ">
            <DropdownTrigger className="w-[200px] mt-2">
              <Button variant="solid" className="capitalize">
                {selectedValue}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              variant="flat"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedKeys}
              onSelectionChange={(keys) => {
                setSelectedKeys(keys);
                const newSelectedStock = Array.from(keys)[0];
                if (newSelectedStock) {
                  handleStockSelection(newSelectedStock);
                }
              }}
            >
              <DropdownItem key="2303聯電">2303 聯電</DropdownItem>
              <DropdownItem key="2618長榮航">2618 長榮航</DropdownItem>
              <DropdownItem key="3231緯創">3231 緯創</DropdownItem>
              <DropdownItem key="2892第一金">2892 第一金</DropdownItem>
              <DropdownItem key="2330台積電">2330 台積電</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div>
          <p className="ml-1.5">交易型態</p>
          <Dropdown className="w-[100px] ">
            <DropdownTrigger className="w-[100px] mt-2">
              <Button variant="bordered" className="capitalize">
                {selectedValue1}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              variant="flat"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedKey1}
              onSelectionChange={setSelectedKey1}
            >
              <DropdownItem
                key="整股 ROD"
                description="當下沒成交，也繼續等待，直到今天收盤結束(最常用)"
              >
                整股 ROD
              </DropdownItem>
              <DropdownItem
                key="整股 IOC"
                description="允許部分成交，而沒有成交的部分就取消。(最常用在市價單)"
              >
                整股 IOC
              </DropdownItem>
              <DropdownItem
                key="整股 FOK"
                description="一定要全部成交，否則就全部取消。"
              >
                整股 FOK
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div>
          <p className="ml-1.5">交易類別</p>
          <Dropdown className="w-[100px] ">
            <DropdownTrigger className="w-[100px] mt-2">
              <Button variant="bordered" className="capitalize">
                {selectedValue2}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              variant="flat"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedKey2}
              onSelectionChange={setSelectedKey2}
            >
              <DropdownItem key="限價" description="可以指定想要成交的價格">
                限價
              </DropdownItem>
              <DropdownItem key="市價" description="不管現在多少錢，都讓我買賣">
                市價
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="flex flex-row gap-3">
          <div className="flex flex-col ">
            <p className="ml-1.5 mb-2">價格(元):</p>
            <Input
              type="number"
              placeholder="0.00"
              variant="faded"
              size="sm"
              value={orderPrice}
              onChange={(e) => setOrderPrice(e.target.value)}
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">$</span>
                </div>
              }
            />
          </div>
          <div className="flex flex-col">
            <p className="ml-1.5 mb-2">數量(張):</p>
            <Input
              type="number"
              label=""
              placeholder="0"
              variant="faded"
              size="sm"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        </div>
      </CardBody>
      <CardFooter className="flex justify-center gap-5">
        <Button
          color="success"
          className="font-bold text-md"
          onClick={() => handleTrade("buy")}
        >
          買進
        </Button>
        <Button
          color="danger"
          className="font-bold text-md"
          onClick={() => handleTrade("sell")}
        >
          賣出
        </Button>
      </CardFooter>
    </Card>
  );
}
