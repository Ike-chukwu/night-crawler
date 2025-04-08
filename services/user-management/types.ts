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
export type UserInSubscribers = {
    email: string;
    userId: string;
    fullname: string;
    subscriptionId: string;
};

export type SingleSubscriber = {
    subscriptionId: string,
    user: {
        userId: string,
        userEmail: string,
        userName: string,
        businessName: string
    },
    subscription: {
        type: string,
        noOfRenewals: number,
        active: boolean,
        startDate: string,
        endDate: string
        cancelledAt: string
        cancellationReason: string
        isCancelled: boolean
    }
}


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

export type ActualUserType = {
    email: string,
    username: string,
    userType: string,
    photo: string,
    phone: string,
    fullname: string,
    socials: ActualUserTypeSocials,
    businessEmail: string,
    businessAddress: string,
    businessCategory: string,
    contactName: string,
    contactPhone: string,
    suspended: boolean
}

export type ActualUserTypeSocials = {
    web: string,
    instagram: string,
    facebook: string
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
export type PaginatedDataForSubscribers<T> = {
    total: number;
    page: number;
    limit: number;
    hasNextPage: boolean;
    //   totalPages: number;
    users: T[];
};



