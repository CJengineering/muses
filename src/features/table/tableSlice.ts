import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TableState {
    value: number;
    status: string;
}

export const initialState: TableState = {
    value: 0,
    status: 'pending'
}

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        pendingTableSelected(state){
             state.value ==0,
             state.status == 'pending'
        }
    }
});
export const { pendingTableSelected } = tableSlice.actions;
export default tableSlice.reducer;