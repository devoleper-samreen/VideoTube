import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./baseApi";

export const videoApi = createApi({
    reducerPath: "videoApi",
    baseQuery: customBaseQuery,
    tagTypes: ["Video", "UserVideos", "WatchedVideos"],
    endpoints: (builder) => ({
        getMixedVideos: builder.query({
            query: () => "feed/mixed",
            providesTags: ["Video"],
            keepUnusedDataFor: 300, // 5 minutes
            refetchOnReconnect: true,
        }),
        getVideoById: builder.query({
            query: (videoId) => `video/${videoId}`,
            providesTags: (result, error, videoId) => [{ type: "Video", id: videoId }],  // Specific video ke liye cache
        }),
        getUserVideos: builder.query({
            query: () => `video/your/get-all`,
            keepUnusedDataFor: 500,
            providesTags: ["UserVideos"],
        }),
        getWatchedVideos: builder.query({
            query: () => "video/watched-videos",
            keepUnusedDataFor: 500,
            providesTags: ["WatchedVideos"],
        }),
        increaseViewCount: builder.mutation({
            query: (videoId) => ({
                url: `/video/views/${videoId}`,
                method: "POST",
            }),
            invalidatesTags: (result, error, videoId) => [{ type: "Video", id: videoId }],  //Views badhne ke baad video update ho jayega
        }),
    }),
});

export const { useGetMixedVideosQuery, useGetVideoByIdQuery, useIncreaseViewCountMutation, useGetUserVideosQuery, useGetWatchedVideosQuery } = videoApi;
