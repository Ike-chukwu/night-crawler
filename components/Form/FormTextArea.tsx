import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";

type InputProps = {
  name: string;
  label?: string;
  className?: string;
  type?: string;
  placeholder: string;
  min?: number;
  max?: number;
};

const FormTextArea = ({ className, name, placeholder, label }: InputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <div className="flex flex-col gap-2">
          <label htmlFor={name}>{label}</label>
          <Textarea
            className={cn(className, {
              "border border-red-600": !!errors[name]?.message?.toString(),
            })}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
          <p className="text-red-600">
            {errors[name]?.message?.toString() || ""}
          </p>
        </div>
      )}
    />
  );
};

export default FormTextArea;
