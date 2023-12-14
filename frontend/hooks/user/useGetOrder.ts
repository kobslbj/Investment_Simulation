import useSWRFetch from "../useSWRFetch";
export interface Order {
    id: number;
    user_id: number;
    stock_id: number;
    order_type: string;
    price_type: string;
    quantity: number;
    remaining_quantity: number;
    order_price: number;
    order_date: string;
    status: string;
  }
  


  
  export default function useGetOrders(userId: string) {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/user/${userId}/orders`;
    const { data, error, isLoading } = useSWRFetch<Order[]>(endpoint);
  
    return {
      orders: data,
      isLoading,
      error,
    };
  }
  