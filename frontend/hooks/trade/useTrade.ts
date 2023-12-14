import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function useTrade() {
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

      // 顯示下單成功的提示
      Swal.fire({
        title: '成功',
        text: `訂單 ${orderType} 已下達，訂單 ID: ${response.data.orderId}`,
        icon: 'success',
        confirmButtonText: '好的'
      });

    } catch (err) {
      setIsLoading(false);
      setError(err.message || '未知錯誤發生');
      
      // 顯示下單失敗的提示
      Swal.fire({
        title: '錯誤',
        text: `下單失敗: ${err.message || '未知錯誤'}`,
        icon: 'error',
        confirmButtonText: '關閉'
      });
    }
  };

  return { executeTrade, isLoading, error, orderId };
};
