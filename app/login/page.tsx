"use client";
import FormInput from "@/components/Form/FormInput";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/useLogin";
import { LoginPayload, loginSchema } from "@/services/login/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import Logo from "./../../public/logo.png";
import { EyeIcon, EyeOff } from "lucide-react";

const AuthPage = () => {
  const methods = useForm<LoginPayload>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { push } = useRouter();
  const { login, isSuccess, isLoading, isError } = useLogin({
    onSuccess: () => {
      toast.success("Login Successful");
      push("/");
    },
    onError: () => {
      toast.error("User cannot be logged in!");
    },
  });

  const onSubmit = (data: LoginPayload) => {
    // console.log(data);
    login(data);
  };

  return (
    <div className="md:flex min-h-screen  bg-white">
      <div className="w-full xl:w-[50%] min-h-screen px-4 ">
        <FormProvider {...methods}>
          <div className="min-h-screen  md:px-0 flex flex-col justify-center items-center gap-8 ">
            {/* <img src="/logo.png" alt="logo" /> */}

            <Image
              alt="Logo"
              src={Logo}
              className="w-[42px] h-[38px]"
              width={40}
              height={40}
            />

            <div className="text-center">
              <p className="text-2xl capitalize font-bold text-[#7940EC]">
                login
              </p>
              <p className="text-md py-2 font-light text-[#B0B0B0]">
                Login into niteCrawlers Dashboard
              </p>
            </div>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="flex flex-col gap-4 w-full md:w-[500px] mx-auo"
            >
              <FormInput
                label="Email"
                name="email"
                placeholder="testemail@gmail.com"
                type="email"
              />
              <div className="relative">
                <FormInput
                  label="Password"
                  name="password"
                  placeholder="testemail@gmail.com"
                  type={showPassword ? "text" : "password"}
                  className="w-full"
                />
                {showPassword ? (
                  <EyeIcon
                    className="absolute right-2 top-[50%] cursor-pointer"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <EyeOff
                    className="absolute right-2 top-[50%] cursor-pointer"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full curved rounded-sm bg-[#7940EC] hover:opacity-90"
              >
                {isLoading ? " Logging in" : "Login"}
              </Button>
            </form>
          </div>
        </FormProvider>
      </div>
      <div className="hidden px-4 w-0 min-h-screen xl:flex justify-between items-center xl:w-[50%] bg-loginImage object-cover object-center bg-no-repeat">
        <p className="w-[500px] mx-auto text-center text-white leading-10">
          “Your command center for managing events, tracking attendees, and
          shaping unforgettable experiences. Let&apos;s make it happen!"
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
