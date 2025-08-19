"use client";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import React from "react";
import Table from "../ui/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { SearchParams } from "@/constants";
import {
  RequesSubContractor,
  SubContractor,
} from "@/services/subcontractor/types";
import { useGetRequests } from "@/hooks/useSubcontractors";

const subContractorsColumnHelper = createColumnHelper<RequesSubContractor>();
const cellClass = "border-b py-5 border-content2";

const RequestsTable = () => {
  const { getQuery, changeQueries } = useRouterQuery();
  const page = getQuery(SearchParams.PAGE) || 1;
  const pageSize = 10;

  const {
    subContractorsRequests,
    isLoading,

    total,
    page: currentPositon,
  } = useGetRequests(page.toString(), pageSize.toString());

  const UserColumns = [
    subContractorsColumnHelper.display({
      header: "S/N",
      cell: ({ row }) => {
        const safePageIndex = currentPositon ? currentPositon - 1 : 0;
        return row.index + 1 + safePageIndex * pageSize;
      },
    }),

    subContractorsColumnHelper.display({
      header: "Name",
      cell: ({ row }) => `${row.original.firstname} ${row.original.lastname}`,
      meta: {
        cellProps: {
          className: cellClass,
        },
      },
    }),

    // subContractorsColumnHelper.accessor("email", {
    //   header: "Email",

    //   meta: {
    //     cellProps: {
    //       className: cellClass,
    //     },
    //   },
    // }),

    subContractorsColumnHelper.accessor("referalCode", {
      header: "Referral Code",
      meta: {
        cellProps: {
          className: cellClass,
        },
      },
    }),
    subContractorsColumnHelper.accessor("noOfSubscription", {
      header: "No of Subscriptions",
      meta: {
        cellProps: {
          className: cellClass,
        },
      },
    }),
    subContractorsColumnHelper.accessor("noOfUsers", {
      header: "No of Users",
      meta: {
        cellProps: {
          className: cellClass,
        },
      },
    }),
    subContractorsColumnHelper.accessor("createdAt", {
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
    subContractorsColumnHelper.accessor("active", {
      header: "Status",
      meta: {
        cellProps: {
          className: cellClass,
        },
      },
      cell: ({ row: { original } }) => {
        return <span>{original.active ? "Active" : "Inactive"}</span>;
      },
    }),
  ];

  const handlePageChange = (newPageIndex: number) => {
    changeQueries({ [SearchParams.PAGE]: newPageIndex + 1 });
  };

  return (
    <div className={"flex flex-col items-center gap-7 mt-6 w-full"}>
      <section className="border-bottom border-content2 w-full rounded-lg ">
        <Table
          isPaginated
          manualPagination
          columns={UserColumns}
          data={subContractorsRequests || []}
          isLoading={isLoading}
          pageIndex={currentPositon && currentPositon - 1}
          pageSize={10}
          // paginationProps={{ className: "!mt-0" }}
          rowCount={total}
          onPageChange={handlePageChange}
        />
      </section>
    </div>
  );
};

export default RequestsTable;
