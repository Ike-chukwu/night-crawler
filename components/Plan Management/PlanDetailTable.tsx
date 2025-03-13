"use client";
import React from "react";
import Table from "../ui/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { OptionIcon } from "../icons";
import Link from "next/link";
import { SearchParams } from "@/constants";
import NativeModal from "../NativeElements/NativeModal";
import { PlanDetail } from "@/services/plan-management/types";
import { useGetAllPlans, useToggleStatus } from "@/hooks/usePlans";
import { toast } from "sonner";

const planColumnHelper = createColumnHelper<PlanDetail>();
const cellClass = "border-b py-5 border-content2";
export const defaultCellClass = "border-t border-content2 px-2";

const PlanDetailTable = () => {
  const { getQuery, changeQueries } = useRouterQuery();
  const {
    toggleStatus,
    isSuccess: isStatusSuccess,
    isError: isStatusError,
    isPending: isTogglingStatus,
  } = useToggleStatus({
    onSuccess: () => toast.success("Status successfully updated"),
    onError: () => toast.error("Status failed to update"),
  });
  const page = getQuery(SearchParams.PAGE) || 1;

  const {
    plans,
    isLoading: isLoadingPlans,
    isSuccess,
    isError,
  } = useGetAllPlans();

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

    planColumnHelper.accessor("name", {
      header: "Name",

      meta: {
        cellProps: {
          className: cellClass,
        },
      },
    }),
    planColumnHelper.accessor("price", {
      header: "Price",
      meta: {
        cellProps: {
          className: cellClass,
        },
      },
    }),
    planColumnHelper.accessor("subscribers", {
      header: "Subscribers",
      meta: {
        cellProps: {
          className: cellClass,
        },
      },
    }),
    planColumnHelper.accessor("active", {
      header: "Status",
      meta: {
        cellProps: { className: defaultCellClass },
      },
      cell: ({ row: { original } }) => {
        return <span>{original.active ? "Active" : "Inactive"}</span>;
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
                    className="capitalize cursor-pointer pb-1 transition-all ease-in hover:font-bold border-b-[0.1px] text-[13px]"
                    onClick={() => {
                      // console.log(original.id);
                      toggleStatus(original.planId);
                    }}
                    // href={`/event-management/event/${original?.id}`}
                  >
                    Toggle Plan Status
                  </p>
                  <Link
                    className="capitalize pb-1 border-b-[0.1px] transition-all ease-in hover:font-bold text-[13px]"
                    href={`/plan-management/plan/${original?.planId}`}
                  >
                    View Subscribers
                  </Link>
                  <p
                    className="capitalize cursor-pointer pb-1 transition-all ease-in hover:font-bold border-b-[0.1px] text-[13px]"
                    onClick={() => {
                      // console.log(original.id);
                      changeQueries({
                        [SearchParams.FORM_ACTION]: "createSubscription",
                        [SearchParams.PLAN_ID]: original.planId,
                      });
                    }}
                    // href={`/event-management/event/${original?.id}`}
                  >
                    Create Subscription
                  </p>
                  {/* <p
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
                  </p> */}
                  {/* <p
                    className="capitalize cursor-pointer text-red-500 pb-1 border-b-[0.1px] text-[13px]"
                    onClick={() => {
                      // console.log(original.id);
                      changeQueries({
                        [SearchParams.ACTION]: "deletePlan",
                      });
                    }}
                  >
                    Delete Plan
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
          // isPaginated
          // manualPagination
          columns={PlanDetailColumns}
          data={plans || []}
          isLoading={isLoadingPlans}
          pageIndex={1}
          pageSize={5}
          // paginationProps={{ className: "!mt-0" }}
          rowCount={5}
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
