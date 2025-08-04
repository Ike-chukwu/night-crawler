"use client";
import { useRouterQuery } from "@/app/hooks/useRouterQuery";
import { SearchParams } from "@/constants";
import React from "react";
import NotificationsModal from "./NotificationModal";
import { useGetAllNotifications } from "@/hooks/useNotifications";
import { ClipLoader } from "react-spinners";

const Notification = () => {
  const { changeQueries } = useRouterQuery();
  const { isLoading, notifications } = useGetAllNotifications();

  const clickNotificationHandler = (id: string) => {
    changeQueries({
      [SearchParams.NOTIFICATION_ID]: id,
    });
  };

  return (
    <>
      <div className="xl:w-[300px] w-full cursor-pointer bg-[#FDFDFD] border-2 border-grey xl:h-[80vh] overflow-y-auto px-6 py-6 rounded-xl ">
        <p className="text-[16px] font-bold capitalize pb-4">notifications</p>
        <div className="bg-[#FDFDFD] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-4">
          {isLoading ? (
            <div className="flex w-full items-center h-[calc(100vh-400px)] justify-center">
              <ClipLoader size={100} />
            </div>
          ) : (
            notifications?.map((notification) => (
              <div
                key={notification.id}
                onClick={() => clickNotificationHandler(notification.id)}
                className="bg-white w-full rounded-xl drop-shadow-xl px-3 py-4 flex flex-col gap-2"
              >
                <p className="font-bold capitalize">{notification.subject}</p>
                <p className="font-light">{notification.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
      <NotificationsModal />
    </>
  );
};

export default Notification;
