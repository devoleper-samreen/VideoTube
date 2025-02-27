import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./baseApi";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: "user/login",
                method: "POST",
                body: data,
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: "user/register",
                method: "POST",
                body: data,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: "user/logout",
                method: "POST",
            }),
        }),
        otpVerify: builder.mutation({
            query: (data) => ({
                url: "user/verify-email",
                method: "POST",
                body: data,
            }),
        }),
        forgotPassword: builder.mutation({
            query: (data) => ({
                url: "user/forgot-password",
                method: "POST",
                body: data,
            })
        }),
        resetPassword: builder.mutation({
            query: (data) => ({
                url: `user/reset-password/${data.id}/${data.token}`,
                method: "POST",
                body: data,
            })
        }),
        getMe: builder.query({
            query: () => "user/me"
        }),
        getProfile: builder.query({
            query: () => "user/profile",
        }),
    })
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useOtpVerifyMutation, useForgotPasswordMutation, useResetPasswordMutation, useGetMeQuery, useGetProfileQuery } = authApi;
