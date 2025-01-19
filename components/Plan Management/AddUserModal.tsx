"use client";
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
import { useForm } from "react-hook-form";
import { useRouterQuery } from "@/app/hooks/useRouterQuery";
import { SearchParams } from "@/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type Props = {
  handleCloseDialog: () => void;
};

const schema = yup
  .object({
    planName: yup.string().required(),
    planPrice: yup.string().required(),
  })
  .required();

const AddUserModal = ({ handleCloseDialog }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { planName: "", planPrice: "" },
  });
  const { getQuery, changeQueries } = useRouterQuery();
  const action = getQuery(SearchParams.FORM_ACTION);

  const onSubmit = (data: { planName: string; planPrice: string }) => {
    changeQueries({ [SearchParams.FORM_ACTION]: undefined });
    reset();
    console.log(data);
  };

  return (
    <Dialog open={action === "addUser"} onOpenChange={handleCloseDialog}>
      {/* <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <p className="text-[16px] uppercase text-[#7940EC]">Add User</p>
          </DialogTitle>
        </DialogHeader>
        <form
          action=""
          className="py-2 flex flex-col items-start w-full gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full">
            <Label>Plan Name</Label>
            <Input
              className="mt-1"
              {...register("planName", { required: true })}
              placeholder="Enter plan name"
            />
            {errors.planName && (
              <p role="alert" className="py-2 text-red-500">
                Plan name is required
              </p>
            )}
          </div>
          <div className="w-full">
            <Label>Plan Price</Label>
            <Input
              className="mt-1"
              {...register("planPrice", { required: true })}
              placeholder="Enter plan price"
            />
            {errors.planPrice && (
              <p role="alert" className="py-2 text-red-500">
                Plan price is required
              </p>
            )}
          </div>
          <div className="mt-4 self-end">
            <DialogFooter>
              <Button
                onClick={() => {
                  changeQueries({ [SearchParams.FORM_ACTION]: undefined });
                  reset();
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
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserModal;
