import useSWRFetch from '../useSWRFetch';

interface StockHolding {

  id: number;
  user_id: number;
  stock_id: number;
  quantity: number;
  average_price: number;
  current_price:number;
}

interface Options {
  // 如果需要，定義 options 物件的結構
}

export default function useGetStockHoldings(userId: string, options?: Options) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/stockholdings/${userId}`;
  return useSWRFetch<StockHolding[]>(url, options);
}
