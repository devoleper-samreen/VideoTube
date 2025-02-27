import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./baseApi";

export const videoApi = createApi({
    reducerPath: "videoApi",
    // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/feed/" }),
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        getMixedVideos: builder.query({
            query: () => "feed/mixed",
        }),
        getVideoById: builder.query({
            query: (videoId) => `video/${videoId}`,
        }),
    }),
});

export const { useGetMixedVideosQuery, useGetVideoByIdQuery } = videoApi;
