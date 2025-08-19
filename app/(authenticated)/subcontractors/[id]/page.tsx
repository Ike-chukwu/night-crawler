"use client";
import { BackIcon } from "@/components/icons";
import NativeModal from "@/components/NativeElements/NativeModal";
import CancelledSubscriptionsTable from "@/components/Plan Management/CancelledSubscriptionsTable";
import CancelSubscriptionModal from "@/components/Plan Management/CancelSubscriptionModal";
import RejectRequestModal from "@/components/SubContractor/CancelRequestModal";
import OnboardedUsersTable from "@/components/SubContractor/OnboardedUsersTable";
import { Button } from "@/components/ui/button";
import { SearchParams } from "@/constants";
import {
  useGetSubscriptionById,
  useRestartSubscription,
} from "@/hooks/usePlans";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import {
  useApproveSubContractor,
  useGetSubContractorById,
} from "@/hooks/useSubcontractors";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";

const MoreOnSubcontractor = () => {
  const { back } = useRouter();
  const { id } = useParams();
  const subConId = id?.toString() || "";
  const {
    actualSubcontractor,
    isLoading: isActualSubContractorLoading,
    noOfSubscriptions,
    noOfUsers,
  } = useGetSubContractorById(subConId);
  const { changeQueries, getQuery } = useRouterQuery();
  const action = getQuery(SearchParams.ACTION);

  const { approveRequest, isPending: isApprovingRequest } =
    useApproveSubContractor({
      onSuccess: () => toast.success("Request successfully approved"),
      onError: () => toast.error("request failed"),
    });

  const handleCloseDialog = () => {
    if (action == "approveRequest") {
      approveRequest({ subId: subConId });
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
          <div className="flex flex-col gap-3">
            {actualSubcontractor?.status == "APPROVE" ? (
              <Button
                onClick={() => {
                  // console.log(original.id);
                  changeQueries({
                    [SearchParams.FORM_ACTION]: "rejectSubcontractor",
                    [SearchParams.SUBCONTRACTOR_ID]: subConId,
                  });
                }}
                className="text-[12px] bg-white capitalize text-[#FF5D00] "
              >
                Reject Request
              </Button>
            ) : (
              <Button
                onClick={() => {
                  // console.log(original.id);
                  changeQueries({
                    [SearchParams.ACTION]: "approveRequest",
                    [SearchParams.SUBCONTRACTOR_ID]: subConId,
                  });
                }}
                className="text-[12px] bg-[#7940EC] capitalize "
              >
                Approve Request
              </Button>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4 xl:flex-row justify-between">
          {/* <Link
            className="xl:w-[30%] h-[320px] block"
            href={
              actualSubcontractor?.socialSecurity
                ? actualSubcontractor?.socialSecurity
                : ""
            }
          >
            <img
              className="w-full h-full"
              src={actualSubcontractor?.socialSecurity}
              alt=""
            />
          </Link>
          <Link
            className="w-full xl:w-[30%] h-[320px] block"
            href={actualSubcontractor?.w_9 ? actualSubcontractor?.w_9 : ""}
          >
            <img
              className="w-full h-full"
              src={actualSubcontractor?.w_9}
              alt=""
            />
          </Link> */}
          <Link
            className="xl:w-[30%] h-[320px] block"
            href={
              actualSubcontractor?.governmentId
                ? actualSubcontractor?.governmentId
                : ""
            }
          >
            <img
              className="w-full h-full"
              src={actualSubcontractor?.governmentId}
              alt=""
            />
          </Link>
        </div>
        {/* <OnboardedUsersTable subId={subId} /> */}
      </div>
      <NativeModal handleCloseDialog={handleCloseDialog} />
      <RejectRequestModal />
    </>
  );
};

export default MoreOnSubcontractor;
