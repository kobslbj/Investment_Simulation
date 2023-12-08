"use client";

import { useState } from "react";
import { Card, CardBody, Input, Button } from "@nextui-org/react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../../components/icons";
import useLogIn from "../../hooks/useLogin";
import useSignUp from "../../hooks/useSignUp";
import Swal from "sweetalert2";

export default function SignInUppage() {
  const [isSignUppage, setIsSignUppage] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signUp } = useSignUp();
  const { logIn } = useLogIn();

  const toggleVisibility = () => setIsVisible(!isVisible);
  const handleTogglePage = () => setIsSignUppage((prev) => !prev);

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Wrong",
        text: "password is incorrect",
      });
      return;
    }
    await signUp({
      username,
      email,
      password,
      setIsSignUppage: setIsSignUppage,
    });
  };

  const handleLogIn = async () => {
    await logIn({ email, password });
  };
  return (
    <div>
      <Card className="w-[400px]">
        <CardBody>
          {isSignUppage ? (
            <>
              <div className="flex justify-center text-2xl mb-[20px] font-bold">
                會員註冊
              </div>
              <div className="flex flex-col justify-center px-5 gap-3 flex-wrap md:flex-nowrap">
                <Input
                  type="text"
                  variant="underlined"
                  label="Username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                  type="email"
                  variant="underlined"
                  label="Email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  label="Password"
                  variant="underlined"
                  placeholder="Password"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={isVisible ? "text" : "password"}
                />
                <Input
                  label="Confirmed Password"
                  variant="underlined"
                  placeholder="Confirmed Password"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type={isVisible ? "text" : "password"}
                />
                <Button color="primary" className="mt-5" onClick={handleSignUp}>
                  註冊
                </Button>
                <div
                  className="flex flex-row justify-center"
                  onClick={handleTogglePage}
                >
                  <div className="text-sm">已成為會員? </div>
                  <div className="text-sm cursor-pointer">會員登入</div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-center text-2xl mb-[20px] font-bold">
                會員登入
              </div>
              <div className="flex flex-col justify-center px-5 gap-3 flex-wrap md:flex-nowrap">
                <Input
                  type="email"
                  variant="underlined"
                  label="Email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  label="Password"
                  variant="underlined"
                  placeholder="Password"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={isVisible ? "text" : "password"}
                />
                <Button color="primary" className="mt-5" onClick={handleLogIn}>
                  登入
                </Button>
                <div
                  className="flex flex-row justify-center"
                  onClick={handleTogglePage}
                >
                  <div className="text-sm">尚未成為會員? </div>
                  <div className="text-sm cursor-pointer">會員註冊</div>
                </div>
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
