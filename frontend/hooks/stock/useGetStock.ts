import useSWRFetch from '../useSWRFetch';


interface Stock {
  id: number;
  stock_symbol: string;
  stock_name: string;
  current_price: number;
}

export default function useGetStock(stockId: string) {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/stocks/${stockId}`;
  const { data, error, isLoading } = useSWRFetch<Stock>(endpoint);

  return {
    stock: data,
    error,
    isLoading
  };
}
