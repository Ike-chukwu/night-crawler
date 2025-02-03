export type AuthResponse = {
    data: {
        token: string,
        refreshToken: string,
        admin: Admin
    }
}

export type LoginPayload = {
    email: string;
    password: string;
}


export type Admin = {
    _id: string,
    adminId: string,
    email: string,
    firstname: string,
    lastname: string,
    status: string,
    lastLogin: string,
    deletedAt: null | string,
    createdAt: string,
    updatedAt: string,
    __v: number
}


export type ApiResponse<T> = {
    success: boolean;
    message: string;
    data: T;
    // errors: ResponseError[];
};


// export type ResponseError = {
//     key: string;
//     errorMessages: string[];
// };