import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./baseApi";

export const profileApi = createApi({
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({

        updateProfile: builder.mutation({
            query: (data) => ({
                url: "user/profile",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["User"],
        }),

    })
});

export const { useUpdateProfileMutation } = profileApi;