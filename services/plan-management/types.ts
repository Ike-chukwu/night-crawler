export type PlanDetail = {
    name: string,
    price: number,
    planId: string,
    subscribers: number,
    active: boolean
}

export type PaginatedDataForPlans<T> = {
    total: number;
    plans: T[];
};
