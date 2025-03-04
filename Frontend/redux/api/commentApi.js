import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "../../redux/api/baseApi"

export const commentApi = createApi({
    reducerPath: "commentApi",
    baseQuery: customBaseQuery,
    tagTypes: ["Comments"],
    endpoints: (builder) => ({
        // Create Comment
        createComment: builder.mutation({
            query: ({ videoId, content }) => ({
                url: `/comment/${videoId}`,
                method: "POST",
                body: { content },
            }),
            invalidatesTags: ["Comments"],
        }),

        // Get All Comments
        getCommentsByVideo: builder.query({
            query: (videoId) => `/comment/${videoId}`,
            providesTags: ["Comments"],
        }),
    }),
});

export const {
    useCreateCommentMutation,
    useGetCommentsByVideoQuery,
} = commentApi;
