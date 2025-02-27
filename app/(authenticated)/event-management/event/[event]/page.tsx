"use client";
import AttendeeTable from "@/components/EventManagement/AttendeeTable";
import { BackIcon } from "@/components/icons";
import NativeModal from "@/components/NativeElements/NativeModal";
import NativeSelect from "@/components/NativeElements/NativeSelect";
import { Button } from "@/components/ui/button";
import EventTable from "@/components/UserManagement/EventTables";
import { SearchParams } from "@/constants";
import { useDeleteEvent, useGetEventById } from "@/hooks/useEventManagement";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";

const ManageEvent = () => {
  const { push, back } = useRouter();
  const { event } = useParams();
  const eventId = event?.toString() || "";
  const { event: currentEvent, isLoading: isEventLoading } =
    useGetEventById(eventId);
  const { getQuery, changeQueries } = useRouterQuery();
  const action = getQuery(SearchParams.ACTION) || "";
  const {
    deleteEvent,
    isError,
    isPending: isDeletingEvent,
  } = useDeleteEvent({
    onSuccess: () => toast.success("Event successfully deleted"),
    onError: () => toast.error("Event could not be deleted"),
  });
  console.log(currentEvent);
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
    <div className="py-3">
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-3 md:gap-0 md:flex-row w-full justify-between">
          <div
            onClick={() => back()}
            className="flex cursor-pointer gap-2 mt-2 items-center"
          >
            <BackIcon width="12" height="12" className="cursor-pointer" />
            <p className="text-[15px] font-bold capitalize">Go Back</p>
          </div>
        </div>
        <Button
          onClick={() => {
            // console.log(original.id);
            changeQueries({
              [SearchParams.ACTION]: "deleteEvent",
              [SearchParams.EVENT_ID]: eventId,
            });
          }}
          className="text-[14px] bg-[#7940EC] capitalize "
        >
          delete event
        </Button>
      </div>
      {isEventLoading ? (
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
                src={currentEvent?.organizer.photo}
                className="w-[200px] h-[200px] rounded-full"
              />
              <p className="text-[15px] font-bold">
                {currentEvent?.organizer.name}
              </p>
            </div>
            <div className="flex w-full 2xl:flex-1 gap-7 flex-col md:flex-row py-10 px-4 justify-between xl:justify-start xl:gap-14 md:items-center">
              <img
                alt="event image"
                width={200}
                height={200}
                src={currentEvent?.organizer.photo}
                className="w-[300px] h-[300px] self-center md:self-start"
              />
              <div className="grid grid-cols-2 gap-8 md:w-[50%]">
                <div className="flex flex-col gap-1">
                  <p className="text-[13px] font-bold">{currentEvent?.title}</p>
                  <p className="text-[13px] font-light capitalize  ">Title</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-[13px] font-bold">
                    {currentEvent?.time.start} - {currentEvent?.time.end}{" "}
                  </p>
                  <p className="text-[13px] font-light capitalize  ">Time</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-[13px] font-bold">
                    {" "}
                    {`${currentEvent?.date.startDate}` +
                      " " +
                      "-" +
                      " " +
                      `${currentEvent?.date.endDate}`}
                  </p>
                  <p className="text-[13px] font-light capitalize">Days</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-[13px] font-bold">
                    {currentEvent?.category}
                  </p>
                  <p className="text-[13px] font-light capitalize">Category</p>
                </div>
                {/* <div className="flex flex-col gap-1">
                  <p className="text-[13px] font-bold">
                    {(currentEvent?.location)}
                  </p>
                  <p className="text-[13px] font-light capitalize">location</p>
                </div> */}
                <div className="flex flex-col gap-1">
                  <p className="text-[13px] font-bold">
                    {currentEvent?.minimumAge}
                  </p>
                  <p className="text-[13px] font-light capitalize">
                    minimum age
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <Link
                    className="text-[13px] font-bold"
                    href={currentEvent?.weblink || ""}
                  >
                    {currentEvent?.weblink}
                  </Link>
                  <p className="text-[13px] font-light capitalize">
                    event link
                  </p>
                </div>
              </div>
            </div>
          </div>
          <AttendeeTable
            data={currentEvent?.attendees || []}
            isLoading={isEventLoading}
          />
          <NativeModal
            // actionType={"deleteUserEvent"}
            handleCloseDialog={handleCloseDialog}
          />
        </>
      )}
    </div>
  );
};

export default ManageEvent;
