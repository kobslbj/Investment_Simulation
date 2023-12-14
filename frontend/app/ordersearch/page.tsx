"use client";

import React from "react";
import useGetOrders from "../../hooks/user/useGetOrder";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@nextui-org/react";
import { parseCookies } from "nookies";

export default function OrderSearchpage() {
  const cookies = parseCookies();
  const userId = cookies.userId;
  const { orders, isLoading, error } = useGetOrders(userId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const stockNames: Record<number, string> = {
    1: "2303聯電",
    2: "2618長榮航",
    3: "3231緯創",
    4: "2892第一金",
    5: "2330台積電",
  };
  

  const formatOrderType = (type: string) => {
    switch (type) {
      case "buy":
        return "現股買進";
      case "sell":
        return "現股賣出";
      default:
        return type;
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case "filled":
        return "success";
      case "partial":
        return "warning";
      case "pending":
        return "danger";
      default:
        return "default";
    }
  };

  return (
    <div className="flex flex-col">
      {orders && orders.length > 0 ? (
        <Table
          aria-label="Table with OrderSearch"
          isHeaderSticky
          defaultSelectedKeys={["1"]}
          classNames={{
            wrapper:
              "w-full table-fixed max-h-[39.5rem] border border-[#2f3037] rounded-md p-5   text-white",
            th: "text-base text-white ",
            td: "border-y border-y-[#2f3037]",
          }}
        >
          <TableHeader>
            <TableColumn>股票名稱</TableColumn>
            <TableColumn>交易 類別</TableColumn>
            <TableColumn>下單 類別</TableColumn>
            <TableColumn>委託量 / 價</TableColumn>
            <TableColumn>成交量 / 均價</TableColumn>
            <TableColumn>未成交量 / 金額</TableColumn>
            <TableColumn>委託時間</TableColumn>
            <TableColumn>委託狀態</TableColumn>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{stockNames[order.stock_id]}</TableCell>
                <TableCell>
                  <p className="text-red-600">
                    {formatOrderType(order.order_type)}
                  </p>
                </TableCell>
                <TableCell>ROD</TableCell>
                <TableCell>
                  {order.quantity}張/ {order.order_price}元
                </TableCell>
                <TableCell>
                  {order.status === "partial"
                    ? `${order.quantity - order.remaining_quantity}張/ ${
                        order.order_price
                      }元`
                    : order.status === "filled"
                    ? `${order.quantity}張/ ${order.order_price}元`
                    : "0張/ 0.00元"}
                </TableCell>
                <TableCell>
                  {order.status === "partial"
                    ? `${order.remaining_quantity}張/ ${(
                        order.order_price * order.remaining_quantity
                      ).toFixed(2)}元`
                    : order.status === "pending"
                    ? `${order.quantity}張/ ${(
                        order.order_price * order.quantity *1000
                      ).toFixed(2)}元`
                    : "0張/ 0.00元"}
                </TableCell>
                <TableCell>{new Date(order.order_date).toLocaleString()}</TableCell>
                <TableCell>
                  <Chip
                    color={getOrderStatusColor(order.status)}
                    variant="bordered"
                  >
                    {order.status}
                  </Chip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div style={{ textAlign: "center", margin: "20px" }}>沒有訂單數據</div>
      )}
    </div>
  );
}
