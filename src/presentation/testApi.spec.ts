
import {store } from '../app/store';

import {  getSimpleTest, getArticles } from '../features/api/apiSlice';

it('should fetch from home page ', async () => {
    await store.dispatch(getSimpleTest.initiate(''));
  
    const state = store.getState();
    const apiState = getSimpleTest.select('')(state);

    expect(apiState.data).toEqual({
      message: 'you are not logged in',
    });
  });

  it('should fetch articles from our api', async () => {
    await store.dispatch(getArticles.initiate(''));
  
    const state = store.getState();
    const apiState = getArticles.select('')(state);

    expect(apiState.data?.length).toEqual(1629);
  });