import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./baseApi"

export const searchApi = createApi({
    reducerPath: "searchApi",
    baseQuery: customBaseQuery,
    tagTypes: ["Videos"],
    endpoints: (builder) => ({
        getVideos: builder.query({
            query: (searchQuery) =>
                searchQuery ? `/search?q=${searchQuery}` : "/videos/mixed"
        }),
        providesTags: ["Videos"],
        keepUnusedDataFor: 300,
        refetchOnReconnect: true,
    }),
});

export const { useGetVideosQuery } = searchApi;
