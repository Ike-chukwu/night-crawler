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

const subscribersColumnHelper = createColumnHelper<CancelledSubscription>();
const cellClass = "border-b py-5 border-content2";

type Props = {
  subId?: string;
};

const CancelledSubscriptionsTable = ({ subId }: Props) => {
  const { getQuery, changeQueries } = useRouterQuery();

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
    subscribersColumnHelper.display({
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
                    className="capitalize pb-1 border-b-[0.1px] text-[13px] transition-all ease-in hover:font-bold"
                    href={`/plan-management/plan/subscriber/${original?.subId}`}
                  >
                    View subscriber Detail
                  </Link>
                  {/* <p
                    className="capitalize cursor-pointer text-red-500 pb-1 border-b-[0.1px] text-[13px]"
                    onClick={() => {
                      // console.log(original.id);
                      changeQueries({
                        [SearchParams.ACTION]: "deleteEvent",
                        [SearchParams.EVENT_ID]: original?.eventId,
                      });
                    }}
                  >
                    Delete Event
                  </p> */}
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
