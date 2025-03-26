import * as yup from "yup"


export const planSchema = yup.object().shape({
    name: yup.string().required("Please enter your name"),
    price: yup.number().required("Please enter your price"),
    post_per_month: yup.string().required("Please enter your price"),
    runtime: yup.number().required("Please enter your price"),
    type: yup.string().required("Please enter your type"),
})


export type PlanPayload = yup.InferType<typeof planSchema>


export const createSubscriptionSchema = yup.object().shape({
    email: yup.string().required("Please enter your email"),
    duration: yup.number().required("Please enter your duration"),

})

export type SubscriptionPayload = yup.InferType<typeof createSubscriptionSchema>