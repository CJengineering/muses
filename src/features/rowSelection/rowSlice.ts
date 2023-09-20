import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState = {
  selectedRows: [] as number[],
};

const rowsSlice = createSlice({
  name: 'rows',
  initialState,
  reducers: {
    toggleSelectedRow: (state, action: PayloadAction<number>) => {
      const id = action.payload;

      if (state.selectedRows.includes(id)) {
        state.selectedRows = state.selectedRows.filter(rowId => rowId !== id);
      } else {
        state.selectedRows.push(id);
      }
    },
    clearSelectedRows: (state) => {
      state.selectedRows = [];
    },
  },
});

export const { toggleSelectedRow, clearSelectedRows } = rowsSlice.actions;
export default rowsSlice.reducer;
