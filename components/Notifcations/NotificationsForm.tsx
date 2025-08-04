"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { useRouterQuery } from "@/app/hooks/useRouterQuery";
import { SearchParams } from "@/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import FormTextArea from "../Form/FormTextArea";
import NativeSelect from "../NativeElements/NativeSelect";
import { Input } from "../ui/input";
import { useDebounce } from "use-debounce";
import {
  useSendNotification,
  useSendNotificationWithCSV,
} from "@/hooks/useNotifications";
import CustomSelectTable from "./CustomSelectTable";
import FormInput from "../Form/FormInput";
import {
  NotificationPayload,
  notificationSchema,
} from "@/services/notifications/schema";

const NotificationsForm = () => {
  const methods = useForm({
    resolver: yupResolver(notificationSchema),
    defaultValues: {
      emailMessage: "",
      smsMessage: "",
      subject: "",
    },
  });
  const { sendNotification, isPending: isSendingNotification } =
    useSendNotification({
      onSuccess: () =>
        toast.success("Notification has been successfully sent!"),
      onError: () => toast.error("Notification failed to send!"),
    });

  const { sendNotificationWithCSV, isPending: isSendingNotificationWithCsv } =
    useSendNotificationWithCSV({
      onSuccess: () =>
        toast.success("Notification has been successfully sent!"),
      onError: () => toast.error("Notification failed to send"),
    });

  const [csvFile, setCsvFile] = useState<Blob>();
  const { getQuery, changeQueries } = useRouterQuery();
  const filter = getQuery(SearchParams.FILTER) || "ALL";
  const notificationfilter =
    getQuery(SearchParams.NOTIFICATION_FILTER) || "USER";
  const intialSearchedTerm = getQuery(SearchParams.SEARCHED_TERM) || "";
  const formData = new FormData();
  const [inputValue, setInputValue] = useState(intialSearchedTerm);
  const [debouncedValue] = useDebounce(inputValue, 900);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedAdvertisers, setSelectedAdvertisers] = useState<string[]>([]);
  const [selectedSubcontractors, setSelectedSubcontractors] = useState<
    string[]
  >([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleFileUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) setCsvFile(e.currentTarget.files[0]);
  };

  const onSubmit = (values: NotificationPayload) => {
    if (csvFile) {
      const { subject, emailMessage, smsMessage } = values;
      formData.append("subject", subject || "");
      formData.append("emailMessage", emailMessage || "");
      formData.append("smsMessage", smsMessage || "");
      sendNotificationWithCSV(formData);
    } else {
      sendNotification({
        subject: values.subject,
        emailMessage: values.emailMessage,
        smsMessage: values.smsMessage,
        reciepientCategory: filter,
        customRecipients: {
          subcontractors: selectedSubcontractors,
          users: selectedUsers,
          businesses: selectedAdvertisers,
        },
      });
    }

    methods.reset();
    setSelectedAdvertisers([]);
    setSelectedSubcontractors([]);
    setSelectedUsers([]);
    setCsvFile(undefined);
    if (fileInputRef.current) {
      (fileInputRef.current as HTMLInputElement).value = "";
    }
  };
  useEffect(() => {
    if (csvFile) {
      formData.append("recipients_file", csvFile);
    }
  }, [csvFile]);

  useEffect(() => {
    changeQueries({
      [SearchParams.SEARCHED_TERM]: debouncedValue || undefined,
    });
  }, [debouncedValue]);

  useEffect(() => {
    if (filter !== "CUSTOM") {
      setSelectedAdvertisers([]);
      setSelectedSubcontractors([]);
      setSelectedUsers([]);
      changeQueries({
        [SearchParams.NOTIFICATION_FILTER]: undefined,
      });
    }
  }, [filter]);

  return (
    <FormProvider {...methods}>
      <form
        action=""
        className="py-2 flex flex-col  xl:w-[80%] md:h-[80vh] overflow-y-auto gap-20"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col md:flex-row w-full gap-10 justify-between ">
          <div className="md:w-[33%]">
            <p className="text-[14px] font-bold">Email Text Field</p>
            <FormTextArea
              name="emailMessage"
              placeholder="Enter your text"
              type="text"
              className="min-h-[200px] w-full"
            />
            <FormInput name="subject" placeholder="Enter subject" type="text" />
            <NativeSelect
              onChange={(value) =>
                changeQueries({
                  [SearchParams.FILTER]: value,
                })
              }
              placeholder="Send To"
              options={["ALL", "CUSTOMER", "BUSINESS", "AFFILIATE", "CUSTOM"]}
              className="w-full"
              value={filter}
            />
          </div>
          <div className="md:w-[33%]">
            <p className="text-[14px] font-bold">Sms Text Field</p>
            <FormTextArea
              name="smsMessage"
              placeholder="Enter your text"
              type="text"
              className="w-full min-h-[200px]"
            />
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileUploadChange}
              className="block w-full text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4 file:rounded-md
        file:border-0 file:text-sm file:font-semibold
        file:bg-[#7940EC] file:text-white
        hover:file:bg-[#7f52d8]"
            />
          </div>
          <Button
            type="submit"
            disabled={isSendingNotification || isSendingNotificationWithCsv}
            className="bg-transparent self-end md:self-start  cursor-pointer capitalize text-white bg-[#7940EC] px-8"
          >
            {isSendingNotification || isSendingNotificationWithCsv
              ? "Submitting"
              : "Submit"}
          </Button>
        </div>

        <div className="text-center w-full">
          {filter == "CUSTOM" ? (
            <div className=" bg-[#C0A6F6] w-full rounded-md px-3 py-2">
              <div className="flex flex-col gap-4 w-full md:flex-row justify-between items-center">
                <Input
                  className="w-full md:w-[300px]"
                  placeholder="Search by user by name"
                  value={inputValue || ""}
                  onChange={handleInputChange}
                />
                <NativeSelect
                  onChange={(value) =>
                    changeQueries({
                      [SearchParams.NOTIFICATION_FILTER]: value,
                      [SearchParams.PAGE]: 1,
                    })
                  }
                  placeholder="Send To"
                  options={["USER", "ADVERTISER", "SUBCONTRACTOR"]}
                  className="w-full md:w-[150px]"
                  value={notificationfilter || "USER"}
                />
              </div>
              <CustomSelectTable
                setSelectedAdvertisers={setSelectedAdvertisers}
                selectedUsers={selectedUsers}
                setSelectedUsers={setSelectedUsers}
                selectedAdvertisers={selectedAdvertisers}
                selectedSubcontractors={selectedSubcontractors}
                setSelectedSubcontractors={setSelectedSubcontractors}
              />
            </div>
          ) : (
            <p className="text-[15px]">
              Click on the “CUSTOM” from the options in the select field above
              to show users list
            </p>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default NotificationsForm;
