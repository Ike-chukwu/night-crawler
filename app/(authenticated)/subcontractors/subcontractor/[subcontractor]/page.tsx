"use client";
import { BackIcon } from "@/components/icons";
import CancelledSubscriptionsTable from "@/components/Plan Management/CancelledSubscriptionsTable";
import OnboardedUsersTable from "@/components/SubContractor/OnboardedUsersTable";
import { Button } from "@/components/ui/button";
import { SearchParams } from "@/constants";
import {
  useGetSubscriptionById,
  useRestartSubscription,
} from "@/hooks/usePlans";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import {
  useGetCustomersInASubContractor,
  useGetSubContractorById,
} from "@/hooks/useSubcontractors";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";

const Subcontractor = () => {
  const { back } = useRouter();
  const { subcontractor } = useParams();
  const { push, replace } = useRouter();
  const subConId = subcontractor?.toString() || "";
  const { changeQueries, getQuery } = useRouterQuery();
  const action = getQuery(SearchParams.ACTION);
  const page = getQuery(SearchParams.PAGE) || 1;
  const pageSize = 10;
  

  // const { user, subscription, isLoading } = useGetSubscriptionById(subConId);
  const {
    actualSubcontractor,
    isLoading: isActualSubContractorLoading,
    noOfSubscriptions,
    noOfUsers,
  } = useGetSubContractorById(subConId);
  const {
    // subcontractor,
    customers,
    isLoading: isCustomerLoading,
  } = useGetCustomersInASubContractor(
    subConId,
    page.toString(),
    pageSize.toString()
  );

  const {
    restartSubscription,
    isSuccess: isStatusSuccess,
    isError: isStatusError,
    isPending: isTogglingStatus,
  } = useRestartSubscription({
    onSuccess: () => toast.success("Subscription successfully restarted"),
    onError: () => toast.error("Status could not be restarted"),
  });

  const handleCloseDialog = () => {
    //get the id fromm the query and run the delete event api trigger
    // the code below this can be in the onSuccess the way bolu did to show the modal until request is successfful
    //check the kind of action in the url so as to know which endpint to call i.e use if calls here for that
    // if (action == "suspendUser") {
    //   suspendUser(userId);
    if (action == "restartSubscription") {
      restartSubscription(subConId);
    }
  };

  return isActualSubContractorLoading ? (
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
        <div className="mt-10 flex flex-col gap-6 py-4 md:py-0 md:flex-row px-4 justify-between items-center bg-[#F9F7FF]">
          {/* <div></div>
          <img
            className="w-[150px] h-[150px] rounded-full "
            src={actualSubcontractor?.w_9}
            alt=""
          /> */}
          <div className=" flex flex-col gap-7 py-8 px-6 rounded-[6px]">
            <div className="flex gap-3 items-center">
              <p className="text-[13px] w-[120px] capitalize">Fullname:</p>
              <p className="text-[13px] font-bold capitalize">
                {actualSubcontractor?.fullLegalName}
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <p className="text-[13px] w-[120px]">Email:</p>
              <p className="text-[13px] font-bold">
                {actualSubcontractor?.email}
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <p className="text-[13px] w-[120px]">Street address:</p>
              <p className="text-[13px] font-bold">
                {actualSubcontractor?.streetAddress}
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <p className="text-[13px] w-[120px]">State:</p>
              <p className="text-[13px] font-bold">
                {actualSubcontractor?.state}
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <p className="text-[13px] w-[120px]">Status:</p>
              <p className="text-[13px] font-bold">
                {actualSubcontractor?.status}
              </p>
            </div>
          </div>
          <Button
            onClick={() => {
              push(`/subcontractors/${subConId}`);
            }}
            className="text-[12px] bg-[#7940EC] capitalize "
          >
            View Identification
          </Button>
        </div>
        <div className="flex flex-col gap-12">
          <div className="">
            <p className="font-bold text-[16px] pb-1 capitalize">
              subcontractor analysis
            </p>
            <div className="flex py-3 md:py-0 gap-3 md:gap-0 flex-col md:flex-row justify-between md:items-center ">
              <div className="flex justify-between md:justify-start md:flex-col items-start gap-3">
                <p className="text-[14px] capitalize">total onboarded users</p>
                <p className="text-[14px] capitalize font-bold">{noOfUsers}</p>
              </div>
              <div className="flex justify-between md:flex-col md:justify-start items-start gap-3">
                <p className="text-[14px] capitalize">no of subscribers</p>
                <p className="text-[14px] capitalize font-bold">
                  {noOfSubscriptions}
                </p>
              </div>
              <div className="flex justify-between md:flex-col md:justify-start items-start gap-3">
                <p className="text-[14px] capitalize">active</p>
                <p className="text-[14px] capitalize font-bold">
                  {actualSubcontractor?.active ? "true" : "false"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <OnboardedUsersTable subId={subConId} />
      </div>
      {/* <NativeModal handleCloseDialog={handleCloseDialog} />
      <CancelSubscriptionModal /> */}
    </>
  );
};

export default Subcontractor;
