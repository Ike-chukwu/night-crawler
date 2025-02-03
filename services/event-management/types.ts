export type EventDetailInTable = {
    _id: string,
    title: string,
    eventId: string,
    description: string,
    date: EventDate,
    address: string,
    organizer: EventOrganizer,
    time: EventTime,
    createdAt: string,

};

export type PaginatedDataForEvents<T> = {
    total: number;
    page: number;
    limit: number;
    hasNextPage: boolean;
    //   totalPages: number;
    events: T[];
};

export type EventDate = {
    startDate: string,
    endDate: string
}
export type EventTime = {
    start: string,
    end: string
}

export type EventOrganizer = {
    userId: string,
    name: string,
    photo: string
}

export type ContactInfo = {
    phone: string,
    name: string
}


export type EventAttendee = {
    userId: string,
    name: string,
    photo: string,
    email: string,
    phone: string,
    _id: string
}

export type EventInFullDetail = {
    event: {

        _id: string,
        title: string,
        eventId: string,
        description: string,
        location: string,
        date: EventDate,
        category: string,
        address: string,
        notificationTime: string,
        minimumAge: string,
        organizer: EventOrganizer,
        images: string[],
        requirement: string[],
        tags: string[],
        time: EventTime,
        upcoming: boolean,
        contactInfo: ContactInfo,
        weblink: string,
        instagram: string,
        facebook: string,
        attendees: EventAttendee[],
        suspendAt: string | null,
        deletedAt: string | null,
        deletionReason: string | null,
        createdAt: string,
        updatedAt: string,
        __v: number
    }
}
