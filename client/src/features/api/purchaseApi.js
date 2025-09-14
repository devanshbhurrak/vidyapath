import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_PURCHASE_API = `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/purchase`

export const purchaseApi = createApi({
    reducerPath:'purchaseApi',
    baseQuery:fetchBaseQuery({
        baseUrl:COURSE_PURCHASE_API,
        credentials: 'include'
    }),
    endpoints:(builder) => ({
        createCheckoutSession: builder.mutation({
            query: (courseId) => ({
                url:'checkout/create-checkout-session',
                method:'POST',
                body:{courseId}
            })
        }),
        getCourseDetailWithStatus: builder.query({
            query: (courseId) => ({
                url:`/course/${courseId}/details-with-status`,
                method:'GET'
            })
        }),
        getPurchasedCoruse: builder.query({
            query: () => ({
                url:'/',
                method:'GET'
            })
        })
    })
})

export const {
    useCreateCheckoutSessionMutation,
    useGetCourseDetailWithStatusQuery,
    useGetPurchasedCoruseQuery
} = purchaseApi