import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article } from 'src/app/interfaces';

export const initialState: {
  ids: number[];
  articles: Record<number, Article>;
} = { ids: [], articles: {} };

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    articlesFetched: (state, action: PayloadAction<Article[]>) => {
      for (const article of action.payload) {
        state.articles[article.id] = article;
      }
      state.ids = [...action.payload.map((article) => article.id)];
    },
  },
});
export const { articlesFetched } = articlesSlice.actions;
export default articlesSlice.reducer;
