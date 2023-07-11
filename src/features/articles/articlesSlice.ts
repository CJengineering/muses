import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Data {
  id: number;
  title: string;
  link: string;
  url_link: string | undefined;
  published: string;
  posted: boolean;
  key_word: {
    key_word: string;
  };
  created_at: string;
  updated_at: string;
  key_word_id: number;
  score: number | null;
  score_second: number | null;
  category_label: string | null;
}


export const initialState: Data[] = [];

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    fetchArticles(state, action: PayloadAction<string>) {
      
    },
  },
});
export const { fetchArticles} = articlesSlice.actions;
export default articlesSlice.reducer;



