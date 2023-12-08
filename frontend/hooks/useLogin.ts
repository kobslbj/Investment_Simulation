import axios from "axios";
import { setCookie } from "nookies";
import { useState } from "react";
import Swal from "sweetalert2";

interface LogInProps {
  email: string;
  password: string;
}

const useLogIn = () => {
  const [error, setError] = useState<string | null>(null);
  const logIn = async ({ email, password }: LogInProps) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/signin`, {
        provider: "native",
        email,
        password,
      });

      const { access_token, user } = response.data.data;
      setCookie(null, "accessToken", access_token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/"
      });
      setCookie(null, "userId", user.id, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/"
      });

      Swal.fire({
        title: "登入成功",
        text: "即將導入主頁！",
        icon: "success",
        confirmButtonText: "確定",
      });
      window.location.href = "/";
    } catch (err: any) {
      setError(err.response?.data?.message || "登入失敗");
    }
  };

  return { logIn, error };
};

export default useLogIn;
