import { axiosInstance } from "@/constants";
import { ApiResponse } from "../login/types";
import { Activity, ActivityById, Recipient, UsersNotif } from "./types";

export class NOTIFICATIONS_SERVICE {
  private static NOTIFICATIONS_API = "/notification";

  public static getAllActivities() {
    return axiosInstance.get<ApiResponse<Activity[]>>(
      this.NOTIFICATIONS_API + `/activities`
    );
  }
  public static getActivityById(id: string) {
    return axiosInstance.get<ApiResponse<ActivityById>>(
      this.NOTIFICATIONS_API + `/activity/${id}`
    );
  }

  public static async getNotificationUsers(
    filter: string,
    page?: string,
    email?: string,
    limit?: string
  ) {
    return axiosInstance.get<ApiResponse<UsersNotif[]>>(
      this.NOTIFICATIONS_API + "/users",
      {
        params: {
          filter,
          page,
          email,
          limit,
        },
      }
    );
  }
  public static async sendNotification(
    subject?: string,
    emailMessage?: string,
    smsMessage?: string,
    reciepientCategory?: string,
    customRecipients?: {
      subcontractors: string[];
      users: string[];
      businesses: string[];
    }
  ) {
    return axiosInstance.post<ApiResponse<any>>(
      this.NOTIFICATIONS_API + "/send_notification",
      {
        subject,
        emailMessage,
        smsMessage,
        reciepientCategory,
        customRecipients,
      }
    );
  }

  public static async sendNotificationWithCSV(formData: FormData) {
    return axiosInstance.post<ApiResponse<any>>(
      this.NOTIFICATIONS_API + "/send_notification_csv",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }
}
