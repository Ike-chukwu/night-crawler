import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

import { FormProvider, useForm } from "react-hook-form";
import { useRouterQuery } from "@/app/hooks/useRouterQuery";
import { SearchParams } from "@/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import {
  CancelSubscriptionPayload,
  cancelSubscriptionSchema,
} from "@/services/plan-management/schema";
import { useCancelSubscription } from "@/hooks/usePlans";

import { useParams } from "next/navigation";
import FormTextArea from "../Form/FormTextArea";

const CancelSubscriptionModal = () => {
  const methods = useForm({
    resolver: yupResolver(cancelSubscriptionSchema),
    defaultValues: {
      reason: "",
    },
  });
  const { getQuery, changeQueries } = useRouterQuery();
  const { subscriberDetail } = useParams();
  const subId = subscriberDetail?.toString() || "";
  const { cancelSubscription, isPending: isCancellingSubscription } =
    useCancelSubscription({
      onSuccess: () => toast.success("Subscription successfully cancelled"),
      onError: () => toast.error("Subscription could not be cancelled"),
    });
  const action = getQuery(SearchParams.FORM_ACTION);
  const onSubmit = (data: CancelSubscriptionPayload) => {
    const { reason } = data;
    cancelSubscription({ subId, reason });
    changeQueries({
      [SearchParams.FORM_ACTION]: undefined,
      //   [SearchParams.USER_ID]: undefined,
    });
    methods.reset();
  };

  return (
    <Dialog
      open={action === "cancelSubscription"}
      onOpenChange={() => {
        changeQueries({
          [SearchParams.FORM_ACTION]: undefined,
        });
      }}
    >
      {/* <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <p className="text-[16px] uppercase text-[#7940EC]">
              Cancel Subscription
            </p>
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form
            action=""
            className="py-2 flex flex-col gap-3"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <FormTextArea
              label="Reason"
              name="reason"
              placeholder="Enter your reason"
              type="text"
            />
            <DialogFooter>
              <div className="mt-4">
                <Button
                  onClick={() => {
                    changeQueries({
                      [SearchParams.FORM_ACTION]: undefined,
                      // [SearchParams.USER_ID]: undefined,
                    });
                    methods.reset();
                  }}
                  type="button"
                  className="bg-transparent capitalize text-black"
                >
                  cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-transparent capitalize text-[#7940EC]"
                >
                  Submit
                </Button>
              </div>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default CancelSubscriptionModal;
