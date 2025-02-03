import { axiosInstance } from "@/constants"
import { ApiResponse } from "../login/types"

export class DashboardService {
    private static DASHBOARD_API_BASE = "/dashboard"


    public static async summary() {
        return axiosInstance.get<ApiResponse<DashboardStats>>(
            this.DASHBOARD_API_BASE + "/summary"
        )
    }

    public static async userSummary() {
        return axiosInstance.get<ApiResponse<UserSummaryStats>>(this.DASHBOARD_API_BASE + "/user-summary")
    }


    public static async planSummary() {
        return axiosInstance.get<ApiResponse<PlanSummaryStats>>(this.DASHBOARD_API_BASE + "/plan-summary")
    }
}