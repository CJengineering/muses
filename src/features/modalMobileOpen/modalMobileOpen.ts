import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface modalMobileOpenState {
  status: boolean;
}

export const initialState: modalMobileOpenState = {
  status: false,
};

const modalMobileOpenSlice = createSlice({
  name: 'modalMobileOpen',
  initialState,
  reducers: {
    modalMobileOpend(state, action: PayloadAction<boolean>) {
      state.status = action.payload;
    },
  },
});
export const { modalMobileOpend } =  modalMobileOpenSlice.actions;
export default  modalMobileOpenSlice.reducer;
