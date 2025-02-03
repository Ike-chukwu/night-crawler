"use client";
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
      <div className="flex flex-col gap-4 py-8">
        <p className="text-[16px] font-bold text-center">
          More details about {currentEvent?.title}
        </p>
        <div className="flex flex-col gap-3">
          <p>Event Category :{currentEvent?.category}</p>
          <p>Event Description :{currentEvent?.description}</p>
          <p>Event Location :{currentEvent?.location}</p>
          <p>Minimum Age :{currentEvent?.minimumAge}</p>
          <p>Notification time :{currentEvent?.notificationTime}</p>
          <p>Web link :{currentEvent?.weblink}</p>
          <p>
            Days :
            {`${currentEvent?.date.startDate}` +
              " " +
              "-" +
              " " +
              `${currentEvent?.date.endDate}`}
          </p>
          <p>
            Days :
            {`${currentEvent?.date.startDate}` +
              " " +
              "-" +
              " " +
              `${currentEvent?.date.endDate}`}
          </p>
        </div>
      </div>
      {/* <div className="md:w-[700px] py-14">
        <Image
          src="/eventGraph.jpg"
          width={400}
          height={400}
          className="w-full"
          alt="image of event graph"
        />
      </div> */}
    </div>
  );
};

export default ManageEvent;
