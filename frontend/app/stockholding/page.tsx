"use client";

import React from "react";
import useGetStockHoldings from "../../hooks/stock/useGetStockHolding";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { parseCookies } from "nookies";

export default function OrderSearchpage() {
  const cookies = parseCookies();
  const userId = cookies.userId;
  const { data: stockHoldings, error, isLoading } = useGetStockHoldings(userId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const stockNames: Record<number, string> = {
    1: "2303聯電",
    2: "2618長榮航",
    3: "3231緯創",
    4: "2892第一金",
    5: "2330台積電",
  };

  return (
    <div className="flex flex-col">
      {stockHoldings && stockHoldings.length > 0 ? (
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
            <TableColumn>倉別</TableColumn>
            <TableColumn>庫存</TableColumn>
            <TableColumn>平均成本</TableColumn>
            <TableColumn>現價</TableColumn>
            <TableColumn>預估損益</TableColumn>
            <TableColumn>報酬率</TableColumn>
          </TableHeader>
          <TableBody>
            {stockHoldings.map((stockHolding) => {

              const profitLoss = (stockHolding.current_price - stockHolding.average_price) * 1000;
              const returnPercentage = ((stockHolding.current_price - stockHolding.average_price) / stockHolding.average_price) * 100;

              return (
                <TableRow key={stockHolding.id}>
                  <TableCell>{stockNames[stockHolding.stock_id]}</TableCell>
                  <TableCell>現股</TableCell>
                  <TableCell>{stockHolding.quantity}張</TableCell>
                  <TableCell>{stockHolding.average_price}</TableCell>
                  <TableCell>{stockHolding.current_price}</TableCell>
                  <TableCell style={{ color: profitLoss >= 0 ? 'red' : 'green' }}>
                    {profitLoss >= 0 ? `+${profitLoss.toFixed(2)}` : profitLoss.toFixed(2)}
                  </TableCell>
                  <TableCell style={{ color: returnPercentage >= 0 ? 'red' : 'green' }}>
                    {returnPercentage >= 0 ? `+${returnPercentage.toFixed(2)}%` : `${returnPercentage.toFixed(2)}%`}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <div style={{ textAlign: "center", margin: "20px" }}>沒有訂單數據</div>
      )}
    </div>
  );
}