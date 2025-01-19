"use client";
import React from "react";
import Table from "../ui/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { OptionIcon } from "../icons";
import Link from "next/link";
import { EventDetail } from "@/services/event-management/types";
import { SearchParams } from "@/constants";
import NativeModal from "../NativeElements/NativeModal";

const eventColumnHelper = createColumnHelper<EventDetail>();
const cellClass = "border-b py-5 border-content2";

const EventDetailTable = () => {
  const router = useRouter();
  const { getQuery, changeQueries } = useRouterQuery();

  const EventDetailsArray = [
    {
      id: "1",
      eventName: "Space Event",
      eventCategory: "Event Space",
      country: "U.S.A",
      eventLocation: "3315 Faith Church Rd, Indian Trail, NC 28079, USA",
      date: "17-10-24",
    },
    {
      id: "2",
      eventName: "Post Malone Concert",
      eventCategory: "Party Promoter",
      country: "U.S.A",
      eventLocation: "3315 Faith Church Rd, Indian Trail, NC 28079, USA",
      date: "17-10-24",
    },
    {
      id: "3",
      eventName: "Post Malone Concert",
      eventCategory: "Party Promoter",
      country: "U.S.A",
      eventLocation: "3315 Faith Church Rd, Indian Trail, NC 28079, USA",
      date: "17-10-24",
    },
  ];

  const EventDetailColumns = [
    eventColumnHelper.display({
      header: "S/N",
      cell: ({ row }) => row.index + 1,
      meta: {
        cellProps: {
          className: cellClass,
        },
      },
    }),

    eventColumnHelper.accessor("eventName", {
      header: "Event Name",

      meta: {
        cellProps: {
          className: cellClass,
        },
      },
    }),
    eventColumnHelper.accessor("eventCategory", {
      header: "Event Category",
      meta: {
        cellProps: {
          className: cellClass,
        },
      },
    }),
    eventColumnHelper.accessor("country", {
      header: "Country",
      meta: {
        cellProps: {
          className: cellClass,
        },
      },
    }),
    eventColumnHelper.accessor("eventLocation", {
      header: "Event Location",
      meta: {
        cellProps: {
          className: cellClass,
        },
      },
    }),
    eventColumnHelper.accessor("date", {
      header: "Date",
      meta: {
        cellProps: {
          className: cellClass,
        },
      },
    }),
    eventColumnHelper.display({
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
                    className="capitalize pb-1 border-b-[0.1px] text-[13px]"
                    href={`/event-management/event/${original?.id}`}
                  >
                    View event
                  </Link>
                  <p
                    className="capitalize cursor-pointer text-red-500 pb-1 border-b-[0.1px] text-[13px]"
                    onClick={() => {
                      // console.log(original.id);
                      changeQueries({
                        [SearchParams.ACTION]: "deleteEvent",
                      });
                    }}
                  >
                    Delete Event
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
          columns={EventDetailColumns}
          data={EventDetailsArray}
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

export default EventDetailTable;
