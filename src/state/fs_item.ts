import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ErrorJson, FsItem } from "../types";
import JSONLocal from "../json";

interface ReducerState {
    loading: boolean
    error?: ErrorJson
    fs_item?: FsItem
}

interface GetFsItemArgs {
    location: string
}

export const getFsItem = createAsyncThunk<FsItem, GetFsItemArgs, {rejectValue: ErrorJson}>(
    "fs_item/get",
    async (args, {rejectWithValue}) => {
        try {
            let url = "/fs";

            if (!args.location.startsWith("/")) {
                url += "/";
            }

            url += args.location;

            const res = await fetch(url, {
                method: "GET"
            });

            let json = JSONLocal.parse(await res.text());

            if (res.status === 200) {
                return json.payload;
            } else {
                return rejectWithValue(json);
            }
        } catch(err) {
            return rejectWithValue({
                error: "ClientError",
                message: err.toString()
            });
        }
    }
)

const initialState: ReducerState = {
    loading: false,
    error: null,
    fs_item: null,
};

export const fs_item = createSlice({
    name: "fs_item",
    initialState,
    reducers: {
        clear_error: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getFsItem.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getFsItem.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.fs_item = payload;
        });
        builder.addCase(getFsItem.rejected, (state, {payload}) => {
            state.loading = false;
            state.error = payload;
        });
    }
});

export const fs_item_actions = {
    ...fs_item.actions,
    getFsItem
}