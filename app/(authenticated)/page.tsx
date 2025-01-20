import AnalyticCard from "@/components/Analytics/AnalyticCard";
import {
  EventCreationIcon,
  LinkArrowIcon,
  PlanManagementIcon,
} from "@/components/icons";
import { UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="grid xl:grid-cols-2 gap-4">
      {/* <div className="py-4 px-4 flex flex-col justify-between h-[350px] rounded-md border-[#c5adf7] border-[0.1px]">
        <div className="flex items-center gap-2">
          <UserIcon width="18" height="18" color="black" />
          <span className="font-bold text-[14px]">User Management</span>
        </div>
        <Image
          alt="barChart"
          src="/barchat.png"
          width={400}
          height={200}
          className="w-full h-[216]"
        />
        <Link
          href=""
          className="self-end text-[#B691FF] flex items-center gap-2 "
        >
          <span className="text-[13px] underline">Go to User Management</span>
          <LinkArrowIcon width={12} height={12} />
        </Link>
      </div> */}
      <AnalyticCard
        icon={<UserIcon width="18" height="18" color="black" />}
        imgLink="/barchat.png"
        linkText="Go to User Management"
        title="User Management"
        href="/user-management"
      />
      <AnalyticCard
        icon={<PlanManagementIcon width="18" height="18" color="black" />}
        imgLink="/piechart.png"
        linkText="Go to Plan Management"
        title="Plan Management"
        href="/plan-management"
      />
      <AnalyticCard
        icon={<EventCreationIcon width="16" height="16" color="black" />}
        imgLink="/barchat.png"
        title="Top Event Creation Locations"
        filter={true}
        linkText="Go to Event Management"
        href="/event-management"
      />
      <AnalyticCard
        icon={<EventCreationIcon width="16" height="16" color="black" />}
        imgLink="/barchat.png"
        title="Top Event Attendance Locations"
        filter={true}
        linkText="Go to Event Management"
        href="/event-management"
      />
    </div>
  );
};

export default Home;
