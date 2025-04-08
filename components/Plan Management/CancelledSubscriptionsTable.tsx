"use client";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import { useRouter } from "next/navigation";
import React from "react";
import Table from "../ui/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { SearchParams } from "@/constants";
import { useGetAllCancelledSubscriptions } from "@/hooks/usePlans";
import { CancelledSubscription } from "@/services/plan-management/types";

const subscribersColumnHelper = createColumnHelper<CancelledSubscription>();
const cellClass = "border-b py-5 border-content2";

type Props = {
  subId?: string;
};

const CancelledSubscriptionsTable = ({ subId }: Props) => {
  const { getQuery } = useRouterQuery();

  const page = getQuery(SearchParams.PAGE) || 1;
  const pageSize = 10;

  const {
    cancelledSubscriptions,
    isLoading: isCancelledSubscriptionLoading,
    total: totalCancelledSubcriptions,
  } = useGetAllCancelledSubscriptions(Number(page), pageSize, subId);

  const cancelledSubscriptionColumns = [
    subscribersColumnHelper.accessor("email", {
      header: "Name",

      meta: {
        cellProps: {
          className: cellClass,
        },
      },
    }),
    subscribersColumnHelper.accessor("cancelledAt", {
      header: "Cancellation Date",
      meta: {
        cellProps: {
          className: cellClass,
        },
      },
      cell: ({ getValue }) => {
        const dateString = getValue();
        const date = new Date(dateString);
        const isValidDate = date instanceof Date && !isNaN(date.getTime());

        if (!isValidDate) return "-";

        const options: Intl.DateTimeFormatOptions = {
          year: "numeric",
          month: "long",
          day: "numeric",
        };

        return date.toLocaleDateString("en-US", options);
      },
      sortingFn: (rowA, rowB) => {
        const a = new Date(rowA.original.cancelledAt).getTime();
        const b = new Date(rowB.original.cancelledAt).getTime();

        if (isNaN(a)) return 1;
        if (isNaN(b)) return -1;

        return b - a; 
      },
    }),
    subscribersColumnHelper.accessor("phone", {
      header: "Phone",
      meta: {
        cellProps: {
          className: cellClass,
        },
      },
    }),
    subscribersColumnHelper.accessor("cancellationReason", {
      header: "Reason for Cancellation",
      meta: {
        cellProps: {
          className: cellClass,
        },
      },
    }),
  ];

  return (
    <div className={"flex flex-col items-center gap-7 mt-6 w-full"}>
      <p className=" text-[13px] md:text-[16px] font-bold">
        Cancelled Subscriptions
      </p>
      <section className="border-bottom border-content2 w-full rounded-lg mt-[-14]">
        <Table
          columns={cancelledSubscriptionColumns}
          data={cancelledSubscriptions || []}
          isLoading={isCancelledSubscriptionLoading}
          //   pageSize={10}
        />
      </section>
    </div>
  );
};

export default CancelledSubscriptionsTable;
