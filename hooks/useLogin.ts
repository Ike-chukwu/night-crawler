import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"


import { LoginService } from "@/services/login"

import { AuthResponse } from "@/services/login/types"
import { LoginPayload } from "@/services/login/schema"


export const useLogin = ({ onSuccess, onError }: { onSuccess?: (data: AuthResponse) => void; onError?: () => void }) => {
    const { mutate, isPending, isSuccess, isError } = useMutation({
        mutationFn: (variables: LoginPayload) => LoginService.login(variables),
        mutationKey: ["login"],
        onSuccess: (data) => {
            console.log(data.data.data);
            if (typeof data == "object") {
                LoginService.saveToken(data.data)

                onSuccess?.(data.data)
            }
        },

        onError: (error) => {
            console.log(error);
            onError?.()
        }
    })


    return {
        login: mutate,
        isLoading: isPending,
        isError,
        isSuccess
    }
}