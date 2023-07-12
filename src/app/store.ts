import { combineReducers, configureStore } from '@reduxjs/toolkit';
import articlesReducer from 'src/features/articles/articlesSlice';
import tableReducer from 'src/features/table/tableSlice';

export const rootReducer = combineReducers({
  table: tableReducer,
  articles: articlesReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const buildInitStore = (): AppState => ({
  table: { status: 'pending' },
  articles: [],
});

export const createStore = (dependencies: unknown, hydrate?: AppState) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getGefaultMiddleware) =>
      getGefaultMiddleware({ thunk: { extraArgument: dependencies } }),
    preloadedState: hydrate ?? buildInitStore(),
  });

export const store = createStore({});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
