import { useState } from 'react';
import axios from 'axios';


export default function useTrade  ()  {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const executeTrade = async (userId: any, stockId: any, orderType: any, priceType: any, quantity: any, price: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/trade/execute`, {
        userId,
        stockId,
        orderType,
        priceType,
        quantity,
        price,
      });

      setIsLoading(false);
      setOrderId(response.data.orderId);
    } catch (err) {
      setIsLoading(false);
      setError(err.message || 'Unknown error occurred');
    }
  };

  return { executeTrade, isLoading, error, orderId };
};


