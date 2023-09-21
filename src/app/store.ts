import { combineReducers, configureStore } from '@reduxjs/toolkit';
import articlesReducer from 'src/features/articles/articlesSlice';
import tableReducer from 'src/features/table/tableSlice';
import postsReducer from 'src/features/posts/postsSlice';
import filterStateReducer from 'src/features/filterState/filterStateSlice';
import searchAttributesReducer from 'src/features/searchAttributes/searchAttributesSlice';
import actionStateReducer from 'src/features/actionState/actionStateSlice'
import rowsReducer from 'src/features/rowSelection/rowSlice'
import newTableReducer from 'src/features/new table selctor/newTableSlice';
import filterToggleReducer from 'src/features/filterToggle/filterToggleSlice';
import dashboardReducer from 'src/features/dashboard/dashboardSlice';
import { InMemoryDashBoardGateway } from 'src/features/dashboard/InMemoryDashBoardGateway';
import {
  ApiArticleGateway,
  InMemoryArticleGateway,
} from 'src/features/articles/InMemoryArticleGateway';
import filterToggleSlice from 'src/features/filterToggle/filterToggleSlice';
import { ApiPostGateway } from 'src/features/posts/postsGateway';
import searchAttributesSlice from 'src/features/searchAttributes/searchAttributesSlice';
export const rootReducer = combineReducers({
  table: tableReducer,
  articles: articlesReducer,
  dashboard: dashboardReducer,
  filterToggle: filterToggleReducer,
  filterState: filterStateReducer,
  posts: postsReducer,
  newtable: newTableReducer,
  searchAttribute: searchAttributesReducer,
  rows: rowsReducer,
  actionState: actionStateReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export const buildInitStore = (): AppState => ({
  table: { status: 'pending' },
  articles: { ids: [], articles: {} },
  dashboard: { dashboardData: [] },
  filterToggle: { status: false },
  filterState: { status: false },
  posts: { ids: [], posts: {} },
  newtable: { status: 'incoming' },
  searchAttribute: {source: ['bing','custom','google','google_alert']},
  rows: {selectedRows:[]},
  actionState: {status:'archive'}
});

export const createStore = (dependencies: unknown, hydrate?: AppState) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: { extraArgument: dependencies } }),
    preloadedState: hydrate ?? buildInitStore(),
  });
const postGateway = new ApiPostGateway();
const articleGateway = new ApiArticleGateway();
const dashboardGateway = new InMemoryDashBoardGateway();
export const store = createStore({
  dashboardGateway,
  articleGateway,
  postGateway,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
