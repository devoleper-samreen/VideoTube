import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from "./baseApi"

export const likeApi = createApi({
    reducerPath: 'likeApi',
    baseQuery: customBaseQuery,
    tagTypes: ['Like'],
    endpoints: (builder) => ({
        addLike: builder.mutation({
            query: (videoId) => ({
                url: `likes/${videoId}`,
                method: 'POST',

            }),
            invalidatesTags: (result, error, { videoId }) => [
                { type: 'Like', id: videoId },
            ],
        }),

        deleteLike: builder.mutation({
            query: (videoId) => ({
                url: `likes/${videoId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, { videoId }) => [
                { type: 'Like', id: videoId },
            ],
        }),

        getLikesByVideo: builder.query({
            query: (videoId) => `/likes/${videoId}`,
            providesTags: (result, error, videoId) => [{ type: 'Like', id: videoId }],
        }),

        getLikesCountByVideo: builder.query({
            query: (videoId) => `/likes/count/${videoId}`,
            providesTags: (result, error, videoId) => [{ type: 'Like', id: videoId }],
        }),
    }),
});

export const {
    useAddLikeMutation,
    useDeleteLikeMutation,
    useGetLikesByVideoQuery,
    useGetLikesCountByVideoQuery,
} = likeApi;
