"use client";
import { useRouterQuery } from "@/app/hooks/useRouterQuery";
import { BackIcon } from "@/components/icons";
import NativeModal from "@/components/NativeElements/NativeModal";
import { Button } from "@/components/ui/button";
import EventTable from "@/components/UserManagement/EventTables";
import { SearchParams } from "@/constants";
import {
  useDeleteUser,
  useGetUserById,
  useGetUserEvent,
  useSuspendUser,
} from "@/hooks/useUserManagement";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";

const ManageUser = () => {
  const { push } = useRouter();
  const { user } = useParams();
  const userId = user?.toString() || "";
  const { user: currentUser, isLoading: isUserLoading } =
    useGetUserById(userId);
  const { getQuery, changeQueries } = useRouterQuery();
  const action = getQuery(SearchParams.ACTION) || "";
  const {
    deleteUser,
    isPending: isDeletingUser,
    isError: isDeleteUserError,
  } = useDeleteUser({
    onSuccess: () => toast.success("User has been deleted!"),
    onError: () => toast.error("User could not be deleted!"),
  });
  const {
    suspendUser,
    isPending: isSuspendingUser,
    isError: isSuspendUserError,
  } = useSuspendUser({
    onSuccess: () => toast.success("Action is successful!"),
    onError: () => toast.error("Action Failed!"),
  });
  const handleCloseDialog = () => {
    //get the id fromm the query and run the delete event api trigger
    // the code below this can be in the onSuccess the way bolu did to show the modal until request is successfful
    //check the kind of action in the url so as to know which endpint to call i.e use if calls here for that
    if (action == "suspendUser") {
      suspendUser(userId);
    } else if (action == "deleteUser") {
      deleteUser(userId);
    }
    changeQueries({ [SearchParams.ACTION]: undefined });
  };
  return (
    <div className="py-3">
      <div className="flex flex-col gap-4 md:flex-row w-full justify-between">
        <div className="flex flex-col gap-3 md:gap-0 md:flex-row w-full justify-between">
          <Link
            href="/user-management"
            className="flex gap-2 mt-2 items-center"
          >
            <BackIcon width="12" height="12" className="cursor-pointer" />
            <p className="text-[15px] font-bold capitalize">Back to users</p>
          </Link>
        </div>
        <div className="flex flex-col w-full justify-between md:w-auto md:flex-row gap-4 md:gap-2">
          <Button
            onClick={() => {
              // console.log(original.id);
              changeQueries({
                [SearchParams.ACTION]: "deleteUser",
                [SearchParams.USER_ID]: user,
              });
            }}
            className="text-[14px] bg-[#7940EC] capitalize "
          >
            delete user
          </Button>
          <Button
            onClick={() => {
              // console.log(original.id);
              changeQueries({
                [SearchParams.ACTION]: "suspendUser",
                [SearchParams.USER_ID]: userId,
              });
            }}
            className="text-[14px] bg-[#7940EC] capitalize "
          >
            {currentUser?.suspended ? "unsuspend" : "suspend"}
          </Button>
        </div>
      </div>
      {isUserLoading ? (
        <div className="flex w-full items-center h-[calc(100vh-400px)] justify-center">
          <ClipLoader size={100} />
        </div>
      ) : (
        <>
          <div className="flex flex-col 2xl:flex-row rounded-md mt-8 border-[0.1px]  ">
            <div className="flex 2xl:w-[400px] flex-col gap-3 px-4 2xl:border-r-[0.1px] py-10 items-center justify-center">
              <img
                alt="organizer image"
                width={200}
                height={200}
                src={currentUser?.photo}
                className="w-[200px] h-[200px] rounded-full"
              />
              <p className="text-[15px] font-bold">
                {currentUser?.username || currentUser?.fullname}
              </p>
            </div>
            <div className="flex w-full pb-2 gap-7 flex-col md:flex-row md:py-6 px-4 justify-between xl:justify-start xl:gap-14 md:items-center">
              <div className="grid md:grid-cols-3 w-full gap-8 ">
                <div className="flex flex-col gap-1">
                  <p className="text-[13px] font-bold">
                    {currentUser?.fullname}
                  </p>
                  <p className="text-[13px] font-light capitalize  ">
                    Fullname
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-[13px] font-bold">{currentUser?.email}</p>
                  <p className="text-[13px] font-light capitalize  ">Email</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-[13px] font-bold">
                    {currentUser?.businessEmail}
                  </p>
                  <p className="text-[13px] font-light capitalize  ">
                    Business Email
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-[13px] font-bold">
                    {currentUser?.userType}
                  </p>
                  <p className="text-[13px] font-light capitalize  ">
                    Type of user
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-[13px] font-bold">{currentUser?.phone}</p>
                  <p className="text-[13px] font-light capitalize">
                    Phone Number
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-[13px] font-bold">
                    {currentUser?.businessCategory || "Unknown"}
                  </p>
                  <p className="text-[13px] font-light capitalize">
                    Business Category
                  </p>
                </div>
                {/* <div className="flex flex-col gap-1">
                  <p className="text-[13px] font-bold">
                    {(currentUser?.location)}
                  </p>
                  <p className="text-[13px] font-light capitalize">location</p>
                </div> */}
                <div className="flex flex-col gap-1">
                  <p className="text-[13px] font-bold">
                    {currentUser?.suspended ? "Suspended" : "Not Suspended"}
                  </p>
                  <p className="text-[13px] font-light capitalize">
                    suspension status
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  {currentUser?.socials &&
                  Object.keys(currentUser.socials).length > 0 ? (
                    Object.entries(currentUser.socials).map(([key, value]) => (
                      <span key={key} className="block py-2 text-[12px] ">
                        {key}:{" "}
                        <Link href={value} className="font-medium">
                          {value}
                        </Link>{" "}
                        <br />
                      </span>
                    ))
                  ) : (
                    <p className="text-[13px] font-bold">Unknown</p>
                  )}

                  <p className="text-[13px] font-light capitalize">
                    socials link
                  </p>
                </div>
              </div>
            </div>
          </div>

          <NativeModal
            // actionType={"deleteUserEvent"}
            handleCloseDialog={handleCloseDialog}
          />
        </>
      )}
    </div>
  );
};

export default ManageUser;
