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
    }),
});

export const { useGetMixedVideosQuery, useGetVideoByIdQuery } = videoApi;
