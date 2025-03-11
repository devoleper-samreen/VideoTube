import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./baseApi";

export const profileApi = createApi({
    reducerPath: "profileApi",
    baseQuery: customBaseQuery,
    tagTypes: ["Profile"],
    endpoints: (builder) => ({
        updateProfile: builder.mutation({
            query: (data) => ({
                url: "user/profile",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Profile"],
        }),

        getProfile: builder.query({
            query: () => "user/profile",
            providesTags: ["User", "Profile"],
            keepUnusedDataFor: 300

        }),
    }),

});

export const { useUpdateProfileMutation, useGetProfileQuery } = profileApi;