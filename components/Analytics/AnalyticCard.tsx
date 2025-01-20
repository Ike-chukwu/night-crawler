import Image from "next/image";
import React, { ReactElement } from "react";
import { LinkArrowIcon, UserIcon } from "../icons";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import clsx from "clsx";

type Props = {
  icon: ReactElement;
  title: string;
  imgLink: string;
  linkText?: string;
  filter?: true;
  href?: string;
};

const AnalyticCard = ({
  icon,
  title,
  imgLink,
  linkText,
  filter,
  href,
}: Props) => {
  return (
    <div className="py-4 px-4 flex flex-col justify-between h-[350px] rounded-md border-[#c5adf7] border-[0.1px]">
      <div
        className={clsx("flex w-full justify-between", {
          // "items-center": !filter,
          "md:items-center flex-col gap-3 md:flex md:flex-row": filter,
        })}
      >
        <div className="flex items-center gap-2">
          {icon}
          {/* <UserIcon width="18" height="18" color="black" /> */}
          <span className="font-bold text-[14px]">{title}</span>
        </div>
        {filter && (
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </div>
      <Image
        alt="barChart"
        src={imgLink}
        width={150}
        height={150}
        className="w-[250px] md:w-[400px] h-[150px] mx-auto"
      />
      {linkText && (
        <Link
          href={href || ""}
          className="self-end text-[#B691FF] flex items-center gap-2 "
        >
          <span className="text-[13px] underline">{linkText}</span>
          <LinkArrowIcon width={12} height={12} />
        </Link>
      )}
    </div>
  );
};

export default AnalyticCard;
