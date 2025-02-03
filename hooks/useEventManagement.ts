import { EventManagementService } from "@/services/event-management"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useListAllEvents = (filter: string, page: string, limit: string, timezone: string) => {
    const { data, isLoading, isError, isSuccess } = useQuery({
        queryFn: () => EventManagementService.getAllEvents(filter, page, limit, timezone),
        queryKey: ["getAllEvents", filter, page, timezone]
    })

    return {
        events: data?.data.data.events,
        page: data?.data.data.page,
        limit: data?.data.data.limit,
        hasNextPage: data?.data.data.hasNextPage,
        total: data?.data.data.total,
        isLoading, isError, isSuccess
    }
}


export const useGetEventById = (eventId: string) => {
    const { data, isLoading, isError, isSuccess } = useQuery({
        queryFn: () => EventManagementService.getEventById(eventId),
        queryKey: ["getEventById", eventId]
    })

    return {
        event: data?.data.data.event,
        isLoading, isError, isSuccess
    }
}


export const useDeleteEvent = ({ onSuccess, onError }: { onSuccess: () => void, onError: () => void }) => {
    const queryClient = useQueryClient()
    const { mutate, isPending, isSuccess, isError } = useMutation({
        mutationFn: (variable: { eventId: string }) => EventManagementService.deleteEvent(variable.eventId),
        mutationKey: ["deleteEvent"],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getAllEvents"] })
            onSuccess?.()
        },
        onError: () => {
            onError?.()
        }
    })

    return {
        deleteEvent: mutate,
        isPending, isError, isSuccess
    }
}


