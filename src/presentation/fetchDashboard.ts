/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AnyAction, Dispatch, ThunkAction } from '@reduxjs/toolkit';
import { AppState } from 'src/app/store';
import { articlesFetched } from 'src/features/articles/articlesSlice';
import { TableStatus } from 'src/features/table/tableSlice';
import { ArticleGateway } from './fetchArticles.spec';

type ThunkResult<D> = ThunkAction<void, AppState, D, AnyAction>;

export const fetchDashboard = (): ThunkResult<{
  articleGateway: ArticleGateway;
}> => {
  return async (dispatch: Dispatch<any>, getState, { articleGateway }) => {
    const articles = await articleGateway.fetchDashboard();
    dispatch(fetchedDasdboard(dashboardCount));
  };
};
