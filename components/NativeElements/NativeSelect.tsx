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
  onChange: () => void;
  options: string[];
  title?: string;
  placeholder?: string;
  className?: string;
};

const NativeSelect = ({
  onChange,
  options,
  title,
  placeholder,
  className,
}: Props) => {
  return (
    <>
      <Select onValueChange={onChange}>
        <SelectTrigger className={className}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{title}</SelectLabel>
            {options.map((option, index) => (
              <SelectItem key={index} value={index.toString()}>
                {option}
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
