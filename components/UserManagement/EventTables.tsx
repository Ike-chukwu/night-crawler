"use client";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import Table from "../ui/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { UserEvent } from "@/services/user-management/types";
import { DeleteIcon, OptionIcon } from "../icons";
import { SearchParams } from "@/constants";
import NativeModal from "../NativeElements/NativeModal";
import { useGetUserEvent } from "@/hooks/useUserManagement";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Link from "next/link";
import { useDeleteEvent } from "@/hooks/useEventManagement";
import { toast } from "sonner";

const eventColumnHelper = createColumnHelper<UserEvent>();
const cellClass = "border-b py-5 border-content2";

const EventTable = () => {
  const router = useRouter();
  const { getQuery, changeQueries } = useRouterQuery();
  const actionFromUrl = getQuery(SearchParams.ACTION);
  const page = getQuery(SearchParams.PAGE) || 1;
  const pageSize = 10;
  const filterString = getQuery(SearchParams.FILTER) || "";
  const action = getQuery(SearchParams.ACTION) || "";
  const filterByEmail = getQuery(SearchParams.SEARCHED_TERM) || "";
  const userId = getQuery(SearchParams.USER_ID) || "";
  const eventId = getQuery(SearchParams.EVENT_ID) || "";
  const {
    deleteEvent,
    isError,
    isPending: isDeletingEvent,
  } = useDeleteEvent({
    onSuccess: () => toast.success("Event successfully deleted"),
    onError: () => toast.error("Event could not be deleted"),
  });
  console.log(actionFromUrl);
  const { user } = useParams();
  const userIdFromUrl = user?.toString() || "";

  const {
    events,
    isLoading,
    limit,
    total,
    page: currentPositon,
  } = useGetUserEvent(
    userIdFromUrl,
    page.toString(),
    pageSize.toString(),
    filterByEmail
    // filterString,
  );

  const EventColumns = [
    eventColumnHelper.display({
      header: "S/N",
      cell: ({ row }) => row.index + 1,
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
    eventColumnHelper.accessor("createdAt", {
      header: "Date Created",
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
    eventColumnHelper.accessor("description", {
      header: "Description",
      meta: {
        cellProps: {
          className: cellClass,
        },
      },
    }),
    eventColumnHelper.accessor("address", {
      header: "Address",
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
          // <>
          //   <DeleteIcon
          //     width="16"
          //     height="16"
          //     className="cursor-pointer"
          //     onClick={() => {
          //       // console.log(original.id);
          //       changeQueries({ [SearchParams.ACTION]: "deleteUserEvent" });
          //     }}
          //   />
          // </>
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
    changeQueries({ [SearchParams.ACTION]: undefined });
  };

  return (
    <div className={"flex flex-col items-center gap-7 mt-6 w-full"}>
      <section className="border-bottom border-content2 w-full rounded-lg ">
        <Table
          isPaginated
          manualPagination
          columns={EventColumns}
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

export default EventTable;
