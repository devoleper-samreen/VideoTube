import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const uploadApi = createApi({
    reducerPath: "uploadApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api/video",
        credentials: "include"
    }),
    endpoints: (builder) => ({
        publishVideo: builder.mutation({
            query: (formData) => ({
                url: '/',
                method: "POST",
                body: formData,
            }),
        }),
    }),
});

export const { usePublishVideoMutation } = uploadApi