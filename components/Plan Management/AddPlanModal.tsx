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
      runtime: undefined,
      type: undefined,
    },
  });
  const { getQuery, changeQueries } = useRouterQuery();
  //   const userId = getQuery(SearchParams.USER_ID) || "";
  const action = getQuery(SearchParams.FORM_ACTION);
  const {
    addPlan,
    isPending: isAddingPlan,
    isError: isAddingPlanError,
  } = useAddPlan({
    onSuccess: () => toast.success("Plan has been successfully added!!"),
    onError: () => toast.error("Plan could not be added!"),
  });
  const onSubmit = (data: PlanPayload) => {
    console.log(data);

    addPlan({
      name: data.name,
      price: data.price,
      post_per_month: data.post_per_month,
      runtime: data.runtime,
      type: data.type,
    });
    changeQueries({
      [SearchParams.FORM_ACTION]: undefined,
      //   [SearchParams.USER_ID]: undefined,
    });
    methods.reset();
  };

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
            <FormInput
              label="Post Per Month"
              name="post_per_month"
              placeholder="Enter no of posts per month"
              type="number"
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
