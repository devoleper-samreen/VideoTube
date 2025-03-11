import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./baseApi";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: customBaseQuery,
    tagTypes: ["User"],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: "user/login",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["User"]
        }),
        register: builder.mutation({
            query: (data) => ({
                url: "user/register",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["User"],
        }),
        logout: builder.mutation({
            query: () => ({
                url: "user/logout",
                method: "POST",
            }),
            invalidatesTags: ["User"],
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
                method: "PATCH",
                body: data,
            })
        }),
        changePassword: builder.mutation({
            query: (data) => ({
                url: "/user/change-password",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["User"],
        }),
        getMe: builder.query({
            query: () => "user/me",
            providesTags: ["User"],
            keepUnusedDataFor: 300
        }),
    })
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useOtpVerifyMutation, useForgotPasswordMutation, useResetPasswordMutation, useGetMeQuery, useGetProfileQuery, useChangePasswordMutation } = authApi;
