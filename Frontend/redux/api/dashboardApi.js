import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./baseApi";

export const dashboardApi = createApi({
    reducerPath: "dashboardApi",
    baseQuery: customBaseQuery,
    tagTypes: ["Stats", "Videos"],
    endpoints: (builder) => ({

        // Get Dashboard Stats
        getStats: builder.query({
            query: () => "/dashboard/get-stats",
            providesTags: ["Stats"],
        }),

        // Delete Video
        deleteVideo: builder.mutation({
            query: ({ videoId }) => ({
                url: `/dashboard/${videoId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Stats", "Videos"],
        }),

        // Update Video
        updateVideo: builder.mutation({
            query: ({ userId, videoId, data }) => ({
                url: `/dashboard/${videoId}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Videos"],
        }),

    }),
});

export const {
    useGetStatsQuery,
    useDeleteVideoMutation,
    useUpdateVideoMutation,
} = dashboardApi;
