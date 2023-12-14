import useSWRFetch from '../useSWRFetch';

interface Transaction {
  id: number;
  order_id: number;
  transaction_price: number;
  transaction_quantity: number;
  transaction_date: string;
  stock_id: number;
  order_type: string; 
  user_id: number;
}



export default function useGetAllTransactions(userId: any) {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/transactions/${userId}`;
  return useSWRFetch<Transaction[]>(apiUrl);
}
