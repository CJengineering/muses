import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "src/features/table/tableSlice";


export const store = configureStore({
    reducer: {
        table: tableReducer,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>