import { UserManagementService } from "@/services/user-management"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


export const useUserManagement = (userType: string, page: string, limit: string, filterByEmail: string) => {

    const { data, isLoading, isError, isSuccess } = useQuery({
        queryFn: () => UserManagementService.getAllUsers(userType, page, limit, filterByEmail),
        queryKey: ["getAllUsers", page, limit, userType, filterByEmail]
    })

    return {
        users: data?.data.data.users,
        page: data?.data.data.page,
        limit: data?.data.data.limit,
        hasNextPage: data?.data.data.hasNextPage,
        total: data?.data.data.total,
        isLoading,
        isError, isSuccess
    }
}


export const useSuspendUser = ({ onSuccess, onError }: { onSuccess?: () => void; onError?: () => void }) => {
    const queryClient = useQueryClient()
    const { mutate, isPending, isSuccess, isError } = useMutation({
        mutationFn: (userId: string) => UserManagementService.suspendUser(userId),
        mutationKey: ["suspendUser"],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getAllUsers"] })
            onSuccess?.()
        },
        onError: () => {
            onError?.()
        }
    })
    return {
        suspendUser: mutate,
        isPending,
        isSuccess, isError
    }
}

export const useDeleteUser = ({ onSuccess, onError }: { onSuccess?: () => void; onError?: () => void }) => {
    const queryClient = useQueryClient()
    const { mutate, isPending, isSuccess, isError } = useMutation({
        mutationFn: (userId: string) => UserManagementService.deleteUser(userId),
        mutationKey: ["deleteUser"],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getAllUsers"] })
            onSuccess?.()
        },
        onError: () => {
            onError?.()
        }
    })
    return {
        deleteUser: mutate,
        isPending,
        isSuccess, isError
    }
}


export const useSendMessage = ({ onSuccess, onError }: { onSuccess?: () => void; onError?: () => void }) => {
    const queryClient = useQueryClient()
    const { mutate, isPending, isSuccess, isError } = useMutation({
        mutationFn: (variables: { userId: string, message: string }) => UserManagementService.sendMessage(variables.userId, variables.message,),
        mutationKey: ["sendUserMessage"],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getAllUsers"] })
            onSuccess?.()
        },
        onError: () => {
            onError?.()
        }
    })
    return {
        sendUserMessage: mutate,
        isPending,
        isSuccess, isError
    }
}


export const useGetUserEvent = (userId: string, page: string, limit: string, filterByEmail: string) => {
    const { data, isLoading, isError, isSuccess } = useQuery({
        queryFn: () => UserManagementService.getUserEvent(userId, page, limit, filterByEmail),
        queryKey: ["getAllEventsForAUser", page, limit, userId, filterByEmail]
    })

    return {
        events: data?.data.data.events,
        user: data?.data.data.user,
        page: data?.data.data.page,
        limit: data?.data.data.limit,
        hasNextPage: data?.data.data.hasNextPage,
        total: data?.data.data.total,
        isLoading,
        isError, isSuccess
    }
}



