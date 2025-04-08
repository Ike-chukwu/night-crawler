"use client";
import { useRouterQuery } from "@/app/hooks/useRouterQuery";
import { BackIcon } from "@/components/icons";
import AddSubscribersModal from "@/components/Plan Management/AddSubscribersModal";
import CancelledSubscriptionsTable from "@/components/Plan Management/CancelledSubscriptionsTable";
import SubscribersTable from "@/components/Plan Management/SubscribersTable";
import { Button } from "@/components/ui/button";
import EventTable from "@/components/UserManagement/EventTables";
import { SearchParams } from "@/constants";
import { useGetUserEvent } from "@/hooks/useUserManagement";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { ClipLoader } from "react-spinners";

const SubscribersPage = () => {
  const { subscriber } = useParams();
  const subId = subscriber?.toString();

  const { push } = useRouter();
  const { changeQueries } = useRouterQuery();
  return (
    <div className="py-3">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 mt-2 items-center">
          <Link
            href="/plan-management"
            className="flex ease-in hover:font-bold items-center gap-3"
          >
            <BackIcon
              width="12"
              height="12"
              onClick={() => push("/plan-management")}
              className="cursor-pointer"
            />
            <span className="text-[15px] ">Back to Plans</span>
          </Link>
        </div>
        <Button
          onClick={() => {
            // console.log(original.id);
            changeQueries({
              [SearchParams.FORM_ACTION]: "createSubscription",
              [SearchParams.PLAN_ID]: subscriber,
            });
          }}
          className="text-[12px] bg-[#7940EC] capitalize "
        >
          Create Subscription
        </Button>
      </div>
      <SubscribersTable />
      <CancelledSubscriptionsTable subId={subId} />
      <AddSubscribersModal />
    </div>
  );
};

export default SubscribersPage;
