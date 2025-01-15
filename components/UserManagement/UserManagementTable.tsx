"use client";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import { useRouter } from "next/navigation";
import React from "react";
import Table from "../ui/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { User } from "@/services/user-management/types";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { OptionIcon } from "../icons";

const userColumnHelper = createColumnHelper<User>();
const cellClass = "border-b py-5 border-content2";

const UserManagementTable = () => {
  const router = useRouter();
  const { getQuery, changeQueries } = useRouterQuery();
  

  const usersArray = [
    {
      userMail: "mojolarichards@gmail.com",
      country: "U.S.A",
      phoneNumber: "+1 (923) 455 6572",
      userRole: "Advertiser",
    },
    {
      userMail: "mojolarichards@gmail.com",
      country: "U.S.A",
      phoneNumber: "+1 (923) 455 6572",
      userRole: "Advertiser",
    },
    {
      userMail: "mojolarichards@gmail.com",
      country: "U.S.A",
      phoneNumber: "+1 (923) 455 6572",
      userRole: "Advertiser",
    },
    {
      userMail: "mojolarichards@gmail.com",
      country: "U.S.A",
      phoneNumber: "+1 (923) 455 6572",
      userRole: "Advertiser",
    },
  ];

  const UserColumns = [
    userColumnHelper.display({
      header: "S/N",
      cell: ({ row }) => row.index + 1,
      meta: {
        cellProps: {
          className: cellClass,
        },
      },
    }),

    userColumnHelper.accessor("userMail", {
      header: "User Mail",

      meta: {
        cellProps: {
          className: cellClass,
        },
      },
    }),
    userColumnHelper.accessor("country", {
      header: "Country",
      meta: {
        cellProps: {
          className: cellClass,
        },
      },
    }),
    userColumnHelper.accessor("phoneNumber", {
      header: "Phone Number",
      meta: {
        cellProps: {
          className: cellClass,
        },
      },
    }),
    userColumnHelper.accessor("userRole", {
      header: "User Role",
      meta: {
        cellProps: {
          className: cellClass,
        },
      },
    }),
    userColumnHelper.display({
      header: "Actions",
      cell: ({ row: { original } }) => {
        return (
          <div className="flex items-center justify-between gap-10">
            <Popover>
              <PopoverTrigger>
                <button type="button">
                  <OptionIcon width={15} height={16} />
                </button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex flex-col gap-3">
                  <Link
                    className="capitalize pb-1 border-b-[0.1px] text-[13px]"
                    href={`/films/edit/${original?.id}`}
                  >
                    manage user events
                  </Link>
                  <Link
                    className="capitalize pb-1 border-b-[0.1px] text-[13px]"
                    href={`/films/edit/${original?.id}`}
                  >
                    send user a message
                  </Link>
                  <Link
                    className="capitalize pb-1 border-b-[0.1px] text-[13px]"
                    href={`/films/edit/${original?.id}`}
                  >
                    suspend user
                  </Link>
                  <Link
                    className="capitalize pb-1 border-b-[0.1px] text-[13px]"
                    href={`/films/edit/${original?.id}`}
                  >
                    delete
                  </Link>
                  {/* <div className="h-[1px] w-full bg-content2" />
                      <button className="">Toggle Status</button> */}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        );
      },
      meta: {
        cellProps: {
          className: cellClass,
        },
      },
    }),
  ];

  return (
    <div className={"flex flex-col items-center gap-7 mt-6 w-full"}>
      <section className="border-bottom border-content2 w-full rounded-lg ">
        <Table
          isPaginated
          manualPagination
          columns={UserColumns}
          data={usersArray}
          // isLoading={isLoading}
          // pageIndex={pageIndex - 1}
          // pageSize={10}
          // paginationProps={{ className: "!mt-0" }}
          // rowCount={rowCount}
          // onPageChange={handlePageChange}
        />
      </section>
    </div>
  );
};

export default UserManagementTable;
