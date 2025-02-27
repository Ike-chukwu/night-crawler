import { EventManagementService } from "@/services/event-management"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

export const useListAllEvents = (filter: string, page: string, limit: string, eventName: string, timezone: string) => {
    const { data, isLoading, isError, isSuccess } = useQuery({
        queryFn: () => EventManagementService.getAllEvents(filter, page, limit, timezone, eventName),
        queryKey: ["getAllEvents", filter, page, timezone, eventName]
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
    const { push } = useRouter()
    const { mutate, isPending, isSuccess, isError } = useMutation({
        mutationFn: (variable: { eventId: string }) => EventManagementService.deleteEvent(variable.eventId),
        mutationKey: ["deleteEvent"],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getAllEvents"] })
            queryClient.invalidateQueries({ queryKey: ["getAllEventsForAUser"] })
            onSuccess?.()
            //pass this onSuccess when the hook is being called so idynamically define where to route me to and check caching issue
            push("/event-management")
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


