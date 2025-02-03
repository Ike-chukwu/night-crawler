import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

type Props = {
  onChange: (value: any) => void;
  options: string[];
  title?: string;
  placeholder?: string;
  className?: string;
  displayKey?: string;
  valueKey?: string;
  value?: string;
};

const NativeSelect = ({
  onChange,
  options,
  displayKey = "name",
  valueKey = "id",
  title,
  placeholder,
  className,
  value,
}: Props) => {
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
    <>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger className={className}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{title}</SelectLabel>
            {options.map((option, index) => (
              <SelectItem key={getItemKey(option)} value={getItemKey(option)}>
                {getItemValue(option)}
              </SelectItem>
            ))}
            {/* <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem> */}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

export default NativeSelect;
