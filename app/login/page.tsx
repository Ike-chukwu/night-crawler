"use client";
import FormInput from "@/components/Form/FormInput";
import { Button } from "@/components/ui/button";
import { LoginPayload, loginSchema } from "@/services/login/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

const AuthPage = () => {
  const methods = useForm<LoginPayload>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
  });

  const { push } = useRouter();

  const onSubmit = (data: LoginPayload) => {
    console.log(data);
  };

  return (
    <div className="md:flex min-h-screen  bg-white">
      <div className="w-full xl:w-[50%] min-h-screen px-4 ">
        <FormProvider {...methods}>
          <div className="min-h-screen  md:px-0 flex flex-col justify-center items-center gap-8 ">
            <Image
              alt="logo"
              src="/logo.png"
              width={400}
              height={200}
              className="w-[42px] h-[38px]"
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
              <FormInput
                label="Password"
                name="password"
                placeholder="testemail@gmail.com"
                type="password"
              />
              <Button
                type="submit"
                className="w-full curved rounded-sm bg-[#7940EC] hover:opacity-90"
              >
                Login
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
