import { parseCookies } from "nookies";
import { useState } from "react";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";

interface Options {
  // Define the structure of the options object, if necessary
}

export default function useCustomHook<T>(url: string, options?: Options): { data: T | null; error: any; isLoading: boolean } {
  const cookies = parseCookies();
  const { accessToken } = cookies;
  const { mutate } = useSWRConfig();
  const [isSent, setIsSent] = useState(false);

  const { data, error } = useSWR<T>(
    url,
    async (fetchUrl: string): Promise<T> => {
      try {
        const res = await axios.get(fetchUrl, {
          headers: { authorization: `Bearer ${accessToken}` },
        });

        if (res.status < 200 || res.status >= 300) {
          const error = new Error("An error occurred while fetching the data.") as any;
          error.info = res.data;
          error.status = res.status;
          throw error;
        }

        return res.data;
      } catch (error: any) {
        if (error.response) {
          const axiosError = new Error("An error occurred while fetching the data.") as any;
          axiosError.info = error.response.data;
          axiosError.status = error.response.status;
          throw axiosError;
        }
        throw error;
      }
    },
    {
      onErrorRetry: (error: any, key: string, config: any, revalidate: (options: any) => void, { retryCount }: { retryCount: number }) => {
        console.log(`on error retry: ${key}`);
        if (error.status === 404) return;
        if (retryCount >= 5) return;
        setTimeout(() => revalidate({ retryCount }), 5000);
      },
      onLoadingSlow: (key: string) => {
        console.log(`on loading slow: ${key}`);
        if (!isSent) mutate(url);
        setIsSent(true);
      },
      ...options,
    }
  );

  const isLoading = !data && !error;

  if (error) {
    console.log(error);
  }

  return { data: data ?? null, error, isLoading }; // 使用 `??` 運算符來處理 undefined 的情況
}
