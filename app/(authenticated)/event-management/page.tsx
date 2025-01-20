"use client";
import EventDetailTable from "@/components/EventManagement/EventDetailTable";
import NativeSelect from "@/components/NativeElements/NativeSelect";
import { Input } from "@/components/ui/input";
import React from "react";

const EventManagementPage = () => {
  return (
    <div className="">
      <div className="flex justify-between md:items-center md:flex-row flex-col md:gap-0 gap-3">
        <Input
          className="w-full md:w-[300px]"
          placeholder="Search by user mail"
        />
        <div className="flex justify-between md:justify-end w-full items-center md:gap-2">
          <NativeSelect
            className="w-[49%] md:w-[180px]"
            onChange={() => console.log("yes")}
            placeholder="Select a country"
            title="Countries"
            options={["USA"]}
          />
          <NativeSelect
            className="w-[49%] md:w-[180px]"
            onChange={() => console.log("yes")}
            placeholder="Pick status"
            title="Status"
            options={["Ongoing"]}
          />
        </div>
      </div>

      <EventDetailTable />
    </div>
  );
};

export default EventManagementPage;
