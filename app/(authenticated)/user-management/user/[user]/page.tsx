"use client";
import { BackIcon } from "@/components/icons";
import EventTable from "@/components/UserManagement/EventTables";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const ManageUser = () => {
  const { user } = useParams();
  const { push } = useRouter();
  


  return (
    <div className="py-3">
      <div className="flex gap-2 mt-2 items-center">
        <BackIcon
          width="12"
          height="12"
          onClick={() => push("/user-management")}
          className="cursor-pointer"
        />
        <div className="">
          <p className="text-[15px] font-bold">
            Mojolarichards@gmail.com events
          </p>
          <p className="mt-1 font-light text-[13px]">(_NORMAL USER)</p>
        </div>
      </div>
      <EventTable />
    </div>
  );
};

export default ManageUser;
