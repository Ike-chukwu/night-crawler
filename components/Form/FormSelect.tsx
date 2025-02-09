import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ClipLoader } from "react-spinners";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectProps = {
  name: string;
  label?: string;
  className?: string;
  type?: string;
  id: string;
  placeholder?: string;
  options?: any;
  displayKey?: string;
  valueKey?: string;
  loadingState?: boolean;
};

const FormSelect = ({
  displayKey = "name",
  valueKey = "id",
  name,
  label,
  placeholder,
  options,
  loadingState,
}: SelectProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const getItemKey = (item: any) => {
    if (typeof item === "string") {
      return item;
    } else {
      return item[valueKey];
    }
  };

  const getItemValue = (item: any) => {
    if (typeof item === "string") {
      return item;
    } else {
      return item[displayKey];
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <div className="selectag flex flex-col gap-2">
          <p>{label}</p>
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="">
              {loadingState && <ClipLoader size={10} />}
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options?.map((item: any) => {
                return (
                  <SelectItem key={getItemKey(item)} value={getItemKey(item)}>
                    {getItemValue(item)}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <p className="text-red-600">
            {errors[name]?.message?.toString() || ""}
          </p>
        </div>
      )}
    />
  );
};

export default FormSelect;
