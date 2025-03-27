import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { FormProvider, useForm } from "react-hook-form";
import { useRouterQuery } from "@/app/hooks/useRouterQuery";
import { SearchParams } from "@/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSendMessage } from "@/hooks/useUserManagement";
import { toast } from "sonner";
import { PlanPayload, planSchema } from "@/services/plan-management/schema";
import { useAddPlan } from "@/hooks/usePlans";
import FormInput from "../Form/FormInput";
import FormSelect from "../Form/FormSelect";

type Props = {
  handleCloseDialog: () => void;
};

const AddPlanModal = ({ handleCloseDialog }: Props) => {
  const methods = useForm({
    resolver: yupResolver(planSchema),
    defaultValues: {
      name: "",
      post_per_month: undefined,
      price: undefined,
      runtime: 0,
      type: undefined,
    },
  });
  const { getQuery, changeQueries } = useRouterQuery();
  //   const userId = getQuery(SearchParams.USER_ID) || "";
  const action = getQuery(SearchParams.FORM_ACTION);
  const watchedPostValue = methods.watch("post_per_month");
  const {
    addPlan,
    isPending: isAddingPlan,
    isError: isAddingPlanError,
  } = useAddPlan({
    onSuccess: () => toast.success("Plan has been successfully added!!"),
    onError: () => toast.error("Plan could not be added!"),
  });
  const onSubmit = (data: PlanPayload) => {
    const post_per_month_conversion =
      data.post_per_month === "unlimited"
        ? "unlimited"
        : typeof data.post_per_month === "number"
        ? data.post_per_month
        : Number(data.post_per_month);
    console.log(post_per_month_conversion);
    addPlan({
      name: data.name,
      price: data.price,
      post_per_month: post_per_month_conversion,
      runtime: data.post_per_month === "unlimited" ? 30 : data.runtime,
      type: data.type,
      unlimited: data.post_per_month === "unlimited",
    });
    changeQueries({
      [SearchParams.FORM_ACTION]: undefined,
      //   [SearchParams.USER_ID]: undefined,
    });
    methods.reset();
  };

  useEffect(() => {
    if (watchedPostValue == "unlimited") {
      methods.setValue("runtime", 30);
    } else {
      methods.setValue("runtime", 0);
    }
  }, [watchedPostValue]);

  return (
    <Dialog
      open={action === "addPlan"}
      onOpenChange={() => {
        changeQueries({
          [SearchParams.FORM_ACTION]: undefined,
          //   [SearchParams.USER_ID]: undefined,
        });
      }}
    >
      {/* <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <p className="text-[16px] uppercase text-[#7940EC]">Add a plan</p>
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form
            action=""
            className="py-2 flex flex-col gap-3"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <FormInput
              label="Name"
              name="name"
              placeholder="Enter your name"
              type="text"
            />
            <FormInput
              label="Price"
              name="price"
              placeholder="Enter your price"
              type="number"
            />
            <FormSelect
              id="post_per_monthe"
              label="Post Per Month"
              name="post_per_month"
              placeholder="Enter no of posts per month"
              options={["12", "24", "6", "unlimited"]}
            />
            <FormSelect
              id="type"
              label="Type"
              name="type"
              options={["month", "week"]}
              placeholder={"Select type"}
            />
            <FormInput
              label="Runtime"
              name="runtime"
              placeholder="Enter runtime"
              type="number"
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
                  Add
                </Button>
              </div>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default AddPlanModal;
