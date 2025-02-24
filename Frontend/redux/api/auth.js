import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "videoApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/user/" }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: "login",
                method: "POST",
                body: data,
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: "/register",
                method: "POST",
                body: data,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: "logout",
                method: "POST",
            }),
        }),
        otpVerify: builder.mutation({
            query: (data) => ({
                url: "verify-email",
                method: "POST",
                body: data,
            }),
        }),
    })
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useOtpVerifyMutation } = authApi;
