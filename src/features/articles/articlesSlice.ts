import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article } from 'src/presentation/article';

export const initialState: Article[] = [];

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    articlesFetched(state, action: PayloadAction<Article[]>) {
      state = action.payload;
    },
  },
});
export const { articlesFetched } = articlesSlice.actions;
export default articlesSlice.reducer;
