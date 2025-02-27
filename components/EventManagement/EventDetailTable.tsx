"use client";
import React from "react";
import Table from "../ui/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { OptionIcon } from "../icons";
import Link from "next/link";
import { EventDetailInTable } from "@/services/event-management/types";
import { SearchParams } from "@/constants";
import NativeModal from "../NativeElements/NativeModal";
import { useDeleteEvent, useListAllEvents } from "@/hooks/useEventManagement";
import { toast } from "sonner";

const eventColumnHelper = createColumnHelper<EventDetailInTable>();
const cellClass = "border-b py-5 border-content2";

const EventDetailTable = () => {
  const router = useRouter();
  const { getQuery, changeQueries } = useRouterQuery();
  const page = getQuery(SearchParams.PAGE) || 1;
  const pageSize = 10;
  const filterString = getQuery(SearchParams.FILTER);
  const action = getQuery(SearchParams.ACTION) || "";
  const eventName = getQuery(SearchParams.SEARCHED_TERM) || "";
  const eventId = getQuery(SearchParams.EVENT_ID) || "";
  const {
    events,
    isLoading,
    isSuccess,
    hasNextPage,
    limit,
    total,
    page: currentPositon,
  } = useListAllEvents(
    filterString,
    page.toString(),
    pageSize.toString(),
    eventName,
    // filterByEmail
    "America/New_York"
  );
  const {
    deleteEvent,
    isError,
    isPending: isDeletingEvent,
  } = useDeleteEvent({
    onSuccess: () => toast.success("Event successfully deleted"),
    onError: () => toast.error("Event could not be deleted"),
  });
  console.log(events);

  const EventDetailColumns = [
    eventColumnHelper.display({
      header: "S/N",
      cell: ({ row }) => {
        const safePageIndex = currentPositon ? currentPositon - 1 : 0;
        return row.index + 1 + safePageIndex * pageSize;
      },
      meta: {
        cellProps: {
          className: cellClass,
        },
      },
    }),

    eventColumnHelper.accessor("title", {
      header: "Title",

      meta: {
        cellProps: {
          className: cellClass,
        },
      },
    }),
    // eventColumnHelper.accessor("address", {
    //   header: "Address",
    //   meta: {
    //     cellProps: {
    //       className: cellClass,
    //     },
    //   },
    // }),
    eventColumnHelper.accessor("createdAt", {
      header: "Creation Date",
      meta: {
        cellProps: {
          className: cellClass,
        },
      },
      cell: ({ getValue }) => {
        const dateString = getValue();
        const date = new Date(dateString);

        const options: Intl.DateTimeFormatOptions = {
          year: "numeric",
          month: "long",
          day: "numeric",
        };

        return date.toLocaleDateString("en-US", options);
      },
    }),
    eventColumnHelper.accessor("organizer.name", {
      header: "Organizer",
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
                    href={`/event-management/event/${original?.eventId}`}
                  >
                    View event
                  </Link>
                  <p
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

  const handlePageChange = (newPageIndex: number) => {
    changeQueries({ [SearchParams.PAGE]: newPageIndex + 1 });
  };

  const handleCloseDialog = () => {
    //get the id fromm the query and run the delete event api trigger
    // the code below this can be in the onSuccess the way bolu did to show the modal until request is successfful
    //check the kind of action in the url so as to know which endpint to call i.e use if calls here for that
    if (action == "deleteEvent") {
      deleteEvent({ eventId });
    }
    // changeQueries({ [SearchParams.ACTION]: undefined });
  };

  return (
    <div className={"flex flex-col items-center gap-7 mt-6 w-full"}>
      <section className="border-bottom border-content2 w-full rounded-lg ">
        <Table
          isPaginated
          manualPagination
          columns={EventDetailColumns}
          data={events || []}
          isLoading={isLoading}
          pageIndex={currentPositon && currentPositon - 1}
          pageSize={10}
          // paginationProps={{ className: "!mt-0" }}
          rowCount={total}
          onPageChange={handlePageChange}
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
