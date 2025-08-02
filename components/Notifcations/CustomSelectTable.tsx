"use client";
import React, { useEffect } from "react";
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
import { useGetUserNotifications } from "@/hooks/useNotifications";
import { UsersNotif } from "@/services/notifications/types";
import { log } from "util";

const usersNotifColumnHelper = createColumnHelper<UsersNotif>();
const defaultCellClass = "border-b py-5 border-content2 text-left";
const selectedCellClass = "border-b bg-white py-5 border-content2 text-left";

type Props = {
  selectedUsers: string[];
  setSelectedUsers: React.Dispatch<React.SetStateAction<string[]>>;
  selectedAdvertisers: string[];
  setSelectedAdvertisers: React.Dispatch<React.SetStateAction<string[]>>;
  selectedSubcontractors: string[];
  setSelectedSubcontractors: React.Dispatch<React.SetStateAction<string[]>>;
};

const CustomSelectTable = ({
  selectedUsers,
  setSelectedUsers,
  selectedAdvertisers,
  selectedSubcontractors,
  setSelectedAdvertisers,
  setSelectedSubcontractors,
}: Props) => {
  const { getQuery, changeQueries } = useRouterQuery();
  const page = getQuery(SearchParams.PAGE) || 1;
  const pageSize = 10;
  const notificationfilter =
    getQuery(SearchParams.NOTIFICATION_FILTER) || "USER";
  const initialSearchedTerm = getQuery(SearchParams.SEARCHED_TERM) || "";

  const { users, isLoading } = useGetUserNotifications(
    notificationfilter,
    page.toString(),
    initialSearchedTerm
  );

  const UserNotifColumns = [
    usersNotifColumnHelper.display({
      header: "S/N",
      cell: ({ row }) => row.index + 1,
      meta: {
        cellProps: {
          className: defaultCellClass,
        },
      },
    }),

    usersNotifColumnHelper.accessor("name", {
      header: "Name",

      meta: {
        cellProps: {
          className: defaultCellClass,
        },
      },
    }),
    usersNotifColumnHelper.accessor("email", {
      header: "Email",

      meta: {
        cellProps: {
          className: defaultCellClass,
        },
      },
    }),
    usersNotifColumnHelper.display({
      header: "Status",
      cell: ({ row }) => {
        const { userId } = row.original;

        const isSelected =
          (notificationfilter === "USER" && selectedUsers.includes(userId)) ||
          (notificationfilter === "ADVERTISER" &&
            selectedAdvertisers.includes(userId)) ||
          (notificationfilter === "SUBCONTRACTOR" &&
            selectedSubcontractors.includes(userId));

        return <div>{isSelected ? "✓" : "Not Selected"}</div>;
      },
      meta: {
        cellProps: {
          className: defaultCellClass,
        },
      },
    }),
    usersNotifColumnHelper.display({
      header: "Actions",
      cell: ({ row: { original } }) => {
        return (
          <div className="flex items-center  justify-between gap-10">
            <Popover>
              <PopoverTrigger>
                <span>
                  <OptionIcon width={15} height={16} />
                </span>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex flex-col gap-3">
                  <p
                    onClick={() => {
                      if (notificationfilter == "USER") {
                        const selectedUsersCopy = [...selectedUsers];
                        const isSelected = selectedUsersCopy.includes(
                          original.userId
                        );
                        if (isSelected) return;
                        else {
                          selectedUsersCopy.push(original.userId);
                        }
                        setSelectedUsers(selectedUsersCopy);
                      } else if (notificationfilter == "ADVERTISER") {
                        const selectedAdvertiserCopy = [...selectedAdvertisers];
                        const isSelected = selectedAdvertiserCopy.includes(
                          original.userId
                        );
                        if (isSelected) return;
                        else {
                          selectedAdvertiserCopy.push(original.userId);
                        }
                        setSelectedAdvertisers(selectedAdvertiserCopy);
                      } else if (notificationfilter == "SUBCONTRACTOR") {
                        const selectedSubcontractorsCopy = [
                          ...selectedSubcontractors,
                        ];
                        const isSelected = selectedSubcontractorsCopy.includes(
                          original.userId
                        );
                        if (isSelected) return;
                        else {
                          selectedSubcontractorsCopy.push(original.userId);
                        }
                        setSelectedSubcontractors(selectedSubcontractorsCopy);
                      }
                    }}
                    className="capitalize cursor-pointer pb-1 border-b-[0.1px] text-[13px]"
                  >
                    Select
                  </p>
                  <p
                    className="capitalize cursor-pointer text-red-500 pb-1 border-b-[0.1px] text-[13px]"
                    onClick={() => {
                      if (notificationfilter == "USER") {
                        const filteredUsers = selectedUsers.filter(
                          (user) => user !== original.userId
                        );
                        setSelectedUsers(filteredUsers);
                      } else if (notificationfilter == "ADVERTISER") {
                        const filteredAdvertisers = selectedAdvertisers.filter(
                          (user) => user !== original.userId
                        );
                        setSelectedAdvertisers(filteredAdvertisers);
                      } else if (notificationfilter == "SUBCONTRACTOR") {
                        const filteredSubcontractors =
                          selectedAdvertisers.filter(
                            (user) => user !== original.userId
                          );
                        setSelectedSubcontractors(filteredSubcontractors);
                      }
                    }}
                  >
                    Deselect
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        );
      },
      meta: {
        cellProps: {
          className: defaultCellClass,
        },
      },
    }),
  ];

  useEffect(() => {
    console.log(selectedUsers, selectedAdvertisers, selectedSubcontractors);
  }, [selectedUsers]);

  return (
    <div className={"flex flex-col gap-7 mt-6 w-full"}>
      <section className="border-bottom border-content2 w-full rounded-lg h-[400px]">
        <Table
          columns={UserNotifColumns}
          data={users || []}
          isLoading={isLoading}
          pageSize={10}
          // paginationProps={{ className: "!mt-0" }}
        />
      </section>
    </div>
  );
};

export default CustomSelectTable;
