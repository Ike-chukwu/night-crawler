import * as yup from "yup"


export const loginSchema = yup.object().shape({
    email: yup.string().required("Please enter your email"),
    password: yup.string().required("Please enter your password")
})


export type LoginPayload = yup.InferType<typeof loginSchema>