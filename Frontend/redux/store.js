import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/auth"
import { videoApi } from "./api/videoApi"

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [videoApi.reducerPath]: videoApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, videoApi.middleware),
});
