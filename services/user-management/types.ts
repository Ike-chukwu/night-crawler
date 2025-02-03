export type Event = {
    id: string;
    eventName: string,
    country: string,
    eventLocation: string,
    date: string,
};

export type User = {
    userId: string;
    email: string;
    phone: string;
    userType: string;
};



export type EventOwner = {
    userId: string;
    name: string;
    userType: string;
    email: string;
}

export type UserEvent = {
    eventId: string,
    title: string,
    address: string,
    createdAt: string,
    description: string
}

export type PaginatedData<T> = {
    total: number;
    page: number;
    limit: number;
    hasNextPage: boolean;
    //   totalPages: number;
    users: T[];
};

export type PaginatedDataForUserEvents<T> = {
    total: number;
    page: number;
    limit: number;
    hasNextPage: boolean;
    //   totalPages: number;
    user: EventOwner;
    events: T[];
};



