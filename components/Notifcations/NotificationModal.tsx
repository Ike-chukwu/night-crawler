import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useRouterQuery } from "../../app/hooks/useRouterQuery";
import { SearchParams } from "@/constants";
import RecipientsTable from "./RecipientsTable";

const NotificationsModal = () => {
  const { getQuery, changeQueries } = useRouterQuery();
  const notificationId = getQuery(SearchParams.NOTIFICATION_ID);

  return (
    <Dialog
      open={!!notificationId}
      onOpenChange={() => {
        changeQueries({
          [SearchParams.NOTIFICATION_ID]: undefined,
        });
      }}
    >
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>
            <p className="text-[16px] uppercase text-[#7940EC]">
              Recipient Notifications
            </p>

            <RecipientsTable />
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationsModal;
