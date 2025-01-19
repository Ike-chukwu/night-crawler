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
    message: yup.string().required(),
  })
  .required();

const UserMessageModal = ({ handleCloseDialog }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { message: "" },
  });
  const { getQuery, changeQueries } = useRouterQuery();
  const action = getQuery(SearchParams.ACTION);
  const onSubmit = (data: { message: string }) => console.log(data);

  return (
    <Dialog open={action === "sendMessage"} onOpenChange={handleCloseDialog}>
      {/* <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <p className="text-[16px] uppercase text-[#7940EC]">
              send user a message
            </p>
          </DialogTitle>
        </DialogHeader>
        <form action="" className="py-2" onSubmit={handleSubmit(onSubmit)}>
          <Textarea
            {...register("message", { required: true })}
            placeholder="Type your message here."
          />
          {errors.message && (
            <p role="alert" className="py-2 text-red-500">
              Message is required
            </p>
          )}
          <DialogFooter>
            <div className="mt-4">
              <Button
                onClick={() => {
                  changeQueries({ [SearchParams.ACTION]: undefined });
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
                send
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserMessageModal;
