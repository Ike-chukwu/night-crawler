"use client";
import React, { useState } from "react";
import Table from "../ui/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { OptionIcon } from "../icons";
import Link from "next/link";
import { EventAttendee } from "@/services/event-management/types";
import { SearchParams } from "@/constants";
import NativeModal from "../NativeElements/NativeModal";
import { useDeleteEvent, useListAllEvents } from "@/hooks/useEventManagement";
import { toast } from "sonner";

type TableProp = {
  data: EventAttendee[] | [];
  isLoading: boolean;
};
const eventAttendeeColumnHelper = createColumnHelper<EventAttendee>();
const cellClass = "border-b py-5 border-content2";

const AttendeeTable = ({ data, isLoading }: TableProp) => {
  const { getQuery, changeQueries } = useRouterQuery();
  const page = getQuery(SearchParams.PAGE) || 1;
  const pageSize = 10;
  const [pageIndex, setPageIndex] = useState(0); // For pagination if needed

  const EventDetailColumns = [
    eventAttendeeColumnHelper.display({
      header: "S/N",
      cell: ({ row }) => row.index + 1, // Render index + 1 for serial number
      meta: {
        cellProps: {
          className: cellClass,
        },
      },
    }),

    eventAttendeeColumnHelper.accessor("name", {
      header: "Name",

      meta: {
        cellProps: {
          className: cellClass,
        },
      },
    }),

    eventAttendeeColumnHelper.accessor("email", {
      header: "Email",
      meta: {
        cellProps: {
          className: cellClass,
        },
      },
    }),
    eventAttendeeColumnHelper.accessor("phone", {
      header: "Phone Number",
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

  return (
    <div className={"flex flex-col items-center gap-4 mt-12 w-full"}>
      <p className="font-bold text-[18px]">Attendees</p>
      <section className="border-bottom border-content2 w-full rounded-lg ">
        <Table
          //   isPaginated
          manualPagination
          columns={EventDetailColumns}
          data={data || []}
          isLoading={isLoading}
          pageIndex={pageIndex}
          pageSize={10}
          // paginationProps={{ className: "!mt-0" }}
          //   rowCount={total}
          onPageChange={(newPageIndex) => setPageIndex(newPageIndex)}
        />
      </section>
    </div>
  );
};

export default AttendeeTable;
