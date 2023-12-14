"use client";

import React from "react";
import useGetAllTransactions from "../../hooks/trade/useGetAllTransactions";
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
  const parsedUserId = parseInt(userId, 10);
  const {
    data: transactions,
    error,
    isLoading,
} = useGetAllTransactions(userId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const stockNames = {
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

  console.log("Parsed UserID:", parsedUserId);
  console.log("Transactions:", transactions);

  return (
    <div className="flex flex-col">
      {transactions && transactions.length > 0 ? (
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
            <TableColumn>交易類別</TableColumn>
            <TableColumn>成交價(元)</TableColumn>
            <TableColumn>張數</TableColumn>
            <TableColumn>收付金額</TableColumn>
            <TableColumn>時間</TableColumn>
          </TableHeader>
          <TableBody>
            {transactions
              .filter((transaction) => transaction.user_id === parsedUserId)
              .map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{stockNames[transaction.stock_id]}</TableCell>
                  <TableCell>
                    <p
                      className={
                        transaction.order_type === "sell"
                          ? "text-red-600"
                          : "text-green-600"
                      }
                    >
                      {formatOrderType(transaction.order_type)}
                    </p>
                  </TableCell>
                  <TableCell>{transaction.transaction_price}元</TableCell>
                  <TableCell>{transaction.transaction_quantity}張</TableCell>
                  <TableCell>
                    <p
                      className={
                        transaction.order_type === "sell"
                          ? "text-red-600"
                          : "text-green-600"
                      }
                    >
                      {transaction.order_type === "buy"
                        ? `- ${(
                            transaction.transaction_price *
                            transaction.transaction_quantity
                          ).toFixed(2)}`
                        : `${(
                            transaction.transaction_price *
                            transaction.transaction_quantity
                          ).toFixed(2)}`}
                      元
                    </p>
                  </TableCell>

                  <TableCell>
                    {new Date(transaction.transaction_date).toLocaleString()}
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
