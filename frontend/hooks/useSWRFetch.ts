/* eslint-disable no-shadow */
import { parseCookies } from "nookies";
import { useState } from "react";
import axios from "axios";
import useSWR, { useSWRConfig, SWRResponse } from "swr";

interface Options {
  // Define the structure of the options object, if necessary
}

export default function useCustomHook(url: string, options?: Options): { data: any; error: any; isLoading: boolean } {
  const cookies = parseCookies();
  const { accessToken } = cookies;
  const { mutate } = useSWRConfig();
  const [isSent, setIsSent] = useState(false);

  const { data, error, isLoading } = useSWR(
    url,
    async (fetchUrl: string): Promise<any> => {
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

  if (error) {
    console.log(error);
  }

  return { data: data?.data, error, isLoading };
}
