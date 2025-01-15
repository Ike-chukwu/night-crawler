import React from "react";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-1 md:gap-10 md:items-center">
      <div className="flex w-full justify-between md:w-auto md:gap-3 items-center">
        <div className="flex items-center gap-2 md:flex">
          <div className="w-1 h-1 bg-black "></div>
          <span className="text-[12px] font-bold text-nowrap capitalize">
            Total Users
          </span>
        </div>
        <div className="w-[32px] text-[12px] h-[28px] flex justify-center items-center  border-[#D3D3D3] border-[0.1px] rounded-lg font-bold">
          86
        </div>
      </div>
      <div className="flex w-full justify-between md:w-auto md:gap-3 items-center">
        <div className="flex items-center gap-2 md:flex">
          <div className="w-1 h-1 bg-black "></div>
          <span className="text-[12px] font-bold capitalize">
            Subscriptions
          </span>
        </div>
        <div className="w-[32px] text-[12px] h-[28px] flex justify-center items-center  border-[#D3D3D3] border-[0.1px] rounded-lg font-bold">
          86
        </div>
      </div>
      <div className="flex w-full justify-between md:w-auto md:gap-3 items-center">
        <div className="flex items-center gap-2 md:flex">
          <div className="w-1 h-1 bg-black "></div>
          <span className="text-[12px] font-bold capitalize">Events</span>
        </div>
        <div className="w-[32px] text-[12px] h-[28px] flex justify-center items-center  border-[#D3D3D3] border-[0.1px] rounded-lg font-bold">
          86
        </div>
      </div>
    </div>
  );
};

export default Header;
