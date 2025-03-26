"use client";
import { BackIcon } from "@/components/icons";
import NativeModal from "@/components/NativeElements/NativeModal";
import { Button } from "@/components/ui/button";
import { SearchParams } from "@/constants";
import {
  useCancelSubscription,
  useGetSubscriptionById,
  useRestartSubscription,
} from "@/hooks/usePlans";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";

const SubscriberDetail = () => {
  const { back } = useRouter();
  const { subscriberDetail } = useParams();
  const subId = subscriberDetail?.toString() || "";
  const { changeQueries } = useRouterQuery();
  const { getQuery } = useRouterQuery();
  const action = getQuery(SearchParams.ACTION);
  const { user, subscription, isLoading } = useGetSubscriptionById(subId);
  const startDate = subscription?.startDate
    ? new Date(subscription.startDate)
    : null;
  const formattedStartDate = startDate
    ? new Intl.DateTimeFormat("en-GB").format(startDate)
    : "N/A";

  const endDate = subscription?.endDate ? new Date(subscription.endDate) : null;
  const formattedEndDate = endDate
    ? new Intl.DateTimeFormat("en-GB").format(endDate)
    : "N/A";
  const {
    restartSubscription,
    isSuccess: isStatusSuccess,
    isError: isStatusError,
    isPending: isTogglingStatus,
  } = useRestartSubscription({
    onSuccess: () => toast.success("Subscription successfully restarted"),
    onError: () => toast.error("Status could not be restarted"),
  });
  const { cancelSubscription, isPending: isCancellingSubscription } =
    useCancelSubscription({
      onSuccess: () => toast.success("Subscription successfully cancelled"),
      onError: () => toast.error("Subscription could not be cancelled"),
    });
  const handleCloseDialog = () => {
    //get the id fromm the query and run the delete event api trigger
    // the code below this can be in the onSuccess the way bolu did to show the modal until request is successfful
    //check the kind of action in the url so as to know which endpint to call i.e use if calls here for that
    // if (action == "suspendUser") {
    //   suspendUser(userId);
    if (action == "restartSubscription") {
      restartSubscription(subId);
    } else if (action == "cancelSubscription") {
      cancelSubscription(subId);
    }
  };

  return isLoading ? (
    <div className="flex w-full items-center h-[calc(100vh-400px)] justify-center">
      <ClipLoader size={100} />
    </div>
  ) : (
    <>
      <div className="flex flex-col gap-3 md:gap-0 md:flex-row w-full justify-between">
        <div
          onClick={() => back()}
          className="flex cursor-pointer gap-2 mt-2 items-center"
        >
          <BackIcon width="12" height="12" className="cursor-pointer" />
          <p className="text-[15px] font-bold capitalize">Go Back</p>
        </div>
      </div>
      <div className="flex w-full flex-col gap-[5rem]">
        <div className="md:w-[400px] md:mx-auto flex flex-col gap-7 py-8 px-6 bg-[#F9F7FF] rounded-[6px]">
          <div className="flex gap-3 items-center">
            <p className="text-[13px] w-[120px] capitalize">business name:</p>
            <p className="text-[13px] font-bold capitalize">
              {user?.businessName}
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <p className="text-[13px] w-[120px]">Username:</p>
            <p className="text-[13px] font-bold">{user?.userName}</p>
          </div>
          <div className="flex gap-3 items-center">
            <p className="text-[13px] w-[120px]">Email:</p>
            <p className="text-[13px] font-bold">{user?.userEmail}</p>
          </div>
        </div>
        <div className="flex flex-col gap-12  ">
          <div className=" flex justify-between items-center px-4">
            <div className=" flex flex-col items-start gap-3">
              <p className="text-[14px] capitalize">type</p>
              <p className="text-[14px] capitalize font-bold">
                {subscription?.type}
              </p>
            </div>
            <div className=" flex flex-col items-start gap-3">
              <p className="text-[14px] capitalize">active</p>
              <p className="text-[14px] capitalize font-bold">
                {subscription?.active ? "true" : "false"}
              </p>
            </div>
            <div className=" flex flex-col items-start gap-3">
              <p className="text-[14px] capitalize">no of renewals</p>
              <p className="text-[14px] capitalize font-bold">
                {subscription?.noOfRenewals}
              </p>
            </div>
          </div>
          <div className=" bg-[#F9F7FF] py-3 px-4 flex justify-between items-center rounded-[6px]">
            <div className=" flex flex-col items-start gap-6">
              <p className="text-[12px] md:text-[14px] capitalize">
                start date
              </p>
              <p className="text-[13px] md:text-[16px] capitalize font-bold">
                {formattedStartDate}
              </p>
              {/* <p className="text-[10px]  md:text-[12px] capitalize">(12:29pm)</p> */}
            </div>
            <div className=" flex flex-col items-start gap-6">
              <p className="text-[12px] md:text-[14px] capitalize">end date</p>
              <p className="text-[13px] md:text-[16px] capitalize font-bold">
                {formattedEndDate}
              </p>
              {/* <p className="text-[10px]  md:text-[12px] capitalize">(12:29pm)</p> */}
            </div>
            <div className=" flex flex-col items-center justify-center gap-2">
              <Button
                onClick={() =>
                  changeQueries({
                    [SearchParams.ACTION]: "restartSubscription",
                  })
                }
                className="text-[14px] bg-[#7940EC] capitalize "
              >
                restart
              </Button>
              <Button
                onClick={() =>
                  changeQueries({ [SearchParams.ACTION]: "cancelSubscription" })
                }
                className="text-[14px] capitalize bg-white text-black "
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
      <NativeModal handleCloseDialog={handleCloseDialog} />
    </>
  );
};

export default SubscriberDetail;
