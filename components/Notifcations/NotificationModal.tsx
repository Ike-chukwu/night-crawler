import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useRouterQuery } from "../../app/hooks/useRouterQuery";
import { SearchParams } from "@/constants";
import RecipientsTable from "./RecipientsTable";

const NotificationsModal = () => {
  const { getQuery, changeQueries } = useRouterQuery();
  const action = getQuery(SearchParams.NOTIFICATION_ACTION);
  //   const userId = getQuery(SearchParams.USER_ID) || "";

  return (
    <Dialog
      open={action === "view_notification"}
      onOpenChange={() => {
        changeQueries({
          [SearchParams.NOTIFICATION_ACTION]: undefined,
          [SearchParams.NOTIFICATION_ID]: undefined,
        });
      }}
    >
      {/* <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger> */}
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
