import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/auth"
import { videoApi } from "./api/videoApi"
import { uploadApi } from "./api/upload"

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [videoApi.reducerPath]: videoApi.reducer,
        [uploadApi.reducerPath]: uploadApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, videoApi.middleware, uploadApi.middleware),
});
