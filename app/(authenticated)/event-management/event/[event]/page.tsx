"use client";
import AttendeeTable from "@/components/EventManagement/AttendeeTable";
import { BackIcon } from "@/components/icons";
import NativeSelect from "@/components/NativeElements/NativeSelect";
import EventTable from "@/components/UserManagement/EventTables";
import { useGetEventById } from "@/hooks/useEventManagement";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { ClipLoader } from "react-spinners";

const ManageEvent = () => {
  const { push } = useRouter();
  const { event } = useParams();
  const eventId = event?.toString() || "";
  const { event: currentEvent, isLoading: isEventLoading } =
    useGetEventById(eventId);
  console.log(currentEvent);

  return (
    <div className="py-3">
      <div className="flex flex-col gap-3 md:gap-0 md:flex-row w-full justify-between">
        <Link href="/event-management" className="flex gap-2 mt-2 items-center">
          <BackIcon width="12" height="12" className="cursor-pointer" />
          <p className="text-[15px] font-bold capitalize">Back to events</p>
        </Link>
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
        </>
      )}
    </div>
  );
};

export default ManageEvent;
