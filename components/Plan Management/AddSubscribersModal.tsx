import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { useRouterQuery } from "@/app/hooks/useRouterQuery";
import { SearchParams } from "@/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import {
  createSubscriptionSchema,
  SubscriptionPayload,
} from "@/services/plan-management/schema";
import {useCreateSubscription } from "@/hooks/usePlans";
import FormInput from "../Form/FormInput";

const AddSubscribersModal = () => {
  const methods = useForm({
    resolver: yupResolver(createSubscriptionSchema),
    defaultValues: {
      email: "",
      duration: 0,
    },
  });
  const { getQuery, changeQueries } = useRouterQuery();
  const action = getQuery(SearchParams.FORM_ACTION);
  const planId = getQuery(SearchParams.PLAN_ID);
  const { createSubscription, isPending: isAddingPlan } = useCreateSubscription(
    {
      onSuccess: () =>
        toast.success("Subscription has been successfully created!"),
      onError: () => toast.error("Subcription could not be created!"),
    }
  );
  const onSubmit = (data: SubscriptionPayload) => {
    console.log(data);

    createSubscription({
      email: data.email,
      planId,
      duration: data.duration,
    });
    changeQueries({
      [SearchParams.FORM_ACTION]: undefined,
      [SearchParams.PLAN_ID]: undefined,
    });
    methods.reset();
  };

  return (
    <Dialog
      open={action === "createSubscription"}
      onOpenChange={() => {
        changeQueries({
          [SearchParams.FORM_ACTION]: undefined,
          [SearchParams.PLAN_ID]: undefined,
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
              Create Subscription
            </p>
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form
            action=""
            className="py-2 flex flex-col gap-3"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <FormInput
              label="Email"
              name="email"
              placeholder="Enter your email"
              type="email"
            />
            <FormInput
              label="Duration"
              name="duration"
              placeholder="Enter your duration"
              type="number"
            />
            <DialogFooter>
              <div className="mt-4">
                <Button
                  onClick={() => {
                    changeQueries({
                      [SearchParams.FORM_ACTION_2]: undefined,
                      [SearchParams.PLAN_ID]: undefined,
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
                  Create
                </Button>
              </div>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default AddSubscribersModal;
