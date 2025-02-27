import { axiosInstance } from "@/constants"
import { ApiResponse } from "../login/types"
import { PaginatedData } from "../user-management/types"
import { EventDetailInTable, EventInFullDetail, PaginatedDataForEvents } from "./types"

export class EventManagementService {

    private static EVENT_API_BASE = "/events"


    public static getAllEvents(filter: string, page: string, limit: string, timezone: string, eventName: string) {
        return axiosInstance.get<ApiResponse<PaginatedDataForEvents<EventDetailInTable>>>(this.EVENT_API_BASE + "/table", {
            params: {
                filter,
                page,
                limit,
                email: eventName
            },
            headers: {
                timezone
            }
        })
    }

    public static getEventById(eventId: string) {
        return axiosInstance.get<ApiResponse<EventInFullDetail>>(this.EVENT_API_BASE + `/event/${eventId}`,
        )
    }


    public static deleteEvent(eventId: string,) {
        return axiosInstance.delete<ApiResponse<any>>(this.EVENT_API_BASE + "/event/delete", {
            params: {
                eventId,

            }
        })
    }
}