import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const videoApi = createApi({
    reducerPath: "videoApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/feed/" }),
    endpoints: (builder) => ({
        getMixedVideos: builder.query({
            query: () => "mixed",
        }),
    }),
});

export const { useGetMixedVideosQuery } = videoApi;
