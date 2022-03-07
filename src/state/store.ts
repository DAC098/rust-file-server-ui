import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { fs_item } from "./fs_item";

export const store = configureStore({
    reducer: {
        fs_item: fs_item.reducer
    },
    middleware: (defaultMiddleware) => {
        return defaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    "fs_item/get/fulfilled"
                ],
                ignoredPaths: [
                    "fs_item.fs_item"
                ]
            }
        });
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type StateDispatch = typeof store.dispatch;

export const useStateDispatch = () => useDispatch<StateDispatch>();
export const useStateSelector: TypedUseSelectorHook<RootState> = useSelector;