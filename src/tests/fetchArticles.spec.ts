import { Article } from 'src/app/interfaces';
import { createPresentationArticles } from '../presentation/createPresentation';

import { fetchArticles } from '../features/articles/fetchArticles';
import { buildInitStore, createStore } from 'src/app/store';
import { TableStatus } from 'src/features/table/tableSlice';
import { InMemoryArticleGateway } from '../features/articles/InMemoryArticleGateway';
import { sortedByDate, sortedByMainScore, sortedByRelatedScore } from 'src/features/articles/articlesSlice';

it('should fetch articles from our api', async () => {
  const articleGateway = new InMemoryArticleGateway();
  const store = createStore({ articleGateway });
  await store.dispatch<any>(fetchArticles('published'));
  const presentation = createPresentationArticles(store.getState());
  expect(presentation.ids).toEqual([123]);
  expect(presentation.articles['123']).toEqual({
    id: 123,
    title: 'Vladimir is winning the war',
    link: 'russiatoday.fr',
    url_link: undefined,
    published: new Date('2021-01-01'),
    posted: true,
    key_word: {
      key_word: 'Vladimir',
    },
    created_at: new Date('2021-01-01'),
    updated_at: new Date('2021-01-01'),
    key_word_id: 100,
    score: 32,
    score_second: undefined,
    category_label: 'Politics',
  });
});
const ids = [1, 2];
const articles = {
  1: {
    id: 1,
    title: 'Article 1',
    link: 'News Paper',
    url_link: undefined,
    published: new Date('2021-01-01'),
    posted: true,
    key_word: {
      key_word: 'Testing',
    },
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2021-01-01'),
    key_word_id: 100,
    score: 32,
    score_second: 5,
    category_label: 'Cure Cancer',
  },
  2: {
    id: 2,
    title: 'Article 2',
    link: 'france.fr',
    url_link: undefined,
    published: new Date('2021-01-01'),
    posted: true,
    key_word: {
      key_word: 'Community Jameeel',
    },
    created_at: new Date('2022-01-01'),
    updated_at: new Date('2022-01-01'),
    key_word_id: 100,
    score: 20,
    score_second: 15,
    category_label: 'Politics',
  },
};
it('should sort in ascending order by Date ', async () => {
 
  const articleGateway = new InMemoryArticleGateway();
  const store = createStore({articleGateway},{
    ...buildInitStore(),
    articles: { ids: ids, articles: articles },
  });
  const order = 'desc'
  store.dispatch(sortedByDate(order));
  const presentation = createPresentationArticles(store.getState());

  // Expect that the first article in the sorted array is the one with the earliest creation date


   expect(presentation.ids[0]).toEqual(1);

});
it('should sort in ascending order by Main Score ', async () => {
 
  const articleGateway = new InMemoryArticleGateway();
  const store = createStore({articleGateway},{
    ...buildInitStore(),
    articles: { ids: ids, articles: articles },
  });
  const order = 'desc'
  store.dispatch(sortedByMainScore(order));
  const presentation = createPresentationArticles(store.getState());

  // Expect that the first article in the sorted array is the one with the earliest creation date


   expect(presentation.ids[0]).toEqual(1);

});

it('should sort in ascending order by Related score ', async () => {
 
  const articleGateway = new InMemoryArticleGateway();
  const store = createStore({articleGateway},{
    ...buildInitStore(),
    articles: { ids: ids, articles: articles },
  });
  const order = 'desc'
  store.dispatch(sortedByRelatedScore(order));
  const presentation = createPresentationArticles(store.getState());

  // Expect that the first article in the sorted array is the one with the earliest creation date


   expect(presentation.ids[0]).toEqual(2);

});

