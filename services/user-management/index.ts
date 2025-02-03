import { axiosInstance } from "@/constants"
import { ApiResponse } from "../login/types"
import { PaginatedData, PaginatedDataForUserEvents, User, UserEvent } from "./types"

export class UserManagementService {

    private static USER_MANAGEMENT_API_BASE = "/users"


    public static async getAllUsers(userType: string, page: string, limit: string, filterByEmail: string) {
        return axiosInstance.get<ApiResponse<PaginatedData<User>>>(this.USER_MANAGEMENT_API_BASE + "/table", {
            params: {
                userType,
                page,
                limit,
                filterByEmail
            }
        })
    }

    public static async suspendUser(userId: string) {
        return axiosInstance.patch<ApiResponse<any>>(this.USER_MANAGEMENT_API_BASE + `/suspend?userId=${userId}`
            //     {
            //     params: {
            //         userId
            //     }
            // }
        )
    }


    public static async deleteUser(userId: string) {
        return axiosInstance.patch<ApiResponse<any>>(this.USER_MANAGEMENT_API_BASE + `/delete?userId=${userId}`
            //     {
            //     params: {
            //         userId
            //     }
            // }
        )
    }

    public static async sendMessage(userId: string, message: string) {
        return axiosInstance.post<ApiResponse<any>>(this.USER_MANAGEMENT_API_BASE + `/send-message`,
            {
                params: {
                    message,
                    userId
                }
            }
        )
    }

    public static async getUserEvent(userId: string, page: string, limit: string, filterByEmail?: string, filterByCountry?: string) {
        return axiosInstance.get<ApiResponse<PaginatedDataForUserEvents<UserEvent>>>(`/events/user?userId=${userId}`, {
            params: {
                page,
                limit,
                filterByEmail,
                filterByCountry
            }
        })
    }
}


