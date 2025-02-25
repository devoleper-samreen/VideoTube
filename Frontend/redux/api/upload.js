import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const uploadApi = createApi({
    reducerPath: "uploadApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/video" }),
    endpoints: (builder) => ({
        publishVideo: builder.mutation({
            query: (formData) => ({
                url: `/67bc64c8b637da42be0a5b9a
`,
                method: "POST",
                body: formData,
            }),
        }),
    }),
});

export const { usePublishVideoMutation } = uploadApi