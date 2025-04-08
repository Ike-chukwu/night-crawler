export type PlanDetail = {
    name: string,
    price: number,
    planId: string,
    subscribers: number,
    active: boolean
}

export type CancelledSubscription = {
    _id: string,
    subId: string,
    email: string,
    phone: string,
    cancelledAt: string,
    cancellationReason: string
}

export type PaginatedDataForPlans<T> = {
    total: number;
    plans: T[];
};


export type PaginatedDataForCancelledSubscriptions<T> = {
    total: number;
    subscriptions: T[];
};
