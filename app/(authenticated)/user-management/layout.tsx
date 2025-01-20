"use client";
import NativeSelect from "@/components/NativeElements/NativeSelect";
import { Input } from "@/components/ui/input";

export default function RoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <div className="flex justify-between md:items-center md:flex-row flex-col md:gap-0 gap-3">
        <Input
          className="w-full md:w-[300px]"
          placeholder="Search by user mail"
        />
        <div className="flex  justify-between md:justify-end w-full items-center md:gap-2">
          <NativeSelect
            onChange={() => console.log("yes")}
            placeholder="Pick a country"
            title="Countries"
            options={["USA", "France"]}
            className="w-[49%] md:w-[180px]"
          />
          <NativeSelect
            onChange={() => console.log("no")}
            placeholder="Pick a role"
            title="Roles"
            options={["Advertiser", "Manager"]}
            className="w-[49%] md:w-[180px]"
          />
        </div>
      </div>

      <div className=" ">{children}</div>
    </div>
  );
}
