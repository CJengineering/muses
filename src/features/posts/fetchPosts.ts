/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AnyAction, Dispatch, ThunkAction } from '@reduxjs/toolkit';
import { PostGateway } from 'src/app/interfaces';
import { AppState } from 'src/app/store';
import { postsFetched } from './postsSlice';
import { NewTableStatus } from '../new table selctor/newTableSlice';

type ThunkResult<D> = ThunkAction<void, AppState, D, AnyAction>;

export const fetchPosts = (url: NewTableStatus): ThunkResult<{
  postGateway: PostGateway;
}> => {
  return async (dispatch: Dispatch<any>, getState, { postGateway }) => {
    console.log('fetchPosts thunk is executing');

    const posts = await postGateway.fetchPosts(url);
    console.log('Fetched posts:', posts);

    dispatch(postsFetched(posts));
    console.log('Dispatching postsFetched:', posts);
  };
};
