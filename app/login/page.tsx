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
    <FormProvider {...methods}>
      <div className="h-screen  bg-white px-4 md:px-0 flex flex-col justify-center items-center gap-8">
        <Image
          alt="logo"
          src="/logo.png"
          width={400}
          height={200}
          className="w-[42px] h-[38px]"
        />
        <p className="text=xl capitalize font-bold">login</p>
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
          <Button type="submit" className="w-full curved rounded-sm bg-[#7940EC] hover:opacity-90">
            Login
          </Button>
        </form>
      </div>
    </FormProvider>
  );
};

export default AuthPage;
