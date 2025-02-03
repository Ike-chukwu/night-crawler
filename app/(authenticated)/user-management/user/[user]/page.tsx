"use client";
import { useRouterQuery } from "@/app/hooks/useRouterQuery";
import { BackIcon } from "@/components/icons";
import EventTable from "@/components/UserManagement/EventTables";
import { SearchParams } from "@/constants";
import { useGetUserEvent } from "@/hooks/useUserManagement";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { ClipLoader } from "react-spinners";

const ManageUser = () => {
  const { user } = useParams();
  const userIdFromUrl = user?.toString() || "";
  const { push } = useRouter();
  const { getQuery, changeQueries } = useRouterQuery();
  const page = getQuery(SearchParams.PAGE) || 1;
  const pageSize = 10;
  const filterString = getQuery(SearchParams.FILTER) || "";
  const action = getQuery(SearchParams.ACTION) || "";
  const filterByEmail = getQuery(SearchParams.SEARCHED_TERM) || "";
  const userId = getQuery(SearchParams.USER_ID) || "";
  console.log(user);

  const { user: individualUser, isLoading } = useGetUserEvent(
    userIdFromUrl,
    page.toString(),
    pageSize.toString(),
    filterByEmail
    // filterString,
  );

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
            {isLoading ? <ClipLoader size={10} /> : individualUser?.email + ` `}
            <span className="font-normal">events</span>
          </p>
          <p className="mt-1 font-light text-[13px]">
            ({isLoading ? <ClipLoader size={10} /> : individualUser?.userType})
          </p>
        </div>
      </div>
      <EventTable />
    </div>
  );
};

export default ManageUser;
