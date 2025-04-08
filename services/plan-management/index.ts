import { ApiResponse } from './../login/types';
import { axiosInstance } from "@/constants"
import { CancelledSubscription, PaginatedDataForCancelledSubscriptions, PaginatedDataForPlans, PlanDetail } from "./types"
import { PaginatedDataForSubscribers, SingleSubscriber, UserInSubscribers } from '../user-management/types';

export class PLAN_SERVICE {

    private static PLAN_BASE_API = "/plans"
    private static SUBSCRIPTION_BASE_API = "/subscription"

    public static getAllPlans() {
        return axiosInstance.get<ApiResponse<PaginatedDataForPlans<PlanDetail>>>(this.PLAN_BASE_API)
    }


    public static toggleStatus(planId: string) {
        return axiosInstance.patch(this.PLAN_BASE_API + `/plan/toggle-status?planId=${planId}`, {
        })
    }


    public static addPlan(name: string, price: number, post_per_month: string | number, runtime: number, type: string, unlimited?: boolean) {
        return axiosInstance.post(this.PLAN_BASE_API + "/plan/add", {
            name, price, post_per_month, runtime, type, unlimited

        })
    }

    public static async getPlanSubscribers(page: string, limit: string, planId: string,) {
        return axiosInstance.get<ApiResponse<PaginatedDataForSubscribers<UserInSubscribers>>>(this.PLAN_BASE_API + `/plan-subscribers?planId=${planId}`, {
            params: {
                page,
                limit,
            }
        })
    }


    public static async createSubscription(email: string, planId: string, duration: number) {
        return axiosInstance.post<ApiResponse<any>>(this.SUBSCRIPTION_BASE_API + `/create`, { email, planId, duration })
    }


    public static async getSubscriptionById(subId: string) {
        return axiosInstance.get<ApiResponse<SingleSubscriber>>(this.SUBSCRIPTION_BASE_API + `/single/${subId}`)
    }

    public static async restartSubscription(subId: string) {
        return axiosInstance.patch<ApiResponse<any>>(this.SUBSCRIPTION_BASE_API + `/restart/${subId}`)
    }

    public static async cancelSubscription(payload: { subId: string, reason: string }) {
        return axiosInstance.patch<ApiResponse<any>>(this.SUBSCRIPTION_BASE_API + `/cancel/${payload.subId}`, { reason: payload.reason })
    }


    // public static getCancelledSubscriptions() {
    //     return axiosInstance.get<ApiResponse<any>>(this.PLAN_BASE_API)
    // }

    public static async getCancelledSubscriptions(page: number, limit: number,) {
        return axiosInstance.get<ApiResponse<PaginatedDataForCancelledSubscriptions<CancelledSubscription>>>(this.SUBSCRIPTION_BASE_API + "/cancelled-subscription", {
            params: {
                page,
                limit,
            }
        })
    }

}