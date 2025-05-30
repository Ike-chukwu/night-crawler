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
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useRouterQuery } from "../../app/hooks/useRouterQuery";
import { SearchParams } from "@/constants";
import { title } from "process";

type Props = {
  children?: React.ReactNode;
  handleCloseDialog: () => void;
  // action: boolean;
  // actionType: string;
};

const NativeModal = ({
  children,
  // action,
  // actionType,
  handleCloseDialog,
}: Props) => {
  const { getQuery, changeQueries } = useRouterQuery();
  const action = getQuery(SearchParams.ACTION);
  const userId = getQuery(SearchParams.USER_ID) || "";

  const modalLook: () => {
    title: string;
    brief: string;
    btnText: string;
  } = () => {
    switch (action) {
      case "deleteUserEvent":
        return {
          title: "Delete Event",
          brief: "Are you sure you want to delete the event?",
          btnText: "delete",
        };
      case "suspendUser":
        return {
          title: "Suspension Status",
          brief: "Are you sure you want to continue with this action?",
          btnText: "continue",
        };
      case "deleteUser":
        return {
          title: "Delete user",
          brief: "Are you sure you want to delete the user?",
          btnText: "delete",
        };
      case "deactivatePlan":
        return {
          title: "Deactivate Plan",
          brief: "Are you sure you want to deactivate the plan?",
          btnText: "deactivate",
        };
      case "deletePlan":
        return {
          title: "Delete plan",
          brief: "Are you sure you want to delete the plan?",
          btnText: "delete",
        };
      case "approveRequest":
        return {
          title: "Approve Subcontractor",
          brief: "Are you sure you want to approve this request?",
          btnText: "approve",
        };
      case "deleteEvent":
        return {
          title: "Delete event",
          brief: "Are you sure you want to delete this event?",
          btnText: "delete",
        };
      case "restartSubscription":
        return {
          title: "Restart Subscription",
          brief: "Are you sure you want to restart this subscription?",
          btnText: "restart",
        };
      // case "cancelSubscription":
      //   return {
      //     title: "Cancel Subscription",
      //     brief: "Are you sure you want to cancel this subscription?",
      //     btnText: "cancel subscription",
      //   };

      default:
        return {
          title: "",
          brief: "",
          btnText: "",
        };
    }
  };

  useEffect(() => {
    console.log(action);
  }, [action]);

  return (
    <Dialog
      open={!!action}
      onOpenChange={() => {
        changeQueries({
          [SearchParams.ACTION]: undefined,
          [SearchParams.USER_ID]: undefined,
          [SearchParams.EVENT_ID]: undefined,
          [SearchParams.SUBCONTRACTOR_ID]: undefined,
        });
      }}
    >
      {/* <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <p className="text-[16px] uppercase text-[#7940ec]">
              {modalLook().title}
            </p>
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div> */}

          <p>{modalLook().brief}</p>
        </div>
        <DialogFooter>
          <div className="flex gap-3">
            <Button
              className={
                "bg-transparent capitalize " +
                (modalLook().btnText == "delete" ||
                modalLook().btnText == "continue" ||
                modalLook().btnText == "restart" ||
                modalLook().btnText == "deactivate"
                  ? // modalLook().btnText == "deactivate"
                    "text-red-500"
                  : "text-black")
              }
              onClick={() => {
                handleCloseDialog();
                console.log(`${modalLook().btnText}`);

                changeQueries({
                  [SearchParams.ACTION]: undefined,
                  [SearchParams.USER_ID]: undefined,
                  [SearchParams.EVENT_ID]: undefined,
                  [SearchParams.SUBCONTRACTOR_ID]: undefined,
                });
                // changeQueries({ [SearchParams.USER_ID]: undefined });
              }}
              type="submit"
            >
              {modalLook().btnText}
            </Button>
            <Button
              onClick={() => {
                changeQueries({
                  [SearchParams.ACTION]: undefined,
                  [SearchParams.USER_ID]: undefined,
                  [SearchParams.EVENT_ID]: undefined,
                  [SearchParams.SUBCONTRACTOR_ID]: undefined,
                });
              }}
              className="capitalize bg-transparent text-black"
              type="button"
            >
              back
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NativeModal;
