import { configureStore } from '@reduxjs/toolkit';
import tableReducer from 'src/features/table/tableSlice';
import articlesReducer from 'src/features/articles/articlesSlice';

export const store = configureStore({
  reducer: {
    table: tableReducer,
    articles: articlesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
