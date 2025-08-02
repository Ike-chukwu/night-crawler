import Notification from "@/components/Notifcations/Notification";
import NotificationsForm from "@/components/Notifcations/NotificationsForm";
import React from "react";

const NotificationsPage = () => {
  return (
    <div className="flex w-full justify-between gap-8 flex-col xl:flex-row ">
      <Notification />
      <NotificationsForm />
    </div>
  );
};

export default NotificationsPage;