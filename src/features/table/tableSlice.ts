import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TableState {
  status: string;
}

export const initialState: TableState = {
  status: 'pending',
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
  
    selectedTableValue(state, action : PayloadAction<string>) {
        state.status = action.payload;
      },
  
  },
});
export const { selectedTableValue } =
  tableSlice.actions;
export default tableSlice.reducer;
