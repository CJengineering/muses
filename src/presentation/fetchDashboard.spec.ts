import { Article } from 'src/app/interfaces';
import { createPresentationArticles } from './createPresentation';

import { fetchArticles } from './fetchArticles';
import { createStore } from 'src/app/store';
import { TableStatus } from 'src/features/table/tableSlice';
import { InMemoryArticleGateway } from './fetchArticles.spec';




it('should fetch articles count for dashboard', async () => {
  const articleGateway = new InMemoryArticleGateway();
  const store = createStore({ articleGateway });
  await store.dispatch<any>(fetchDashboard());
  const presentation = createPresentationArticles(store.getState());
  expect(presentation.ids).toEqual([123]);
  expect(presentation.dashboard).toEqual([
    {
      count: 1,
      name: 'gogle alerts',
    },
    {
      count: 12,
      name: 'bing alerts',
    },
    {
      count: 12,
      name: 'search alerts',
    },
  ]);
});
