import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./baseApi"

export const searchApi = createApi({
    reducerPath: "searchApi",
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        getVideos: builder.query({
            query: (searchQuery) =>
                searchQuery ? `/search?q=${searchQuery}` : "/videos/mixed"
        }),
    }),
});

export const { useGetVideosQuery } = searchApi;
