import { DashboardService } from "@/services/dashboard"
import { useQuery } from "@tanstack/react-query"


export const useSummary = () => {
    const { data, isLoading, isSuccess, isError } = useQuery({
        queryFn: () => DashboardService.summary(),
        queryKey: ["dashboardStats"]
    })

    return {
        stats: data?.data.data,
        isLoading,
        isError,
        isSuccess
    }
}


export const useUserSummary = () => {
    const { data, isLoading, isError, isSuccess } = useQuery({
        queryFn: () => DashboardService.userSummary(),
        queryKey: ["userSummary"]
    })

    return {
        userStats: data?.data.data,
        isLoading,
        isError,
        isSuccess
    }
}


export const usePlanSummary = () => {
    const { data, isLoading, isError, isSuccess } = useQuery({
        queryFn: () => DashboardService.planSummary(),
        queryKey: ["planSummary"]
    })

    return {
        planStats: data?.data.data,
        isLoading,
        isError,
        isSuccess
    }
}