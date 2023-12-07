// hooks/useSignUp.js
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface SignUpProps {
  username: string;
  email: string;
  password: string;
  setIsSignUppage: (isSignInpage: boolean) => void;
}

const useSignUp = () => {
  const [error, setError] = useState<string | null>(null);

  const signUp = async ({ username, email, password, setIsSignUppage }: SignUpProps) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/signup`,
        { name: username, email, password }
      );

      if (response.status === 200) {
        setIsSignUppage(false);
        Swal.fire({
          title: "註冊成功",
          text: "恭喜您已成功註冊帳號！",
          icon: "success",
          confirmButtonText: "確定",
        });
      }

      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "註冊失敗");
    }
  };

  return { signUp, error };
};

export default useSignUp;
