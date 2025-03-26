import Link from "next/link";
import React from "react";
import { ClipLoader } from "react-spinners";

type Props = {
  isLoading: boolean;
  data?: DashboardStats;
};

const Header = ({ isLoading, data }: Props) => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-1 md:gap-10 md:items-center">
      {/* {data &&
        Object.entries(data).map(([key, value]) => (
          <div className="flex w-full justify-between md:w-auto md:gap-3 items-center">
            <div className="flex items-center gap-2 md:flex">
              <div className="w-1 h-1 bg-black "></div>
              <span className="text-[12px] font-bold text-nowrap capitalize">
                {isLoading ? <ClipLoader /> : key}
              </span>
            </div>
            <div className="w-[32px] text-[12px] h-[28px] flex justify-center items-center  border-[#D3D3D3] border-[0.1px] rounded-lg font-bold">
              {isLoading ? <ClipLoader /> : value}
            </div>
          </div>
        ))} */}
      <div className="flex w-full justify-between md:w-auto md:gap-3 items-center">
        <div className="flex items-center gap-2 md:flex">
          <div className="w-1 h-1 bg-black "></div>
          <span className="text-[12px] font-bold text-nowrap capitalize">
            Total Users
          </span>
        </div>
        <Link href="/user-management">
          <div className="w-[32px] text-[12px] h-[28px] flex justify-center items-center  border-[#D3D3D3] border-[0.1px] rounded-lg font-bold">
            {isLoading ? <ClipLoader size={10} /> : data?.totalUsers}
          </div>
        </Link>
      </div>
      <div className="flex w-full justify-between md:w-auto md:gap-3 items-center">
        <div className="flex items-center gap-2 md:flex">
          <div className="w-1 h-1 bg-black "></div>
          <span className="text-[12px] font-bold capitalize">
            Subscriptions
          </span>
        </div>
        <Link href="/plan-management">
          <div className="w-[32px] text-[12px] h-[28px] flex justify-center items-center  border-[#D3D3D3] border-[0.1px] rounded-lg font-bold">
            {isLoading ? <ClipLoader size={10} /> : data?.subscriptions}
          </div>
        </Link>
      </div>
      <div className="flex w-full justify-between md:w-auto md:gap-3 items-center">
        <div className="flex items-center gap-2 md:flex">
          <div className="w-1 h-1 bg-black "></div>
          <span className="text-[12px] font-bold capitalize">Events</span>
        </div>
        <Link href="/event-management">
          <div className="w-[32px] text-[12px] h-[28px] flex justify-center items-center  border-[#D3D3D3] border-[0.1px] rounded-lg font-bold">
            {isLoading ? <ClipLoader size={10} /> : data?.events}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
