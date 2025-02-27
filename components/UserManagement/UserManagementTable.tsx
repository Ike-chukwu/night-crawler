"use client";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import { useRouter } from "next/navigation";
import React from "react";
import Table from "../ui/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { User } from "@/services/user-management/types";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { OptionIcon } from "../icons";
import { Button } from "../ui/button";
import { SearchParams } from "@/constants";
import NativeModal from "../NativeElements/NativeModal";
import UserMessageModal from "./UserMessageModal";
import {
  useDeleteUser,
  useSuspendUser,
  useUserManagement,
} from "@/hooks/useUserManagement";
import { toast } from "sonner";

const userColumnHelper = createColumnHelper<User>();
const cellClass = "border-b py-5 border-content2";

const UserManagementTable = () => {
  const { getQuery, changeQueries } = useRouterQuery();
  const page = getQuery(SearchParams.PAGE) || 1;
  const pageSize = 10;
  const filterString = getQuery(SearchParams.FILTER) || "";
  const action = getQuery(SearchParams.ACTION) || "";
  const filterByEmail = getQuery(SearchParams.SEARCHED_TERM) || "";
  const userId = getQuery(SearchParams.USER_ID) || "";
  const {
    users,
    isLoading,
    isSuccess,
    hasNextPage,
    limit,
    total,
    page: currentPositon,
  } = useUserManagement(
    filterString,
    page.toString(),
    pageSize.toString(),
    filterByEmail
  );
  // const {
  //   suspendUser,
  //   isPending: isSuspendingUser,
  //   isError: isSuspendUserError,
  // } = useSuspendUser({
  //   onSuccess: () => toast.success("User has been suspended!"),
  //   onError: () => toast.error("User cannot be suspended!"),
  // });
  const {
    deleteUser,
    isPending: isDeletingUser,
    isError: isDeleteUserError,
  } = useDeleteUser({
    onSuccess: () => toast.success("User has been deleted!"),
    onError: () => toast.error("User could not be deleted!"),
  });

  const UserColumns = [
    userColumnHelper.display({
      header: "S/N",
      cell: ({ row }) => {
        const safePageIndex = currentPositon ? currentPositon - 1 : 0;
        return row.index + 1 + safePageIndex * pageSize;
      },
    }),

    userColumnHelper.accessor("email", {
      header: "User Mail",

      meta: {
        cellProps: {
          className: cellClass,
        },
      },
    }),
    userColumnHelper.accessor("phone", {
      header: "Phone Number",
      meta: {
        cellProps: {
          className: cellClass,
        },
      },
    }),
    userColumnHelper.accessor("userType", {
      header: "User Type",
      meta: {
        cellProps: {
          className: cellClass,
        },
      },
    }),
    userColumnHelper.display({
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
                    className="capitalize pb-1 border-b-[0.1px] transition-all ease-in hover:font-bold text-[13px]"
                    href={`/user-management/user/${original?.userId}`}
                  >
                    View user
                  </Link>
                  <Link
                    className="capitalize pb-1 border-b-[0.1px] transition-all ease-in hover:font-bold text-[13px]"
                    href={`/user-management/userEvent/${original?.userId}`}
                  >
                    manage user events
                  </Link>
                  <p
                    className="capitalize cursor-pointer pb-1 border-b-[0.1px] transition-all ease-in hover:font-bold text-[13px]"
                    onClick={() =>
                      changeQueries({
                        [SearchParams.ACTION]: "sendMessage",
                        [SearchParams.USER_ID]: original.userId,
                      })
                    }
                  >
                    send user a message
                  </p>
                  {/* <p
                    className="capitalize cursor-pointer transition-all ease-in hover:font-bold pb-1 border-b-[0.1px] text-[13px]"
                    onClick={() => {
                      // console.log(original.id);
                      changeQueries({
                        [SearchParams.ACTION]: "suspendUser",
                        [SearchParams.USER_ID]: original.userId,
                      });
                    }}
                  >
                    suspend user
                  </p> */}
                  <p
                    className="capitalize pb-1 cursor-pointer transition-all ease-in border-b-[0.1px] hover:font-bold text-[13px]"
                    onClick={() => {
                      // console.log(original.id);
                      changeQueries({
                        [SearchParams.ACTION]: "deleteUser",
                        [SearchParams.USER_ID]: original.userId,
                      });
                    }}
                  >
                    delete
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
    // if (action == "suspendUser") {
    //   suspendUser(userId);
    if (action == "deleteUser") {
      deleteUser(userId);
    }
  };

  // for message modal
  const handleOpenMessageModal = () => {
    changeQueries({ [SearchParams.ACTION]: undefined });
  };

  return (
    <div className={"flex flex-col items-center gap-7 mt-6 w-full"}>
      <section className="border-bottom border-content2 w-full rounded-lg ">
        <Table
          isPaginated
          manualPagination
          columns={UserColumns}
          data={users || []}
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
      <UserMessageModal handleCloseDialog={handleOpenMessageModal} />
    </div>
  );
};

export default UserManagementTable;
