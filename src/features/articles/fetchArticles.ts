/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AnyAction, Dispatch, ThunkAction } from '@reduxjs/toolkit';
import { ArticleGateway } from 'src/app/interfaces';
import { AppState } from 'src/app/store';
import { articlesFetched } from 'src/features/articles/articlesSlice';
import { TableStatus } from 'src/features/table/tableSlice';

type ThunkResult<D> = ThunkAction<void, AppState, D, AnyAction>;

export const fetchArticles = (
  status: TableStatus
): ThunkResult<{
  articleGateway: ArticleGateway;
}> => {
  return async (dispatch: Dispatch<any>, getState, { articleGateway }) => {
    const articles = await articleGateway.fetchArticles(status);
    dispatch(articlesFetched(articles));
  };
};
