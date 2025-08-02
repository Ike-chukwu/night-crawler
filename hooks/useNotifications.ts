import { NOTIFICATIONS_SERVICE } from "@/services/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllNotifications = () => {
  const { data, isLoading } = useQuery({
    queryFn: () => NOTIFICATIONS_SERVICE.getAllActivities(),
    queryKey: ["getAllNotifications"],
  });

  return {
    notifications: data?.data.data,
    isLoading,
  };
};

export const useGetNotificationsById = (id: string) => {
  const { data, isLoading } = useQuery({
    queryFn: () => NOTIFICATIONS_SERVICE.getActivityById(id),
    queryKey: ["getNotificationById", id],
  });

  return {
    recipients: data?.data.data.recipients,
    isLoading,
  };
};

export const useGetUserNotifications = (
  filter: string,
  page?: string,
  email?: string,
  limit?: string
) => {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryFn: () =>
      NOTIFICATIONS_SERVICE.getNotificationUsers(filter, page, email, limit),
    queryKey: ["getAllUsers", page, email, limit, filter],
  });

  return {
    users: data?.data.data,
    // page: data?.data.data.page,
    // limit: data?.data.data.limit,
    // hasNextPage: data?.data.data.hasNextPage,
    // total: data?.data.data.total,
    isLoading,
    isError,
    isSuccess,
  };
};

export const useSendNotification = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: () => void;
}) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (variables: {
      subject?: string;
      emailMessage?: string;
      smsMessage?: string;
      reciepientCategory?: string;
      customRecipients?: {
        subcontractors: string[];
        users: string[];
        businesses: string[];
      };
    }) =>
      NOTIFICATIONS_SERVICE.sendNotification(
        variables.subject,
        variables.emailMessage,
        variables.smsMessage,
        variables.reciepientCategory,
        variables.customRecipients
      ),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["getAllNotifications"] });
      onSuccess?.();
    },
    onError: () => onError?.(),
  });

  return {
    sendNotification: mutate,
    isPending,
  };
};

export const useSendNotificationWithCSV = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: () => void;
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) =>
      NOTIFICATIONS_SERVICE.sendNotificationWithCSV(formData),
    onSuccess: () => onSuccess?.(),
    onError: () => onError?.(),
  });

  return {
    sendNotificationWithCSV: mutate,
    isPending,
  };
};
