import { combineReducers, configureStore } from '@reduxjs/toolkit';
import articlesReducer from 'src/features/articles/articlesSlice';
import tableReducer from 'src/features/table/tableSlice';
import dashboardReducer from 'src/features/dashboard/dashboardSlice';
import { InMemoryDashBoardGateway } from 'src/features/dashboard/InMemoryDashBoardGateway';
export const rootReducer = combineReducers({
  table: tableReducer,
  articles: articlesReducer,
  dashboard: dashboardReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const buildInitStore = (): AppState => ({
  table: { status: 'pending' },
  articles: { ids: [], articles: {} },
  dashboard: { dashboardData: [] },
});

export const createStore = (dependencies: unknown, hydrate?: AppState) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getGefaultMiddleware) =>
      getGefaultMiddleware({ thunk: { extraArgument: dependencies } }),
    preloadedState: hydrate ?? buildInitStore(),
  });
const dashboardGateway = new InMemoryDashBoardGateway();
export const store = createStore({ dashboardGateway });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
