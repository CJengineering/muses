import { Article } from 'src/app/interfaces';
import { createPresentationArticles } from '../presentation/createPresentation';
import { Store } from 'redux';
import { RootState } from 'src/app/store'; // Assuming RootState is your Redux root state type.
import { fetchArticles } from '../features/articles/fetchArticles';
import { buildInitStore, createStore } from 'src/app/store';
import { TableStatus } from 'src/features/table/tableSlice';
import { InMemoryArticleGateway } from '../features/articles/InMemoryArticleGateway';
import { sortedByDate, sortedByMainScore, sortedByRelatedScore } from 'src/features/articles/articlesSlice';

it('should fetch articles from our api', async () => {
  const articleGateway = new InMemoryArticleGateway();
  const store = createStore({ articleGateway });
  await store.dispatch<any>(fetchArticles());
  const presentation = createPresentationArticles(store.getState());
  expect(presentation.ids).toEqual([123]);
  expect(presentation.articles['123']).toEqual({
    id: 123,
    title: 'Vladimir is winning the war',
    link: 'russiatoday.fr',
    url_link: undefined,
    published: '2021-01-01',
    posted: true,
    key_word: {
      key_word: 'Vladimir',
    },
    created_at: '2021-01-01',
    updated_at: '2021-01-01',
    key_word_id: 100,
    score: 32,
    score_second: 0,
    category_label: 'Politics',
    source:"articles"
  });
});
const ids = [1, 2];
const articles = {
  1: { 
    id: 1,
    title: 'Article 1',
    link: 'News Paper',
    url_link: undefined,
    published: '2021-01-01',
    posted: true,
    key_word: {
      key_word: 'Testing',
    },
    created_at: '2024-01-01',
    updated_at: '2021-01-01',
    key_word_id: 100,
    score: 32,
    score_second: 5,
    category_label: 'Cure Cancer',
    source: 'articles'
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
    created_at: '2022-01-01',
    updated_at: '2022-01-01',
    key_word_id: 100,
    score: 20,
    score_second: 15,
    category_label: 'Politics',
    source: 'articles'
  },
};
it('should sort in ascending order by Date ', async () => {
 
  const articleGateway = new InMemoryArticleGateway();
  const store:  Store<RootState>  = createStore({articleGateway},{
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

