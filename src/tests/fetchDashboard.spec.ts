import { Article } from 'src/app/interfaces';
import {
  createPresentationArticles,
  createPresentationDashboardData,
} from '../presentation/createPresentation';

import { fetchArticles } from '../features/articles/fetchArticles';
import { fetchDashboard } from '../features/dashboard/fetchDashboard';
import { createStore } from 'src/app/store';
import { TableStatus } from 'src/features/table/tableSlice';
import { InMemoryDashBoardGateway } from '../features/dashboard/InMemoryDashBoardGateway';

it('should fetch data count for dashboard', async () => {
  const dashboardGateway = new InMemoryDashBoardGateway();
  const store = createStore({ dashboardGateway });
  await store.dispatch<any>(fetchDashboard());
  const presentation = createPresentationDashboardData(store.getState());
  expect(presentation.dashboard).toEqual([
    {
      count: 1,
      name: 'gogle alerts',
    },
    {
      count: 12,
      name: 'bing alertts',
    },
    {
      count: 12,
      name: 'search alebrts',
    },
  ]);
});
