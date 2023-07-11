import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createPresentationArticles } from './createPresentation';
import {fetchArticles} from 'src/features/articles/articlesSlice';

import { RootState, store } from '../app/store';

it('should fetch articles ', () => {
  const dispatch = store.dispatch;

  dispatch(fetchArticles('published'));

  const presentation = createPresentationArticles(store.getState());
  expect(presentation).toEqual({ data: [] });
});


 