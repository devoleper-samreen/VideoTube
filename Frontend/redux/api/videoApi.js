import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./baseApi";

export const videoApi = createApi({
    reducerPath: "videoApi",
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        getMixedVideos: builder.query({
            query: () => "feed/mixed",
            keepUnusedDataFor: 600, // 10 minutes
        }),
        getVideoById: builder.query({
            query: (videoId) => `video/${videoId}`,
        }),
        increaseViewCount: builder.mutation({
            query: (videoId) => ({
                url: `/video/views/${videoId}`,
                method: "POST",
            }),
        }),

    }),
});

export const { useGetMixedVideosQuery, useGetVideoByIdQuery, useIncreaseViewCountMutation } = videoApi;
