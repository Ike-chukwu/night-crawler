"use client";
import React, { useState } from "react";
import Table from "../ui/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import { useRouter } from "next/navigation";

import { SearchParams } from "@/constants";

import { useDeleteEvent, useListAllEvents } from "@/hooks/useEventManagement";
import { toast } from "sonner";
import { Recipient } from "@/services/notifications/types";
import { useGetNotificationsById } from "@/hooks/useNotifications";

const notificationsColumnHelper = createColumnHelper<Recipient>();
const cellClass = "border-b py-5 border-content2";

const RecipientsTable = () => {
  const { getQuery } = useRouterQuery();
  const page = getQuery(SearchParams.PAGE) || 1;
  const pageSize = 10;
  const [pageIndex, setPageIndex] = useState(0); // For pagination if needed
  const notificationId = getQuery(SearchParams.NOTIFICATION_ID) || "";
  const { recipients, isLoading } = useGetNotificationsById(notificationId);
  console.log(recipients);

  const NotificationColumns = [
    // notificationsColumnHelper.display({
    //   header: "S/N",
    //   cell: ({ row }) => row.index + 1, // Render index + 1 for serial number

    //   meta: {
    //     cellProps: {
    //       className: cellClass,
    //     },
    //   },
    // }),

    // notificationsColumnHelper.accessor("name", {
    //   header: "Name",
    //   meta: {
    //     cellProps: {
    //       className: cellClass,
    //     },
    //   },
    // }),
    notificationsColumnHelper.display({
      header: "Recipient",
      cell: ({ row }) => {
        return row.original.email || row.original.phone
          ? row.original.email || row.original.phone
          : "";
      },
      meta: {
        cellProps: {
          className: cellClass,
        },
      },
    }),
    notificationsColumnHelper.accessor("status", {
      header: "Status",
      meta: {
        cellProps: {
          className: cellClass,
        },
      },
    }),
  ];

  return (
    <div className={"flex flex-col items-center gap-7 mt-6 w-full"}>
      <section className="border-bottom border-content2 w-full rounded-lg h-[400px] ">
        <Table
          manualPagination
          columns={NotificationColumns}
          data={recipients || []}
          isLoading={isLoading}
          pageIndex={pageIndex}
          pageSize={10}
          onPageChange={(newPageIndex) => setPageIndex(newPageIndex)}
          // isPaginated
          // paginationProps={
        />
      </section>
    </div>
  );
};

export default RecipientsTable;
