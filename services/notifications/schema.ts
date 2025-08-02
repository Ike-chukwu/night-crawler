import * as yup from "yup";

export const notificationSchema = yup.object().shape({
  subject: yup.string(),
  emailMessage: yup.string(),
  smsMessage: yup.string(),
});

export type NotificationPayload = yup.InferType<typeof notificationSchema>;
