import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TableState {
    value: number;
    status: string | void;
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
             state.value =0,
             state.status = 'pending'
        },
        archivedTableSelected(state){
            state.value =1,
            state.status ='archived'
        }
    }
});
export const { pendingTableSelected, archivedTableSelected } = tableSlice.actions;
export default tableSlice.reducer;