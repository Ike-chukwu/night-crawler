"use client";
import { BackIcon } from "@/components/icons";
import NativeSelect from "@/components/NativeElements/NativeSelect";
import EventTable from "@/components/UserManagement/EventTables";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const ManageEvent = () => {
  const { event } = useParams();
  const { push } = useRouter();
  return (
    <div className="py-3">
      <div className="flex flex-col gap-3 md:gap-0 md:flex-row w-full justify-between">
        <div className="flex gap-2 mt-2 items-center">
          <BackIcon
            width="12"
            height="12"
            onClick={() => push("/event-management")}
            className="cursor-pointer"
          />
          <p className="text-[15px] font-bold capitalize">
            Space Event Attendance Trend
          </p>
        </div>
        <NativeSelect
          placeholder="Select a year"
          title="Years"
          options={["2024"]}
          onChange={() => console.log("yes")}
        />
      </div>
      <div className="md:w-[700px] py-14">
        <Image
          src="/eventGraph.jpg"
          width={400}
          height={400}
          className="w-full"
          alt="image of event graph"
        />
      </div>
    </div>
  );
};

export default ManageEvent;
