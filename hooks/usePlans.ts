import { PLAN_SERVICE } from "@/services/plan-management"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useGetAllPlans = () => {
    const { data, isLoading, isError, isSuccess } = useQuery({
        queryFn: () => PLAN_SERVICE.getAllPlans(),
        queryKey: ["getAllPlans"]
    })


    return {
        plans: data?.data.data.plans,
        total: data?.data.data.total,
        isLoading, isError, isSuccess
    }
}


export const useToggleStatus = ({ onSuccess, onError }: { onSuccess: () => void, onError: () => void }) => {
    const queryClient = useQueryClient()
    const { mutate, isPending, isSuccess, isError } = useMutation({
        mutationFn: (variables: string) => PLAN_SERVICE.toggleStatus(variables),
        mutationKey: ["toggleStatus"],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getAllPlans"] })
            onSuccess?.()
        },
        onError: () => {
            onError?.()
        }
    })


    return {
        toggleStatus: mutate,
        isPending, isError, isSuccess
    }
}


export const useAddPlan = ({ onSuccess, onError }: { onSuccess: () => void, onError: () => void }) => {
    const queryClient = useQueryClient()
    const { mutate, isPending, isSuccess, isError } = useMutation({
        mutationFn: (variables: { name: string, price: number, post_per_month: number, runtime: number, type: string }) => PLAN_SERVICE.addPlan(variables.name, variables.price, variables.post_per_month, variables.runtime, variables.type),
        mutationKey: ["addPlan"],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getAllPlans"] })
            onSuccess?.()
        },
        onError: () => {
            onError?.()
        }
    })

    return {
        addPlan: mutate,
        isPending, isSuccess, isError
    }
}


export const useGetPlanSubscribers = (page: string, limit: string, planId: string, filterByEmail: string) => {
    const { data, isLoading, isError, isSuccess } = useQuery({
        queryFn: () => PLAN_SERVICE.getPlanSubscribers(page, limit, planId,),
        queryKey: ["getAllSubscribersForAPlan", page, limit, planId,]
    })

    return {
        subscribers: data?.data.data.users,
        page: data?.data.data.page,
        limit: data?.data.data.limit,
        hasNextPage: data?.data.data.hasNextPage,
        total: data?.data.data.total,
        isLoading,
        isError, isSuccess
    }
}
