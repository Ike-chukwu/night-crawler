"use client";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import { useRouter } from "next/navigation";
import React from "react";
import Table from "../ui/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { SearchParams } from "@/constants";
import { useGetAllCancelledSubscriptions } from "@/hooks/usePlans";
import { CancelledSubscription } from "@/services/plan-management/types";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { OptionIcon } from "../icons";
import Link from "next/link";
import {
  SubContractorCustomer,
  UserInSubContractor,
} from "@/services/subcontractor/types";
import { useGetCustomersInASubContractor } from "@/hooks/useSubcontractors";

const onboardedUsersColumnHelper = createColumnHelper<UserInSubContractor>();
const cellClass = "border-b py-5 border-content2";

type Props = {
  subId: string;
};

const OnboardedUsersTable = ({ subId }: Props) => {
  const { getQuery, changeQueries } = useRouterQuery();

  const page = getQuery(SearchParams.PAGE) || 1;
  const pageSize = 10;

  const { customers, isLoading: isCustomerLoading } =
    useGetCustomersInASubContractor(
      subId,
      page.toString(),
      pageSize.toString()
    );

  const cancelledSubscriptionColumns = [
    onboardedUsersColumnHelper.accessor("email", {
      header: "Email",
      meta: {
        cellProps: {
          className: cellClass,
        },
      },
    }),
    // onboardedUsersColumnHelper.accessor("userId", {
    //   header: "User ID",
    //   meta: {
    //     cellProps: {
    //       className: cellClass,
    //     },
    //   },
    // }),
    onboardedUsersColumnHelper.accessor("userType", {
      header: "User Type",
      meta: {
        cellProps: {
          className: cellClass,
        },
      },
    }),
    onboardedUsersColumnHelper.accessor("plan", {
      header: "Plan",
      meta: {
        cellProps: {
          className: cellClass,
        },
      },
    }),
    onboardedUsersColumnHelper.display({
      header: "Actions",
      cell: ({ row: { original } }) => {
        return (
          <div className="flex items-center justify-between gap-10">
            <Popover>
              <PopoverTrigger>
                <span>
                  <OptionIcon width={15} height={16} />
                </span>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex flex-col gap-3">
                  <Link
                    className="capitalize pb-1 border-b-[0.1px] transition-all ease-in hover:font-bold text-[13px]"
                    href={`/user-management/user/${original?.userId}`}
                  >
                    View User
                  </Link>
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
    <div className={"flex flex-col gap-7 mt-6 w-full"}>
      <p className=" text-[13px] md:text-[16px] font-bold">Onboarded Users</p>
      <section className="border-bottom border-content2 w-full rounded-lg mt-[-14]">
        <Table
          columns={cancelledSubscriptionColumns}
          data={customers || []}
          isLoading={isCustomerLoading}
          //   pageSize={10}
        />
      </section>
    </div>
  );
};

export default OnboardedUsersTable;
