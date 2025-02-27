"use client";
import { useRouterQuery } from "@/app/hooks/useRouterQuery";
import { BackIcon } from "@/components/icons";
import SubscribersTable from "@/components/Plan Management/SubscribersTable";
import EventTable from "@/components/UserManagement/EventTables";
import { SearchParams } from "@/constants";
import { useGetUserEvent } from "@/hooks/useUserManagement";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { ClipLoader } from "react-spinners";

const SubscribersPage = () => {
  const { user } = useParams();
  const { push } = useRouter();

  return (
    <div className="py-3">
      <div className="flex gap-2 mt-2 items-center">
        <Link
          href="/plan-management"
          className="flex ease-in hover:font-bold items-center gap-3"
        >
          <BackIcon
            width="12"
            height="12"
            onClick={() => push("/plan-management")}
            className="cursor-pointer"
          />
          <span className="text-[15px] ">Back to Plans</span>
        </Link>
      </div>
      <SubscribersTable />
    </div>
  );
};

export default SubscribersPage;
