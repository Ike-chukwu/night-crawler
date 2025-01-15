import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type InputProps = {
  name: string;
  label?: string;
  className?: string;
  type?: string;
  placeholder: string;
  min?: number;
  max?: number;
};

const FormInput = ({
  className,
  name,
  placeholder,
  label,
  max,
  min,
  type,
}: InputProps) => {
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
          <Input
            className={cn(className, {
              "border border-red-600": !!errors[name]?.message?.toString(),
            })}
            min={min}
            placeholder={placeholder}
            type={type}
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

export default FormInput;
