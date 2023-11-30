"use client";

import { useState } from "react";
import { Card, CardBody, Input, Button } from "@nextui-org/react";
import { EyeFilledIcon } from "../../components/icons";
import { EyeSlashFilledIcon } from "../../components/icons";

export default function SignInUppage() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div>
      <Card className="w-[400px]">
        <CardBody>
          <div className="flex justify-center text-2xl mb-[20px] font-bold">
            Sign Up
          </div>
          <div className="flex flex-col justify-center px-5 gap-3 flex-wrap md:flex-nowrap ">
            <Input
              type="text"
              variant="underlined"
              label="Username"
              placeholder="Username"
            />
            <Input
              type="email"
              variant="underlined"
              label="Email"
              placeholder="Email"
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
              type={isVisible ? "text" : "password"}
            />
            <Input
              label="Confirmed Password"
              variant="underlined"
              placeholder="Confirmed password"
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
              type={isVisible ? "text" : "password"}
            />
            <Button color="primary" className="mt-5">Sign up</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
