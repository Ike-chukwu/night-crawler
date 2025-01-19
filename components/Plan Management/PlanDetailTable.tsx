"use client";
import React from "react";
import Table from "../ui/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { OptionIcon } from "../icons";
import Link from "next/link";
import { PlanDetail } from "@/services/plan-management";
import { SearchParams } from "@/constants";
import NativeModal from "../NativeElements/NativeModal";

const planColumnHelper = createColumnHelper<PlanDetail>();
const cellClass = "border-b py-5 border-content2";

const PlanDetailTable = () => {
  const router = useRouter();
  const { getQuery, changeQueries } = useRouterQuery();

  const PlanDetailsArray = [
    {
      id: "1",
      plan: "25 posts /month  x24h runtime",
      price: "$5.99/m",
      subscriber: "100",
      status: "Active",
    },
    {
      id: "2",
      plan: "6 posts/month x48h runtime",
      price: "$6.99/m",
      subscriber: "100",
      status: "Active",
    },
    {
      id: "3",
      plan: "4 posts per month  x24h runtime",
      price: "$1.99/m",
      subscriber: "100",
      status: "Active",
    },
    {
      id: "4",
      plan: "Unlimited post per month x30d runtime",
      price: "$9.99/m",
      subscriber: "100",
      status: "Active",
    },
  ];

  const PlanDetailColumns = [
    planColumnHelper.display({
      header: "S/N",
      cell: ({ row }) => row.index + 1,
      meta: {
        cellProps: {
          className: cellClass,
        },
      },
    }),

    planColumnHelper.accessor("plan", {
      header: "Plan",

      meta: {
        cellProps: {
          className: cellClass,
        },
      },
    }),
    planColumnHelper.accessor("subscriber", {
      header: "Subscriber",
      meta: {
        cellProps: {
          className: cellClass,
        },
      },
    }),
    planColumnHelper.accessor("status", {
      header: "Status",
      meta: {
        cellProps: {
          className: cellClass,
        },
      },
    }),
    planColumnHelper.display({
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
                  <p
                    className="capitalize cursor-pointer pb-1 border-b-[0.1px] text-[13px]"
                    onClick={() => {
                      // console.log(original.id);
                      changeQueries({
                        [SearchParams.ACTION]: "deactivatePlan",
                      });
                    }}
                    // href={`/event-management/event/${original?.id}`}
                  >
                    Deactivate Plan
                  </p>
                  <p
                    className="capitalize cursor-pointer text-red-500 pb-1 border-b-[0.1px] text-[13px]"
                    onClick={() => {
                      // console.log(original.id);
                      changeQueries({
                        [SearchParams.ACTION]: "deletePlan",
                      });
                    }}
                  >
                    Delete Plan
                  </p>
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
  const handleCloseDialog = () => {
    //get the id fromm the query and run the delete event api trigger
    // the code below this can be in the onSuccess the way bolu did to show the modal until request is successfful
    //check the kind of action in the url so as to know which endpint to call i.e use if calls here for that
    changeQueries({ [SearchParams.ACTION]: undefined });
  };

  return (
    <div className={"flex flex-col items-center gap-7 mt-6 w-full"}>
      <section className="border-bottom border-content2 w-full rounded-lg ">
        <Table
          isPaginated
          manualPagination
          columns={PlanDetailColumns}
          data={PlanDetailsArray}
          // isLoading={isLoading}
          // pageIndex={pageIndex - 1}
          // pageSize={10}
          // paginationProps={{ className: "!mt-0" }}
          // rowCount={rowCount}
          // onPageChange={handlePageChange}
        />
      </section>
      <NativeModal
        // actionType={"deleteUserEvent"}
        handleCloseDialog={handleCloseDialog}
      />
    </div>
  );
};

export default PlanDetailTable;
