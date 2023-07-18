import { configureStore } from '@reduxjs/toolkit';
import tableReducer from 'src/features/table/tableSlice';
import articlesReducer from 'src/features/articles/articlesSlice';
import { setupListeners } from '@reduxjs/toolkit/query'
import { testApi } from 'src/features/api/apiSlice';

export const store = configureStore({
  reducer: {
    table: tableReducer,
    articles: articlesReducer,
    api: testApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(testApi.middleware)
});
setupListeners(store.dispatch)
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
