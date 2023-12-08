import useSWR from 'swr';
import axios from 'axios';
import { parseCookies } from 'nookies';

interface FetchError extends Error {
  info?: any;
  status?: number;
}

export default function useGetProfile() {
  const cookies = parseCookies();
  const accessToken = cookies.accessToken;

  const fetcher = async (url: string): Promise<any> => {
    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (response.status < 200 || response.status >= 300) {
        const error: FetchError = new Error('An error occurred while fetching the data.');
        error.info = response.data;
        error.status = response.status;
        throw error;
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const axiosError: FetchError = new Error(error.response.data.message || 'An error occurred while fetching the data.');
        axiosError.info = error.response.data;
        axiosError.status = error.response.status;
        throw axiosError;
      }
      throw error;
    }
  };

  const { data, error, mutate, isValidating } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, fetcher);

  return {
    userProfile: data?.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
    isValidating
  };
}
